import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  NatsContext,
} from '@nestjs/microservices';
import { ExternalMessageEvents } from '../common';
import { GuardianLogsService } from './guardian-logs.service';

@Controller()
export class GuardianLogsController {
  constructor(private readonly service: GuardianLogsService) {}

  @MessagePattern(ExternalMessageEvents.ERROR_LOG)
  onGuardianErrorLog(
    @Payload() log: Record<string, any>,
    @Ctx() _: NatsContext,
  ): void {
    this.service.handleGuardianErrorLogEvent(log);
  }

  @MessagePattern(ExternalMessageEvents.TOKEN_MINTED)
  onGuardianTokenMinted(
    @Payload() log: Record<string, any>,
    @Ctx() _: NatsContext,
  ): void {
    this.service.handleGuardianTokenMintedEvent(log);
  }
}
