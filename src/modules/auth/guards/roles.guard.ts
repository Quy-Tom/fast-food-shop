import { ROLE_KEY } from "../../../common/decorators/roles.decorator.js";
import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ForbiddenException } from "@nestjs/common";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<number[]>(
            ROLE_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ]
        )
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!roles.includes(Number(user.roleId))) {
            throw new ForbiddenException();
        }

        return roles.includes(Number(user.roleId));
    }
}