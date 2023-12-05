import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class IsoDateTimePipe implements PipeTransform {
  constructor(private defaultValue?: string) {}

  transform(value?: any, metadata?: ArgumentMetadata) {
    const input = value ?? this.defaultValue;

    if (input === undefined || input === null) {
      throw new BadRequestException(
        `${metadata?.data}: ISO date time is required`,
      );
    }

    try {
      return new Date(input).toISOString();
    } catch (err) {
      throw new BadRequestException(
        `${metadata?.data}: Invalid ISO date format (${err})`,
      );
    }
  }
}
