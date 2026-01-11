import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UserModule } from 'src/users/users.module';
import { SubscriptionGuard } from 'src/guards/subscription.guard';

@Module({
  imports: [UserModule],
  controllers: [ProductsController],
  providers: [ProductsService, SubscriptionGuard],
})
export class ProductsModule {}
