import { Module } from '@nestjs/common';
import { GuardianLogsService } from './guardian-logs.service';
import { GuardianLogsController } from './guardian-logs.controller';

@Module({
  imports: [],
  providers: [GuardianLogsService],
  controllers: [GuardianLogsController],
})
export class GuardianLogsModule { }
