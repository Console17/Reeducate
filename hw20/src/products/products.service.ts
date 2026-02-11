import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './schema/products.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService {
  constructor(
    private awsS3Service: AwsS3Service,
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async getAllProducts(hasActiveSubscription: boolean) {
    const products = await this.productModel.find().exec();

    if (!hasActiveSubscription) return products;

    return products.map((e) => ({
      ...e.toObject(),
      price: Number((e.price * 0.8).toFixed(2)),
    }));
  }

  async createProduct(dto: CreateProductDto) {
    const newProduct = await this.productModel.create(dto);
    return newProduct;
  }

  async getProductById(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
  async deleteProductById(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async updateProductById(id: string, dto: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async uploadManyPhotos(files: Array<Express.Multer.File>) {
    const images: string[] = [];
    for (let file of files) {
      const ext = file.mimetype.split('/')[1];
      const fileId = `images/${randomUUID()}.${ext}`;
      const result = await this.awsS3Service.uploadFile(
        fileId,
        file.buffer,
        file.mimetype,
      );
      images.push(result);
    }
    return images;
  }
}
