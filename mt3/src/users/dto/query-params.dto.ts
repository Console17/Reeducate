import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class QueryParamsDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Max(30)
  take: number = 30;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  age: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  ageFrom: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  ageTo: number;

  @IsOptional()
  @IsString()
  name: string;
}
