import { BooleanNotRequired, EnumNotRequired, NumberNotRequired, StringNotRequired } from "../../../common/decorators/index.js";

export class FilterProductDto {

    @StringNotRequired('search')
    search?: string;

    @EnumNotRequired('status', {ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE',SOLD_OUT: 'SOLD_OUT'})
    status?: string;

    @BooleanNotRequired
    isFeatured?: boolean;

    @BooleanNotRequired
    categoryId?: number;

    @NumberNotRequired
    page?: number;

    @NumberNotRequired
    limit?: number;

    @StringNotRequired('sort')
    sortBy?: string;

    @StringNotRequired('sort')
    sortOrder?: string;

    @NumberNotRequired
    minPrice?: number;

    @NumberNotRequired
    maxPrice?: number;
}