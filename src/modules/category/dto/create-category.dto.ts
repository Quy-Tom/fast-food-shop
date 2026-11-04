import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateCategoryDto {
  @IsString({message: 'Name must be a string'})  
  @IsNotEmpty({message: 'Name is required'})
  name: string;

  @IsString({message: 'Description must be a string'})
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sortOrder?: number;
}