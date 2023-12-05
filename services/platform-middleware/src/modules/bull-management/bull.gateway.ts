import { UseGuards } from '@nestjs/common';
import Redis from 'ioredis';

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { IncomingMessage } from 'http';
import qs from 'qs';
import { IQueue, IQueueData } from '@tymlez/platform-api-interfaces';
import { WsGuard } from './Ws.guard';

@WebSocketGateway({
  path: '/ws',
  cors: {
    origin: '*',
  },
})
export class BullGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private redis: Redis;
  private client: Redis;
  constructor() {
    this.redis = new Redis({ host: process.env.REDIS_HOST });
    this.client = new Redis({ host: process.env.REDIS_HOST });

    this.redis.psubscribe('bull:*');
    this.redis.on('pmessage', async (_pattern, channel) => {
      const [, queueName, stateWithId] = channel.split(':');
      const state = stateWithId.split('@')[0];
      const count = await this.countQueueItem(queueName, state);
      this.broadcast('update', {
        queueName,
        state,
        count,
      });
    });
  }

  // @WebSocketServer()
  // server: Server;
  async countQueueItem(queueName: string, state: string) {
    try {
      return await this.client.zcount(
        `bull:${queueName}:${state}`,
        '-inf',
        '+inf',
      );
    } catch (err) {
      try {
        return await this.client.llen(`bull:${queueName}:${state}`);
      } catch (e) {
        console.log('ERROR get list length', `bull:${queueName}:${state}`);
      }
    }
    return 0;
  }

  @WebSocketServer() private server: any;
  wsClients: any[] = [];
  afterInit() {
    this.server.emit('hello', { ready: 1 });
  }

  @UseGuards(WsGuard)
  async handleConnection(client: any, message: IncomingMessage) {
    const query = qs.parse(message.url?.split('?')[1] as string);
    this.wsClients.push(client);
    //TODO: implement the actual role & token validation

    if (!query.token) {
      client.close(4004, 'Unauthorized Request');
    }
    // const valid = await this.authService.getProfile(query as any);
    // if (!valid) {
    //   client.close(4004, 'Unauthorized Request');
    // }
  }

  handleDisconnect(client: any) {
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i].id === client.id) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
    this.broadcast('disconnect', {});
  }

  private broadcast(event: string, message: any) {
    try {
      const broadCastMessage = JSON.stringify({ event, data: message });
      for (const c of this.wsClients) {
        c.send(broadCastMessage);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // @UseGuards(WsGuard)
  @SubscribeMessage('sync')
  async handleMessage(_: any): Promise<WsResponse<unknown>> {
    const keys = await this.client.keys('bull:*');
    const uniques = new Set(keys.map((key) => key.split(':')[1]));
    return {
      event: 'sync',
      data: {
        queues: Array.from(uniques).map((x) => ({
          name: x,
          stats: {},
        })) as IQueue[],
      },
    };
  }

  @SubscribeMessage('queue-stats')
  async queueStats(
    _: any,
    payload: { name: string },
  ): Promise<WsResponse<unknown>> {
    const res = {
      name: payload.name,
      stats: {} as any,
    };

    const state = [
      'completed',
      'wait',
      'active',
      'failed',
      'drained',
      'delayed',
    ];
    for await (const s of state) {
      res.stats[s] = await this.countQueueItem(payload.name, s);
    }
    return { event: 'queue-stats', data: res as IQueue };
  }

  @SubscribeMessage('queue-data')
  async queueData(
    _: any,
    payload: { name: string; state: string; page: number; pageSize: number },
  ): Promise<WsResponse<unknown>> {
    const total = await this.countQueueItem(payload.name, payload.state);

    const { page = 0, pageSize = 25, name, state } = payload;
    const min = page * pageSize;
    const max = min + pageSize;
    let ids = [];
    try {
      ids = await this.client.zrange(`bull:${name}:${state}`, min, max);
    } catch (e) {
      ids = await this.client.lrange(`bull:${name}:${state}`, min, max);
    }
    const data = await Promise.all(
      ids.map((id) =>
        (async () => {
          return {
            ...(await this.client.hgetall(`bull:${payload.name}:${id}`)),
            id,
          };
        })(),
      ),
    );

    return { event: 'queue-data', data: { total, jobs: data } as IQueueData };
  }

  @SubscribeMessage('job-data')
  async jobData(
    _: any,
    payload: { name: string; id: string },
  ): Promise<WsResponse<unknown>> {
    const data = await this.client.hgetall(
      `bull:${payload.name}:${payload.id}`,
    );
    return { event: 'job-data', data: { job: { jobId: payload.id, ...data } } };
  }
}
