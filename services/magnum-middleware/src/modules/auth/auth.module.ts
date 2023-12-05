import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseClientAuthStrategy } from '@tymlez/backend-libs';
import { PlatformModule } from '../platform/platform.module';
import { PlatformService } from '../platform/platform.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
    PlatformModule,
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
