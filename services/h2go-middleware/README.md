# Hydrogen Middleware

Middleware / API layer of the Client Hydrogen

# Local development

```sh
yarn dev:up

# Start dev server
yarn start:dev
```

## MRV configuration

### CET

```json
{
  "CarbonEmissionConversionRate": 0.001,
  "ReadingConversionRate": 0.001,
  "CarbonEqEmissionMetricNames": "carbon.emissions",
  "CarbonEmissionMetricNames": "carbon.emissions",
  "ReadingMetricName": "water_treatment.input.electricity,electrolyser.input.electricity,gas_purification.input.electricity,compression.input.electricity",
  "OtherMRVDataMetricNames": "",
  "defaultMRVFields": {
    "valueUOM": "kWh",
    "CO2eqFormula": "$value* 0.8/1000"
  }
}
```

### CRU

```json
{
  "CarbonReductionConversionRate": 0.001,
  "ReadingConversionRate": 0.001,
  "CarbonReductionMetricNames": "carbon.reduction",
  "ReadingMetricName": "electrolyser.input.solar,water_treatment.input.solar,gas_purification.input.solar,compression.input.solar",
  "OtherMRVDataMetricNames": "",
  "defaultMRVFields": {
    "valueUOM": "kWh"
  }
}
```

### GoO

```json
{
  "CarbonEmissionConversionRate": 0.001,
  "CarbonReductionConversionRate": 0.001,
  "ReadingConversionRate": 0.001,
  "CarbonEqEmissionMetricNames": "carbon.emissions",
  "CarbonEmissionMetricNames": "",
  "CarbonReductionMetricNames": "carbon.reduction",
  "ReadingMetricName": "compressor.output.hydrogen",
  "OtherMRVDataMetricNames": "water_treatment.input.water,water_treatment.input.water,water_treatment.input.electricity,electrolyser.input.electricity,gas_purification.input.electricity,compression.input.electricity,electrolyser.input.solar,electrolyser.input.solar,gas_purification.input.solar,compression.input.solar",
  "defaultMRVFields": {
    "valueUOM": "t"
  }
}
```
