import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import type {
  IMutationResult,
  IClient,
  IValidatedUser,
} from '@tymlez/platform-api-interfaces';
import {
  Permissions,
  PermissionGuard,
  FirebaseAuthGuard,
} from '@tymlez/backend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { AuthService } from './auth.service';
import { UpdateClientDto } from './dto/updateClientDto';
import { AuthenticateDto } from './dto/authenticate.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('init')
  async getFirebaseConfig(): Promise<any> {
    const webappConfig = JSON.parse(
      Buffer.from(
        process.env.FIREBASE_WEBAPP_CONFIG_JSON || '',
        'base64',
      ).toString(),
    );

    return webappConfig;
  }

  @Post('authenticate')
  async authenticateCheck(
    @Body() credentialResult: AuthenticateDto,
  ): Promise<IValidatedUser | undefined> {
    return this.authService.authenticateCheck(credentialResult);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request): Promise<IValidatedUser | undefined> {
    return await this.authService.getUserByEmail(
      (req.user as IValidatedUser).email,
    );
  }

  @UseGuards(FirebaseAuthGuard, PermissionGuard)
  @Permissions(...PERMISSION_SET.CONFIG_MANAGEMENT)
  @Get('clients')
  async getClients(): Promise<IClient> {
    return await this.authService.getClients();
  }

  @Put('/:clientName')
  @UseGuards(FirebaseAuthGuard, PermissionGuard)
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  async updateClient(
    @Body() client: UpdateClientDto,
  ): Promise<IMutationResult> {
    const data = await this.authService.updateClient(client);

    if (data.message === null || data.message === undefined) {
      return { success: true };
    }

    return {
      success: false,
      message: data.message,
    };
  }
}
