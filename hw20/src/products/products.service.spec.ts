import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from './schema/products.schema';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let productsService: ProductsService;
  const productModel = {
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    find: jest.fn(),
  };
  const awsS3Service = {
    uploadFile: jest.fn(),
  };

  const productMock = {
    _id: '12345555555555555555',
    name: 'name',
    category: 'category',
    description: 'description',
    price: 25,
    quantity: 25,
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: AwsS3Service,
          useValue: awsS3Service,
        },
        {
          provide: getModelToken(Product.name),
          useValue: productModel,
        },
      ],
    }).compile();
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  describe('get product by id', () => {
    it('should throw not found exception when product not found', async () => {
      const validId = '122222222222222222222222';
      jest.spyOn(productModel, 'findById').mockResolvedValue(null);

      await expect(productsService.getProductById(validId)).rejects.toThrow(
        NotFoundException,
      );
      expect(productModel.findById).toHaveBeenCalledWith(validId);
    });

    it('should return product', async () => {
      jest.spyOn(productModel, 'findById').mockResolvedValue(productMock);
      const product = await productsService.getProductById(productMock._id);
      expect(product._id).toBe(productMock._id);
      expect(productModel.findById).toHaveBeenCalledWith(productMock._id);
    });
  });

  describe('get all products', () => {
    it('should return products without discount when no subscription', async () => {
      const exec = jest.fn().mockResolvedValue([productMock]);
      jest.spyOn(productModel, 'find').mockReturnValue({ exec } as any);

      const result = await productsService.getAllProducts(false);

      expect(productModel.find).toHaveBeenCalledTimes(1);
      expect(exec).toHaveBeenCalledTimes(1);
      expect(result).toEqual([productMock]);
    });

    it('should apply 20% discount when has subscription', async () => {
      const doc = {
        price: 10,
        toObject: () => ({ _id: '1', price: 10 }),
      };
      const exec = jest.fn().mockResolvedValue([doc]);
      jest.spyOn(productModel, 'find').mockReturnValue({ exec } as any);

      const result = await productsService.getAllProducts(true);

      expect(result[0]).toEqual({ _id: '1', price: 8 });
    });
  });

  describe('create product', () => {
    it('should create and return product', async () => {
      const dto = {
        name: 'phone',
        category: 'electronics',
        description: 'new',
        price: 25,
        quantity: 10,
      };
      jest.spyOn(productModel, 'create').mockResolvedValue(productMock);

      const created = await productsService.createProduct(dto as any);

      expect(productModel.create).toHaveBeenCalledWith(dto);
      expect(created).toBe(productMock);
    });
  });

  describe('delete product by id', () => {
    it('should throw not found exception when product not found', async () => {
      const validId = '122222222222222222222222';
      jest.spyOn(productModel, 'findByIdAndDelete').mockResolvedValue(null);

      await expect(productsService.deleteProductById(validId)).rejects.toThrow(
        NotFoundException,
      );
      expect(productModel.findByIdAndDelete).toHaveBeenCalledWith(validId);
    });

    it('should delete and return product', async () => {
      jest
        .spyOn(productModel, 'findByIdAndDelete')
        .mockResolvedValue(productMock);

      const deleted = await productsService.deleteProductById(productMock._id);

      expect(productModel.findByIdAndDelete).toHaveBeenCalledWith(
        productMock._id,
      );
      expect(deleted).toBe(productMock);
    });
  });

  describe('update product by id', () => {
    it('should throw not found exception when product not found', async () => {
      const validId = '122222222222222222222222';
      const dto = { description: 'updated' };
      jest.spyOn(productModel, 'findByIdAndUpdate').mockResolvedValue(null);

      await expect(
        productsService.updateProductById(validId, dto as any),
      ).rejects.toThrow(NotFoundException);
      expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
        validId,
        dto,
        {
          new: true,
        },
      );
    });

    it('should update and return product', async () => {
      const dto = { description: 'updated' };
      const updatedProduct = { ...productMock, ...dto };
      jest
        .spyOn(productModel, 'findByIdAndUpdate')
        .mockResolvedValue(updatedProduct);

      const updated = await productsService.updateProductById(
        productMock._id,
        dto as any,
      );

      expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
        productMock._id,
        dto,
        { new: true },
      );
      expect(updated).toEqual(updatedProduct);
    });
  });

  describe('upload many photos', () => {
    it('should upload each file and return urls', async () => {
      const files = [
        { mimetype: 'image/png', buffer: Buffer.from('a') },
        { mimetype: 'image/jpeg', buffer: Buffer.from('b') },
      ] as any;

      jest
        .spyOn(awsS3Service, 'uploadFile')
        .mockResolvedValueOnce('url-1')
        .mockResolvedValueOnce('url-2');

      const result = await productsService.uploadManyPhotos(files);

      expect(awsS3Service.uploadFile).toHaveBeenCalledTimes(2);
      expect(awsS3Service.uploadFile).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(/^images\/.+\.png$/),
        files[0].buffer,
        files[0].mimetype,
      );
      expect(awsS3Service.uploadFile).toHaveBeenNthCalledWith(
        2,
        expect.stringMatching(/^images\/.+\.jpeg$/),
        files[1].buffer,
        files[1].mimetype,
      );
      expect(result).toEqual(['url-1', 'url-2']);
    });
  });
});
