import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { withTransaction } from '@tymlez/backend-libs';
import { NewRelicService } from './new-relic.service';

@Controller()
export class NewRelicMicroservice {
  constructor(private readonly newrelicService: NewRelicService) {}

  @MessagePattern('newrelic.createSyntheticMonitor')
  async createSyntheticMonitor({
    script,
    scriptName,
  }: {
    script: string;
    scriptName: string;
  }) {
    withTransaction('newrelic.getSyntheticMonitor', 'microservice', () =>
      this.newrelicService.createSyntheticMonitor(script, scriptName),
    );
  }
}
