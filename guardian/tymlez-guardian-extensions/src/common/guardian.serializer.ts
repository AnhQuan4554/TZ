import { Serializer, OutgoingEvent } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { StringCodec } from 'nats';

export class GuardianMQSerializer implements Serializer {
  private readonly logger = new Logger('GuardianMQSerializer');
  serialize(responseData: any): OutgoingEvent {
    const { response, id } = responseData;
    this.logger.debug(`-->> Serializing outbound response : ${id}`);
    // Guardian implementation the response as {body, code, error}
    const responseMessage = { body: response.data.toString('base64') };
    const stringEncodedContent = StringCodec().encode(
      JSON.stringify(responseMessage),
    );

    return {
      pattern: id,
      data: stringEncodedContent,
    };
  }
}
