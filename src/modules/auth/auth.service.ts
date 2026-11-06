import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../models/user.model.js';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async validateUser(email: string, password: string) {
        return await this.userService.validateUser(email, password);
    }
    
    async login({ id, roleId }: { id: number; roleId: string }) {
         const accessToken = await this.jwtService.signAsync({ id, roleId })
        return { message: "Login successfully", accessToken};
    }
}

