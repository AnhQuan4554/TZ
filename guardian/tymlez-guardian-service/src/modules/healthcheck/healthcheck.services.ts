import { Injectable, Logger } from '@nestjs/common';
import {
  reportAPMMetric,
  METRIC_NAMES,
  reportErrorToNewRelic,
} from '@tymlez/backend-libs';
import type { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Interval } from '@nestjs/schedule';
import { BaseService } from '../base.service';
import { TymlezUser } from '../../schemas/user.schema';

const HEALTH_CHECK_INTERVAL = parseInt(
  process.env.BALANCE_REPORT_INTERVAL || '300000',
  10,
);

@Injectable()
export class CustomHealthcheckService extends BaseService {
  private readonly logger = new Logger(CustomHealthcheckService.name);

  constructor(
    @InjectModel(TymlezUser.name, 'tymlez')
    userModel: Model<TymlezUser>,
  ) {
    super(userModel);
  }

  async healthcheck() {
    // verify connection to MongoDB
    const mongo = true;
    let guardian = true;
    try {
      const demoUsers = await this.api.demo().getRegisteredUsers();
      if (demoUsers.length === 0) {
        this.logger.warn('No demo users found');
        throw new Error(
          'Guardian api not working properly, please check auth & logger service',
        );
      }
      // get user balance
      reportAPMMetric(METRIC_NAMES.GUARDIAN_HEALTHCHECK_SUCCESS, 1);
    } catch (e) {
      reportAPMMetric(METRIC_NAMES.GUARDIAN_HEALTHCHECK_ERROR, 1);
      this.logger.error('Unable to connect to Guardian API', e);
      guardian = false;
    }
    return {
      status: mongo && guardian ? 'down' : 'down',
      components: {
        mongo,
        guardian,
      },
    };
  }

  @Interval(HEALTH_CHECK_INTERVAL)
  async reportUserBalance() {
    const users = await this.userModel.find({
      role: { $in: ['USER', 'STANDARD_REGISTRY'] },
    });

    for await (const user of users) {
      const { client, username, role } = user;
      try {
        const session = await this.loginAsUser(client, username, role as any);
        const profile = await this.api.profile().getProfile(session);
        const accountId = profile.hederaAccountId as string;
        const did = profile.did as string;
        const isTestnet = did.includes('testnet');
        const balanceStr = await this.getAccountBalance(accountId, isTestnet);

        if (balanceStr !== '') {
          reportAPMMetric(`guardian.balance.${username}.realtime`, +balanceStr);
        }
      } catch (err: any) {
        // swallow
        this.logger.error(
          { err },
          `Unable to run balance healthcheck ${client}/${username} account`,
        );
        reportErrorToNewRelic(
          err,
          METRIC_NAMES.GUARDIAN_ROOT_ACCOUNT_REALTIME_BALANCE_ERROR,
        );
      }
    }
  }
}
