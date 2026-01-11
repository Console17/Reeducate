import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      name: 'phone',
      category: 'electronics',
      description: 'desc',
      price: 200,
      quantity: 5,
    },
    {
      id: 2,
      name: 'bike',
      category: 'transport',
      description: 'desc',
      price: 250,
      quantity: 1,
    },
  ];

  getAllProducts(hasActiveSubscription: boolean) {
    if (!hasActiveSubscription) return this.products;

    return this.products.map((e) => ({
      ...e,
      price: Number((e.price * 0.8).toFixed(2)),
    }));
  }

  createProduct(createProductDto: CreateProductDto) {
    const lastId = this.products[this.products.length - 1]?.id || 0;

    const newProduct = {
      id: lastId + 1,
      ...createProductDto,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  getProductById(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  deleteProductById(id: number) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException('Product not found');
    }
    return this.products.splice(index, 1);
  }

  updateProductById(id: number, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException('Product not found');
    }

    this.products[index] = {
      ...this.products[index],
      ...updateProductDto,
    };

    return this.products[index];
  }
}
