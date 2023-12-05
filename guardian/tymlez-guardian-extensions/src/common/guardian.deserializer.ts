import { ConsumerDeserializer, IncomingRequest } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { TextDecoder } from 'util';
import { ExternalMessageEvents } from './constants';

export class GuardianMQDeserializer implements ConsumerDeserializer {
  private readonly logger = new Logger('GuardianMQDeserializer');

  deserialize(
    value: Buffer | Uint8Array,
    options?: Record<string, any>,
  ): IncomingRequest {
    this.logger.verbose(`Deserializing inbound message: ${options?.channel}`);
    const { channel } = options as any;
    const contentStr = new TextDecoder('utf-8').decode(value);
    try {
      const jsonRaw = JSON.parse(contentStr);

      if (
        [
          ExternalMessageEvents.IPFS_BEFORE_UPLOAD_CONTENT,
          ExternalMessageEvents.IPFS_AFTER_READ_CONTENT,
        ].includes(channel)
      ) {
        return {
          pattern: channel,
          id: channel,
          data: Buffer.from(jsonRaw.content, 'base64'),
        } as any;
      }

      return {
        pattern: channel,
        data: jsonRaw,
      } as any;
    } catch (error) {
      this.logger.error(
        { error, options },
        'Error happen when deserializing broker message ',
      );
    }
    return {
      pattern: channel,
      data: value,
    } as any;
  }
}
