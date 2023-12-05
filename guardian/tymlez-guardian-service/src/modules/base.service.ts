import { Inject } from '@nestjs/common';
import type {
  GuardianClientApi,
  PolicyBlockData,
  Session,
} from '@tymlez/guardian-api-client';
import type { Model } from 'mongoose';
import { Encryption } from '@tymlez/backend-libs';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { TymlezUser } from '../schemas/user.schema';

export class BaseService {
  @Inject('GuardianClientApi') public api: GuardianClientApi;

  constructor(public userModel: Model<TymlezUser>) {}

  public async loginAsRootAuthority(client: string) {
    const user = await this.userModel.findOne({
      role: 'STANDARD_REGISTRY',
      client,
    });
    if (!user) {
      throw new Error(`Root Authority not found for client: ${client}`);
    }

    const actualPassword = Encryption.decrypted(user.password, user.iv);

    return await this.api.auth().login(user.username, actualPassword);
  }

  public async loginAsAuditor(client: string) {
    const roleName = 'AUDITOR';
    const username = `${client}-auditor`;
    const user = await this.userModel.findOne({
      role: roleName,
      username,
      client,
    });
    if (!user) {
      const password =
        process.env.GUARDIAN_USER_PASSWORD || Encryption.randomPassword(24);
      const encryptedPassword = Encryption.encrypt(password);
      // register user
      await this.api.auth().register(username, password, roleName);
      const newUser = await this.userModel.create({
        username,
        password: encryptedPassword.encrypted,
        iv: encryptedPassword.iv,
        client,
        role: roleName,
        data: {},
      });
      await newUser.save();
    }
    return this.loginAsUser(client, username, roleName);
  }

  public async profile(session: Session) {
    return this.api.profile().getProfile(session);
  }

  public async loginAsOwner(client: string) {
    const username = `${client}-owner`;
    return this.loginAsUser(client, username);
  }

  public async loginAsUser(
    client: string,
    username: string,
    role: 'USER' | 'AUDITOR' = 'USER',
  ) {
    const user = await this.userModel.findOne({
      role,
      client,
      username,
    });
    if (!user) {
      throw new Error(`User not found : ${client}/${username}`);
    }

    const actualPassword = Encryption.decrypted(user.password, user.iv);

    return await this.api.auth().login(user.username, actualPassword);
  }

  public async getPolicyBlockData<T = PolicyBlockData>(
    session: Session,
    policyId: string,
    blockTag: string,
  ) {
    const blockId = await this.api
      .policy()
      .getBlockTagId(session, policyId, blockTag);

    if (!blockId.id) {
      throw new Error(
        `No block found for policyId: ${policyId} and blockTag: ${blockTag}`,
      );
    }
    return (await this.api
      .policy()
      .getBlockData(session, policyId, blockId.id)) as unknown as T;
  }

  public async setPolicyBlockData<T>(
    session: Session,
    policyId: string,
    blockTag: string,
    data: T,
  ) {
    const blockId = await this.api
      .policy()
      .getBlockTagId(session, policyId, blockTag);
    if (!blockId.id) {
      throw new Error(
        `No block found for policyId: ${policyId} and blockTag: ${blockTag}`,
      );
    }

    return await this.api
      .policy()
      .setBlockData(session, policyId, blockId.id, data);
  }

  public async getPublishedPolicies(session: Session) {
    return (await this.api.policy().getAll(session)).filter(
      (x) => x.status === 'PUBLISH',
    );
  }

  public async getAccountBalance(
    accountId: string,
    isTestnet = true,
  ): Promise<string> {
    try {
      const path = isTestnet
        ? 'https://testnet.mirrornode.hedera.com'
        : 'https://mainnet-public.mirrornode.hedera.com';
      const res: AxiosResponse = await axios.get(
        `${path}/api/v1/balances?account.id=${accountId}`,
      );

      const { balance } = res.data.balances[0];
      return ((balance as number) / 100000000).toString();
    } catch (err: any) {
      return '';
    }
  }
}
