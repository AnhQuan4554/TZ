import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { auth } from 'firebase-admin';

import type { IAuthService } from './interface';

const profileCache: Record<string, any> = {};
@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH_SERVICE') private authService: IAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('access_token'),
      ]),
    });
  }

  async validate(token: any) {
    const tenantApp = auth();
    const appTenant = tenantApp
      .tenantManager()
      // eslint-disable-next-line no-process-env
      .authForTenant(process.env.FIREBASE_TENANT_ID || '');
    const decodedTokenInfo = await appTenant
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException();
      });

    if (profileCache[token]) {
      return profileCache[token];
    }

    const profile = await this.authService.getProfile(decodedTokenInfo);

    profileCache[token] = {
      ...profile,
      emailVerified:
        decodedTokenInfo.firebase.sign_in_provider !== 'password' ||
        decodedTokenInfo.email_verified,
    };

    return profileCache[token];
  }
}
