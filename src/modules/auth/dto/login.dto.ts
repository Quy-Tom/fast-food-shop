import { StringRequired } from "../../../common/decorators/index.js";

export class LoginDto {
    @StringRequired('email')
    email: string

    @StringRequired('password')
    password: string
}