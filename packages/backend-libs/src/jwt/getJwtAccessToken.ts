import type { JwtService } from '@nestjs/jwt';
import type { IJwtAccessTokenPayload } from './IJwtAccessTokenPayload';

export function getJwtAccessToken({
  jwtService,
  user,
}: {
  jwtService: Pick<JwtService, 'sign'>;
  user: IJwtAccessTokenInput;
}): string {
  const info: IJwtAccessTokenPayload = {
    ...user,
    sub: user.id,
  };

  return jwtService.sign(info, { expiresIn: user.timeout });
}

interface IJwtAccessTokenInput {
  id: string;
  email: string;
  roles: string[];
  clientName: string;
  timeout: number;
  name: string;
}
