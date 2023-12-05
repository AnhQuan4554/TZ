import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IValidatedUser } from '@tymlez/platform-api-interfaces';
import { AuthService } from './auth.service';

@Controller()
export class AuthMicroservice {
  constructor(
    private authService: AuthService,
    public readonly orm: MikroORM,
  ) {}

  @MessagePattern('auth.validateToken')
  @UseRequestContext()
  async validateToken({ token }: { token: string }): Promise<IValidatedUser> {
    return this.authService.validateToken(token);
  }
}
