import {Injectable, Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {WeatherInterface} from './weather.interface';
import {WeatherSchemaName} from './weather.schema';
import {WeatherDocTidy} from '../../weather-transaction/weather-transaction.interface';
import * as bluebird from 'bluebird';

@Injectable()
export class WeatherService {

  constructor(
    @InjectModel(WeatherSchemaName) private readonly weatherRepository: Model<WeatherInterface>
  ) {
  }

  public async updateWeatherData(refreshData: WeatherDocTidy[]): Promise<number> {
    let updateCount: number = 0;
    await bluebird.map(refreshData, async (doc) => {
      try {
        const executeUpdate = await this.weatherRepository.updateOne(
          {stationId: doc.stationId, time: doc.time},
          {$set: {...doc}},
          {upsert: true}
        );
        if (executeUpdate.ok === 1)
          updateCount++;
      } catch (e) {
        Logger.warn(doc);
        Logger.log(`Update Failed: ${e.toString()}`, 'UpdateWeatherData');
      }
    }, {concurrency: 1});

    return updateCount;
  }

  public async fetchWeatherData(): Promise<WeatherDocTidy[]> {
    const weatherDocs: WeatherInterface[] = await this.weatherRepository.find(
      {time: {$gte: this.getNowTimestampWithoutHS()}}, {_id: 0}
    ).sort({_id: 1});
    return weatherDocs.map((data) => data.toObject());
  }

  public getNowTimestampWithoutHS(): Date {
    const nowDate: Date = new Date();
    const currentTimeInSeconds: number = Math.floor(nowDate.getTime() / 1000) -
      (nowDate.getUTCMinutes() * 60) - nowDate.getUTCSeconds();
    return new Date(currentTimeInSeconds * 1000);
  }

}
