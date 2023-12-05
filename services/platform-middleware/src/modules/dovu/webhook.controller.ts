import {
  Controller,
  Post,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IMutationResult } from '@tymlez/platform-api-interfaces';
import type { Request } from 'express';
import { HmacGuard } from 'nestjs-hmac256-guard';
import { DovuService } from './dovu.service';
import { CreateDovuDto } from './dto/dovu.dto';

@Controller('dovu/webhook')
@UseGuards(HmacGuard)
export class DovuWebHookController {
  constructor(private dovuService: DovuService) {}

  @Post()
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async add(@Req() req: Request): Promise<IMutationResult> {
    const body = req.body.data;

    const dovu: CreateDovuDto = {
      signature: req.headers['x-signature'] as string,
      partnerIdentifier: body.context,
      customerReference: body.reference,
      retirementTx: body['retirement-tx'],
      retiredKgs: body['retired-kgs'],
      reserveRemainingKg: body['reserve-remaining-kg'],
    };
    return await this.dovuService.add(dovu);
  }
}
