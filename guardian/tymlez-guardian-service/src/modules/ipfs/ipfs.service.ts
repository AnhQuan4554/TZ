import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';

@Injectable()
export class IpfsService extends BaseService {
  async upload<T>(clientName: string, data: T): Promise<string> {
    const session = await this.loginAsRootAuthority(clientName);
    return await this.api.ipfs().upload(session, data);
  }
}
