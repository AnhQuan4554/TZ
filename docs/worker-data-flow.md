# Worker Data Workflows

## Terminology

<dl>
  <dt>meter</dt>
  <dd>A meter represents a data source. Examples of meter types include 'WattWatchers' and 'Solcast'. The type of a meter decides the data source, data metrics, data format, data credentials and data intervals. </dd>
  <dd>A meter can optionally associate with a device id which is a device in Guardian.</dd>
  <dt>device</dt>
  <dd>A device refers to a phisical measuring device as defined in a Guardian Policy</dd>

  <dt>meter job</dt>
  <dd>A meter job defineds the background tasks for the ETL of meter data. It is comparable to a DGA in Airflow.</dd>
  <dd>A meter job has a start timestamp and an optional end timestamp. A meter task is created for each interval within the timestamp range. Examples of meter tasks include meter data collection, transformation, ingestion, validation, and Guardian MRV submission. Meter tasks are idempotent.</dd>

  <dt>meter data</dt>
  <dd>The Meter data is a database table that stores data collected and transformed from meters. It has a set normalised fields for persisting meter metrics at each timestamp interval.</dd>
  <dd>The Meter Data table is the main analytical data source that powers the client dashboard. Client middlewares are responsible for filter/aggregate relevant metrics as per client specific requirements.</dd>
  <dd>Meter metrics can be direct meter data points (e.g., eRealKwh) or calculated (carbon in tons). </dd>

</dl>

## Meter job runs

A meter task maintains the state a job execution (i.e., type, timestamp, retry_count, execution errs) for a time interval.

The meter job keeps a reference to the most recent task. The Platform Worker create a task at each interval. Each task typically involves the stages described below.

A meter job can be either of 'etl' type or 'mrv' type.

ETl type job tasks have 3 stages: collection, transformation and ingestion.
MRV type job tasks have 3 stages: extraction, verification and submission.

### ETL Collection stage

At the collection stage, the worker gets the data source and data credential settings from the task's associated meter. It will then fetch data using these settings at each time interval between the timestamp range.

The meter `type` decides the meter data structure and the `data_source`, `data_source_type` and `data_credentials` meter fields describe the data source location and retrieval methods.

| data_source_type | data_source                                                                                  | data_credentials                                          | description                                              |
| ---------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| 'API'            | external API resource identifier, for example, WattWatchers meter id or Solcast resource Id. | The API Key used for authentication with the external API | This source type is for getting data from external APIs. |
| 'S3'             | S3 bucket name.                                                                              | JSON string of AWS credentails                            | This source type is for copying data from a S3 bucket.   |

Retrieved data for each interval is stored at S3 for archival. If existing files are found in S3, it might skip the data fetching step depending on the Job setting (if force_override = false, default: true) and read data from the existing S3 file instead.

At the end of the data collection, the task will move to transformation stage.

### ETL Transformation stage

At the transform stage, the worker extracts the relevant metric values from the collected data. e.g. extract the eRealKwh metric value from the data.

It sometimes performs calcuation and/or aggregation to produce additional metrics. For example, to calculate carbon in Tons, It needs to apply a carbon factor to energy consumption (eRealKwh). The transformation logic is specific to each meter type, but the output data structure and format will be the same.

At the end of the transformation stage, the task will proceed into the data ingestion stage to persist the resulting metric values.

### ETL Data ingestion stage

Data ingestion tasks simply ingest the transformed data from S3 into the meter_data table.

### MRV extraction stage.

1. Gather metric values for the given meter/device from the meter_data table.
2. Creates a record to MRV table.

### MRV verification stage.

1. Verifies the record. (using settings with MRV prefix)
2. Update the MRV record status

### MRV submission stage.

1. Builds the MRV envent payload (according to settings with MRV prefix)
2. Sends an MRV event to the Guardian API.
3. Update the MRV record status
