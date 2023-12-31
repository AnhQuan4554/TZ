import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { IPassportStrategyValidateOutput } from './IPassportStrategyValidateOutput';
import type { IJwtAccessTokenPayload } from './IJwtAccessTokenPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('access_token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(
    payload: IJwtAccessTokenPayload,
  ): Promise<IPassportStrategyValidateOutput> {
    return {
      id: payload.sub,
      email: payload.email,
      roles: payload.roles,
      clientName: payload.clientName,
    };
  }
}
