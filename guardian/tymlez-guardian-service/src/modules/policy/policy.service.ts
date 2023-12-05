import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../base.service';
import { TymlezUser } from '../../schemas/user.schema';

@Injectable()
export class PolicyService extends BaseService {
  constructor(
    @InjectModel(TymlezUser.name, 'tymlez')
    userModel: Model<TymlezUser>,
  ) {
    super(userModel);
  }

  async getAll(clientName: string) {
    const session = await this.loginAsRootAuthority(clientName);
    return await this.api.policy().getAll(session);
  }
}
