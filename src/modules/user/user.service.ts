import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../models/user.model.js';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    
    constructor(@InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService
    ) {}
    
    async findByEmail(email: string) {
        return await this.userModel.findOne({ where: {email} })
    }

    async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({
        where: { email }
    });

    if (!user)
        throw new UnauthorizedException('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch)
        throw new UnauthorizedException('Invalid email or password');

    const plainUser = user.toJSON();
   

    return { id: plainUser.id, roleId: plainUser.roleId };
    }

    async register(createUserDto: CreateUserDto) {
        const alreadyExist = await this.findByEmail(createUserDto.email);

        if(alreadyExist) throw new BadRequestException("This account already exists")
        
        const hashPassword = await bcrypt.hash(createUserDto.password, 10);
        const payLoad = {
            ...createUserDto, passwordHash: hashPassword
        }

        await this.userModel.create(payLoad as any);

        return { message: "Registered successfully!"}
    }

}
