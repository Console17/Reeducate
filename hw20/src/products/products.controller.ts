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

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @UseGuards(SubscriptionGuard)
  @Get()
  getAllProducts(@Req() req) {
    return this.productsService.getAllProducts(req.hasActiveSubscription);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get(':id')
  getProductById(@Param() { id }: isValidObjectId) {
    return this.productsService.getProductById(id);
  }

  @Delete(':id')
  deleteProductById(@Param() { id }: isValidObjectId) {
    return this.productsService.deleteProductById(id);
  }

  @Patch(':id')
  updateProductById(
    @Param() { id }: isValidObjectId,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProductById(id, updateProductDto);
  }
}
