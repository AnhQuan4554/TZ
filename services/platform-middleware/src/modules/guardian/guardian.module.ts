import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { FileModule } from '../file/file.module';
import { Setting } from '../settings/entities/setting.entity';
import { SettingModule } from '../settings/setting.module';
import { DeviceController } from './device/device.controller';
import { DeviceService } from './device/device.service';
import { Device } from './entities/device.entity';
import { Installer } from './entities/installer.entity';
import { InstallerController } from './installer/installer.controller';
import { InstallerService } from './installer/installer.service';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { ProxyController } from './proxy.controller';
import { RootAuthorityController } from './root-authority/root-authority.controller';
import { RootAuthorityService } from './root-authority/root-authority.service';
import { GuardianSite } from './entities/site.entity';
import { GuardianSiteController } from './site/site.controller';
import { GuardianSiteService } from './site/site.service';
import { MeterModule } from '../meter/meter.module';
import { DeleteService } from './delete.controller';
import { TokenOwnerController } from './token-owner/token-owner.controller';
import { TokenOwnerService } from './token-owner/token-owner.service';
import { GuardianPolicyService } from './policy/policy.service';
import { GuardianPolicyController } from './policy/policy.controller';
import { GuardianPolicy } from './entities/policy.entity';
import { GuardianService } from './guardian.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Installer,
      Setting,
      Device,
      GuardianSite,
      GuardianPolicy,
    ]),
    AuthModule,
    FileModule,
    SettingModule,
    MeterModule,
  ],
  controllers: [
    InstallerController,
    RootAuthorityController,
    DeviceController,
    ProjectController,
    GuardianSiteController,
    ProxyController,
    DeleteService,
    TokenOwnerController,
    GuardianPolicyController,
  ],
  providers: [
    InstallerService,
    RootAuthorityService,
    DeviceService,
    ProjectService,
    GuardianSiteService,
    TokenOwnerService,
    GuardianPolicyService,
    GuardianService,
  ],
  exports: [
    InstallerService,
    RootAuthorityService,
    DeviceService,
    ProjectService,
    GuardianSiteService,
    TokenOwnerService,
    GuardianPolicyService,
    GuardianService,
  ],
})
export class GuardianModule {}
