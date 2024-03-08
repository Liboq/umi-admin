//permission.guard.ts
import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';
import { Request } from 'express';
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    interface CusRequest extends Request {
      user?: any;
    }
    const request: CusRequest = context.switchToHttp().getRequest();
    const requiredPermissions =
      this.reflector.getAllAndOverride<string[]>('permissions', [
        context.getClass(),
        context.getHandler(),
      ]) || [];

    if (requiredPermissions.length === 0) return true;
    const [, token] = request.headers.authorization?.split(' ') ?? [];

    const permissionNames = await this.userService.findPermissionNames(
      token,
      request.user,
    );

    const isContainedPermission = requiredPermissions.every((item) =>
      permissionNames.includes(item),
    );
    if (!isContainedPermission) {
      throw new HttpException('权限不足', 200);
    }
    return true;
  }
}

