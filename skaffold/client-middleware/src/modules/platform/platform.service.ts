import { firstValueFrom } from 'rxjs';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type { ISetting } from '@tymlez/platform-api-interfaces';

@Injectable()
export class PlatformService {
  constructor(
    @Inject('PLATFORM_SERVICE') private platformClient: ClientProxy,
  ) {}

  async getSettingByNames(names: string[]): Promise<Array<string>> {
    const res = await this.platformClient.send<any>(
      'setting.getSettingByNames',
      { names },
    );
    const data = await firstValueFrom<ISetting[]>(res);
    return data.map((x) => x.value || '');
  }

  async validateToken(token: string): Promise<number> {
    const res = await this.platformClient.send<any>('auth.validateToken', {
      token,
    });
    return await firstValueFrom(res);
  }
}
