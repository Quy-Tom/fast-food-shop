import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';

export const StringRequired = (name: string) => 
    applyDecorators(
        ApiProperty({ description: name, required: true }),
        IsString({ message: `${name} must be a string` }),
        IsNotEmpty({ message: `${name} is required` }),
);

export const StringNotRequired = (name: string) => 
    applyDecorators(
        ApiProperty({ description: name, required: true }),
        IsString({ message: `${name} must be a string` }),
);

export const NumberNotRequired  =
    applyDecorators(
        ApiProperty(),
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


