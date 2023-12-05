# Hydrogen Middleware

Middleware / API layer of the Client SolarFarm

# Local development

```sh
yarn dev:up

# Start dev server
yarn start:dev
```

## MRV configuration

### REC

```json
{
  "ReadingConversionRate": 0.001,
  "ReadingMetricName": "solar_array_1.output,solar_array_2.output,solar_array_3.output,solar_array_4.output",
  "OtherMRVDataMetricNames": "solar_array_1.carbon.reduction,solar_array_2.carbon.reduction,solar_array_3.carbon.reduction,solar_array_4.carbon.reduction,solar_array_1.output.panel,solar_array_2.output.panel,solar_array_3.output.panel,solar_array_4.output.panel",
  "defaultMRVFields": {
    "valueUOM": "MWh"
  }
}
```
