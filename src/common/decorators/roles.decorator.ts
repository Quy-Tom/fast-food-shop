import { SetMetadata } from "@nestjs/common";

export const ROLE_KEY = 'roles';

export const Roles = (...roles: number[]) => SetMetadata(ROLE_KEY, roles);
