import { forwardRef, Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Expsense, expsenseModel } from './schema/expsenses.schema';
import { UserModule } from 'src/users/users.module';
import { User, userModel } from 'src/users/schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expsense.name, schema: expsenseModel }]),
    MongooseModule.forFeature([{ name: User.name, schema: userModel }]),

    forwardRef(() => UserModule),
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpenseModule {}
