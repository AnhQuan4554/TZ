import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { IpfsService } from './ipfs.service';
import { IpfsController } from './ipfs.controller';
import { StorageService } from './gcs.service';
import { IpfsFile } from '../db/entities/ipfs-file.entity';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.register([
      { name: 'CLIENT_PROXY', transport: Transport.TCP },
    ]),
    MikroOrmModule.forFeature([IpfsFile]),
  ],
  providers: [IpfsService, StorageService],
  controllers: [IpfsController],
})
export class IpfsModule {}
