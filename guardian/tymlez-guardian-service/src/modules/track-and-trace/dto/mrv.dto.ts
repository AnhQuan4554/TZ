import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  Validate,
  ValidateIf,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsJsonStringify', async: true })
@Injectable()
export class IsJsonStringifyRule implements ValidatorConstraintInterface {
  async validate(value: string) {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is expected as a JSON stringify value of object/array`;
  }
}

export class MrvSource {
  @IsNotEmpty()
  readingId: string;

  @IsNotEmpty()
  hashId: string;
}
export class MrvData {
  // mrvTimestamp: string;
  // mrvDuration: number;
  // mrvEnergyAmount: number;
  // mrvCarbonAmount: number;
  @IsNotEmpty()
  readingId: string;

  @IsNotEmpty()
  deviceId: string;

  @IsNotEmpty()
  readingDate: string;

  @IsNotEmpty()
  intervalStartDateTime: string;

  @IsNotEmpty()
  intervalEndDateTime: string;

  @IsNotEmpty()
  intervalDuration: number;

  @IsNotEmpty()
  intervalDurationUOM: string;

  @IsNotEmpty()
  value: string;

  @IsNotEmpty()
  valueUOM: string;

  @IsNotEmpty()
  quality: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => MrvSource)
  sourceData: MrvSource[];

  @ValidateIf((o) => o.otherMRVData)
  @Validate(IsJsonStringifyRule)
  otherMRVData: string;
  // CET

  greenhouseGasEmissionsScope: string;
  greenhouseGasEmissionsSource: string;
  CO2Emissions: number;
  CH4Emissions: number;
  N2OEmissions: number;
  CO2eqEmissions: number;
  CO2eqEmissionsTYMLEZ: number;
  emissionsUOM: string;
  emissionsFactorsLink: string;
  CO2eqFormula: string;
  CO2eqFormulaLink: string;

  //CRU

  CO2eqEmissionsReduction: number;
  CO2eqEmissionsReductionTYMLEZ: number;
  emissionsReductionUOM: string;
  CO2eqEmissionsReductionFormula: string;
  CO2eqEmissionsReductionFormulaLink: string;
}
export class GenerateMvcDto {
  @IsNotEmpty()
  policyTag: string;

  @IsNotEmpty()
  deviceId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MrvData)
  data: MrvData;
}
