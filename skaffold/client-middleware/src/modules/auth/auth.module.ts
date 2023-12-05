import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseClientAuthStrategy } from '@tymlez/backend-libs';
import { PlatformService } from '../platform/platform.service';

@Module({
  imports: [
    PassportModule,
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
  ],
  controllers: [],
  providers: [
    FirebaseClientAuthStrategy,
    {
      provide: 'AUTH_SERVICE',
      useClass: PlatformService,
    },
  ],
})
export class AuthModule {}
