import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BullManagementController } from './bull-management.controller';
import { BullManagementService } from './bull-management.service';
import { BullGateway } from './bull.gateway';
import { WsGuard } from './Ws.guard';

@Module({
  imports: [AuthModule],
  controllers: [BullManagementController],
  providers: [BullManagementService, BullGateway, WsGuard],
})
export class BullManagementModule {}
