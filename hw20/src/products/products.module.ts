import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UserModule } from 'src/users/users.module';
import { SubscriptionGuard } from 'src/guards/subscription.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productModel } from './schema/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productModel }]),
    UserModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, SubscriptionGuard],
})
export class ProductsModule {}
