import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SubscriptionGuard } from 'src/guards/subscription.guard';
import { isValidObjectId } from 'src/common/dto/is-valid-object-id.dto';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @UseGuards(SubscriptionGuard)
  @Get()
  @ApiHeader({
    name: 'email',
    required: false,
    example: 'email@gmail.com',
  })
  @ApiOkResponse({
    example: [
      {
        _id: '698b1a8ab277c658e6d7adfc',
        name: 'phone',
        category: 'electronics',
        description: 'new phone',
        price: 250,
        quantity: 10,
        __v: 0,
      },
    ],
  })
  getAllProducts(@Req() req) {
    return this.productsService.getAllProducts(req.hasActiveSubscription);
  }

  @Post()
  @ApiCreatedResponse({
    example: {
      _id: '698b1a8ab277c658e6d7adfc',
      name: 'phone',
      category: 'electronics',
      description: 'new phone',
      price: 250,
      quantity: 10,
      __v: 0,
    },
  })
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '698b1a8ab277c658e6d7adfc', required: true })
  @ApiNotFoundResponse({ example: 'Product not found' })
  @ApiOkResponse({
    example: {
      _id: '698b1a8ab277c658e6d7adfc',
      name: 'phone',
      category: 'electronics',
      description: 'new phone',
      price: 250,
      quantity: 10,
      __v: 0,
    },
  })
  getProductById(@Param() { id }: isValidObjectId) {
    return this.productsService.getProductById(id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: '698b1a8ab277c658e6d7adfc', required: true })
  @ApiNotFoundResponse({ example: 'Product not found' })
  @ApiOkResponse({
    example: {
      _id: '698b1a8ab277c658e6d7adfc',
      name: 'phone',
      category: 'electronics',
      description: 'new phone',
      price: 250,
      quantity: 10,
      __v: 0,
    },
  })
  deleteProductById(@Param() { id }: isValidObjectId) {
    return this.productsService.deleteProductById(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: '698b1a8ab277c658e6d7adfc', required: true })
  @ApiNotFoundResponse({ example: 'Product not found' })
  @ApiOkResponse({
    example: {
      _id: '698b1a8ab277c658e6d7adfc',
      name: 'phone',
      category: 'electronics',
      description: 'updated',
      price: 250,
      quantity: 10,
      __v: 0,
    },
  })
  updateProductById(
    @Param() { id }: isValidObjectId,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProductById(id, updateProductDto);
  }
}
