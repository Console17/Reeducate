import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UserModule } from 'src/users/users.module';
import { SubscriptionGuard } from 'src/guards/subscription.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productModel } from './schema/products.schema';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productModel }]),
    UserModule,
    AwsS3Module,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, SubscriptionGuard],
})
export class ProductsModule {}
