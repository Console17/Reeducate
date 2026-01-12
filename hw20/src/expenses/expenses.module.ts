import { forwardRef, Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Expsense, expsenseModel } from './schema/expsenses.schema';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expsense.name, schema: expsenseModel }]),
    forwardRef(() => UserModule),
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpenseModule {}
