import { Injectable } from '@nestjs/common';
import {
  METRIC_NAMES,
  reportAPMMetric,
  reportErrorToNewRelic,
} from '@tymlez/backend-libs';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class GuardianLogsService {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(GuardianLogsService.name);
  }

  handleGuardianErrorLogEvent(log: Record<string, any>) {
    try {
      this.logger.error(log.message || 'Guardian error occured', log);
      reportAPMMetric(METRIC_NAMES.GUARDIAN_ERROR_OCCURED, 1, 'Guardian');
    } catch (error) {
      reportErrorToNewRelic(
        error as Error,
        METRIC_NAMES.GUARDIAN_ERROR_OCCURED,
      );
    }
  }

  handleGuardianTokenMintedEvent(tokenMinted: Record<string, any>) {
    this.logger.info({ tokenMinted }, 'Guardian token minted successful');
    reportAPMMetric(
      `${METRIC_NAMES.GUARDIAN_TOKEN_MINTED}_${tokenMinted.tokenId.replaceAll(
        '.',
        '_',
      )}`,
      1,
      `Guardian`,
    );
  }
}
