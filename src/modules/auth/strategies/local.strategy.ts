import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../../models/user.model.js';
import { UserService } from '../../user/user.service.js';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            usernameField: "email"
        });
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.userService.validateUser(username, password);

        if (!user) {
            throw new UnauthorizedException('Invalid username or password');
        }

        return user;
    }
}