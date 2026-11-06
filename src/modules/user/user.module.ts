import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../models/user.model.js';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SequelizeModule.forFeature([User])],
  exports: [UserService]
})
export class UserModule {}
