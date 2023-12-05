import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import type { IGuardianBootstrapStatus } from '@tymlez/platform-api-interfaces';
import { EnumPolicyNames, lookupPolicyNameByTag } from '@tymlez/common-libs';
import { BootstrapService } from './bootstrap.service';
import { DeviceDto } from './dto/device.dto';
import { InstallerDto } from './dto/installer.dto';
import { ProjectDto } from './dto/project.dto';
import { PublishPolicyDto } from './dto/publish-policy.dto';
import { RootAuthorityDto } from './dto/root-authority.dto';
import { SiteDto } from './dto/site.dto';

@Controller('bootstrap')
export class BootstrapController {
  constructor(private readonly bootstrapService: BootstrapService) {}

  @Post('/:clientName/root-authority')
  bootstrapRootAuthority(
    @Param('clientName') clientName: string,
    @Query('policyTags') policyTags: string,
    @Query('tokenMintValue', ParseIntPipe) tokenMintValue: number,
    @Body() rootAuthority: RootAuthorityDto,
  ): Promise<any> {
    const policyNames =
      policyTags
        ?.split(',')
        .map((tag) => lookupPolicyNameByTag(tag))
        .filter((i) => i !== undefined) || [];

    return this.bootstrapService.bootstrapRootAuthority(
      rootAuthority,
      clientName,
      tokenMintValue,
      policyNames as EnumPolicyNames[],
    );
  }

  @Post('/:clientName/owner')
  bootstrapOwner(
    @Param('clientName') clientName: string,
    @Body() owner: RootAuthorityDto,
  ): Promise<any> {
    return this.bootstrapService.bootstrapOwner(owner, clientName);
  }

  @Get('/:clientName/owner')
  getOwner(@Param('clientName') clientName: string): Promise<any> {
    return this.bootstrapService.getOwner(clientName);
  }

  @Get('/:clientName/installer/:installerId')
  getInstaller(
    @Param('clientName') clientName: string,
    @Param('installerId') installerId: string,
  ): Promise<any> {
    return this.bootstrapService.getInstallerData(clientName, installerId);
  }

  @Post('/:clientName/installer')
  createInstaller(
    @Param('clientName') clientName: string,
    @Body() installerDto: InstallerDto,
  ): Promise<any> {
    return this.bootstrapService.createInstaller(installerDto, clientName);
  }

  @Post('/:clientName/installer/device')
  createInstallerDevice(
    @Param('clientName') clientName: string,
    @Body() device: DeviceDto,
  ): Promise<any> {
    return this.bootstrapService.bootstrapDevice(device, clientName);
  }

  @Get('/:clientName/installer/:installerId/devices')
  getInstallerDevices(
    @Param('clientName') clientName: string,
    @Param('installerId') installerId: string,
    @Query('deviceId') deviceId: string,
  ): Promise<any> {
    return this.bootstrapService.getInstallerDevices(
      clientName,
      installerId,
      deviceId,
    );
  }

  @Post('/:clientName/site')
  bootstrapSite(
    @Param('clientName') clientName: string,
    @Body() siteData: SiteDto,
  ): Promise<any> {
    return this.bootstrapService.bootstrapSiteData(siteData, clientName);
  }

  @Post('/:clientName/project')
  bootstrapProject(
    @Param('clientName') clientName: string,
    @Body() project: ProjectDto,
  ): Promise<any> {
    return this.bootstrapService.bootstrapProjectData(project, clientName);
  }

  @Get('/:clientName/root-authority')
  getRootAuthority(
    @Param('clientName') clientName: string,
    @Query('policyTags') policyTags: string,
    @Query('tokenMintValue', ParseIntPipe) tokenMintValue: number,
  ): Promise<any> {
    const policyNames =
      policyTags
        ?.split(',')
        .map((tag) => lookupPolicyNameByTag(tag))
        .filter((i) => i !== undefined) || [];

    return this.bootstrapService.getRootAuthority(
      clientName,
      tokenMintValue,
      policyNames as EnumPolicyNames[],
    );
  }

  @Get('/:clientName/summary')
  getBootstrapSummary(@Param('clientName') clientName: string): Promise<any> {
    return this.bootstrapService.getBootstrapSummary(clientName);
  }

  @Get('/:clientName')
  getStatus(@Param('clientName') clientName: string): IGuardianBootstrapStatus {
    return this.bootstrapService.getStatus(clientName);
  }

  @Get('/:clientName/project')
  getProject(@Param('clientName') clientName: string): Promise<any> {
    return this.bootstrapService.getProject(clientName);
  }

  @Get('/:clientName/sites')
  getSites(@Param('clientName') clientName: string): Promise<any> {
    return this.bootstrapService.getSites(clientName);
  }

  @Get('/:clientName/policies')
  getPolicies(@Param('clientName') clientName: string): Promise<any> {
    return this.bootstrapService.getPolicies(clientName);
  }

  @Post('/:clientName/policy')
  publishPolicy(
    @Param('clientName') clientName: string,
    @Body() policy: PublishPolicyDto,
  ): Promise<any> {
    return this.bootstrapService.publishPolicy(policy, clientName);
  }
}
