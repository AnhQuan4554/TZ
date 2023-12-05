import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, FirebaseAuthStrategy } from '@tymlez/backend-libs';
import { AuthController } from './auth.controller';
import { AuthMicroservice } from './auth.microservice';
import { AuthService } from './auth.service';
import { Client } from './entities/client.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Client, User, Role]),
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
  ],
  controllers: [
    AuthController,
    UserController,
    AuthMicroservice,
    RoleController,
  ],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    AuthService,
    RoleService,
    JwtStrategy,
    FirebaseAuthStrategy,
    UserService,
  ],
  exports: [AuthService, UserService, PassportModule, RoleService],
})
export class AuthModule {}
