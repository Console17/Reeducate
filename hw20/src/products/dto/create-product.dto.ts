import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 250, type: Number })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(0)
  price: number;

  @ApiProperty({ example: 'phone', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'electronics', type: String })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ example: 'new phone', type: String })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 10, type: Number })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(0)
  quantity: number;
}
