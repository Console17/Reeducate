import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 'gym', type: String })
  @IsNotEmpty()
  @IsString()
  @IsIn(['food', 'gym', 'electronics', 'shopping'])
  category: string;

  @ApiProperty({ example: 'phone', type: String })
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiProperty({ example: 52, type: Number })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 250, type: Number })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
