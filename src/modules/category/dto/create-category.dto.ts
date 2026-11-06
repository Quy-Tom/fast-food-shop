import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { NumberNotRequired, StringRequired } from "../../../common/decorators/index.js";

export class CreateCategoryDto {
  @StringRequired('name')
  name: string;

  @StringRequired('description')
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty()
  @IsOptional()
  isActive?: boolean;

  @NumberNotRequired
  sortOrder?: number;
}