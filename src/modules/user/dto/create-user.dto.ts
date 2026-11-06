import { NumberNotRequired, StringRequired } from "../../../common/decorators/index.js";

export class CreateUserDto {
    @StringRequired('name')
    fullName: string;

    @StringRequired('email')
    email: string;

    @StringRequired('password')
    password: string;

    @NumberNotRequired
    roleId: number;
}