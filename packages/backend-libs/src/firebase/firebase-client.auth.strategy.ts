import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import type { IAuthService } from './interface';

@Injectable()
export class FirebaseClientAuthStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH_SERVICE') private authService: IAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: any) {
    try {
      const user = await this.authService.validateToken(token);
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
