import { IsMongoId } from 'class-validator';

export class isValidObjectId {
  @IsMongoId()
  id: string;
}
