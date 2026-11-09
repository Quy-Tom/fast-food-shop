import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';

export const StringRequired = (name: string) => 
    applyDecorators(
        ApiProperty({ description: name, required: true }),
        IsString({ message: `${name} must be a string` }),
        IsNotEmpty({ message: `${name} is required` }),
);

export const StringNotRequired = (name: string) => 
    applyDecorators(
        ApiProperty({ description: name, required: false }),
        IsOptional(),
        IsString({ message: `${name} must be a string` }),
);

export const NumberNotRequired  =
    applyDecorators(
        ApiProperty({required: false}),
        IsOptional(),
        IsNumber(),
        Type(() => Number)
);

export const NumberRequired  = ({name, min = 0, max} : {name: string, min: number, max?: number}) =>
    applyDecorators(
        ApiProperty(),
        IsNotEmpty({ message: `${name} can not be empty`}),
        IsNumber(),
        Min(min),
        ...(max ? [Max(max)] : []),
        Type(() => Number)
);

export const BooleanNotRequired = applyDecorators(
    ApiProperty({required: false}),
    IsOptional(),
    IsBoolean()
)

export const ArrayNotRequired = (type: any) => applyDecorators(
    ApiProperty({required: false}),
    IsOptional(),
    IsArray(),
    ValidateNested({each: true}),
    Type(() => type)
)

export const EnumNotRequired = (name: string, enumType: object) =>
    applyDecorators(
        ApiPropertyOptional({
            description: name,
            enum: enumType,
        }),
        IsOptional(),
        IsEnum(enumType, {
            message: `${name} must be a valid enum value`,
        }),
    );

export const EnumRequired = (name: string, enumType: object) =>
    applyDecorators(
        ApiProperty({
            description: name,
            enum: enumType,
        }),
        IsEnum(enumType, {
            message: `${name} must be a valid enum value`,
        }),
    );


