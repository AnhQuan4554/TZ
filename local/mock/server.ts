/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const memoryCacheFiles: any = {};
function roundToNearest(date = new Date(), minutes = 5) {
  const ms = 1000 * 60 * minutes;
  return new Date(Math.round(date.getTime() / ms) * ms);
}
const jsonFrom = (file: string) => JSON.parse(fs.readFileSync(file, 'utf8'));

(async () => {
  const app = express();
  app.use((req, res, next) => {
    console.log('Request: ', req.url);
    res.on('finish', () => {
      console.log('Response: ', req.url, res.statusCode);
    });
    next();
  });
  app.use(bodyParser.json());
  app.get('/solcast/utility_scale_sites/:deviceId/:dataApi', (req, res) => {
    const start = roundToNearest();
    const minutes = (+(req.query as any).hours || 168) * 60;
    const estimated_actuals: any[] = [];
    let i = 0;
    const between = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min) + min);
    };

    while (i <= minutes) {
      estimated_actuals.push({
        pv_estimate: between(15000, 30000) / 1000000,
        period_end: new Date(start.getTime() - i * 60 * 1000).toISOString(),
        period: 'PT5M',
      });
      i += 5;
    }

    res.json({ estimated_actuals });
  });

  app.get('/wattwatchers/:energyType/:deviceId', (req, res) => {
    const { fromTs, toTs } = req.query as any;

    const jsonFile = path.join(
      __dirname,
      'wattwatchers',
      req.params.energyType,
      `${req.params.deviceId}.json`,
    );
    let data = memoryCacheFiles[jsonFile];
    if (!data && fs.existsSync(jsonFile)) {
      data = jsonFrom(jsonFile);
      memoryCacheFiles[jsonFile] = data;
    }
    if (data) {
      // generate data from source
      let startTimestamp = Math.round(
        roundToNearest(new Date(+fromTs * 1000)).getTime() / 1000,
      );
      const result: any[] = [];
      const endTime = +toTs;
      while (startTimestamp <= endTime) {
        const rnd = _.shuffle([...data])[0];
        result.push({ ...rnd, timestamp: startTimestamp });
        startTimestamp += 5 * 60;
      }
      res.json(result);
      return;
    }
    console.error('No data source found for request: ', jsonFile);
    res.status(500).send('No data source found');
  });
  const port = process.env.PORT || 9001;
  app.listen(port, () => {
    console.log('Mock server running at %s', port);
  });
})();
