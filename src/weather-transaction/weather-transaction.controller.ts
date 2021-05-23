import {Controller, Get, Inject, Logger} from '@nestjs/common';
import {WeatherService} from '../models/weather/weather.service';
import {WeatherTransactionService} from './weather-transaction.service';
import {WeatherDocTidy, WeatherResponse} from './weather-transaction.interface';
import {Cron, SchedulerRegistry} from '@nestjs/schedule';
import {CronJob} from 'cron';

@Controller('/weather')
export class WeatherTransactionController {

  private readonly refreshWeatherCronJobEveryMinutesJob: CronJob;

  constructor(
    @Inject(WeatherService) private readonly weatherService: WeatherService,
    @Inject(WeatherTransactionService) private readonly  weatherTransactionService: WeatherTransactionService,
    private schedulerRegistry: SchedulerRegistry
  ) {
    const refreshWeatherCronJobEvery3Min = new CronJob(
      `0 */3 * * * *`, () => this.refreshWeatherCronJob(), null, false);
    this.schedulerRegistry.addCronJob('weatherCronJobEvery3MinJob', refreshWeatherCronJobEvery3Min);
    this.refreshWeatherCronJobEveryMinutesJob = this.schedulerRegistry.getCronJob('weatherCronJobEvery3MinJob');
  }

  @Get('/manual-refresh')
  public async manualRefresh(): Promise<object> {
    const refreshData: WeatherDocTidy[] = await this.weatherTransactionService.fetchWeatherOpenData();
    const updatedNumber: number = await this.weatherService.updateWeatherData(refreshData);
    return {updateResult: updatedNumber};
  }

  @Get('/info')
  public async info(): Promise<WeatherResponse> {
    const fetchData: WeatherDocTidy[] = await this.weatherService.fetchWeatherData();
    return {
      count: fetchData.length,
      data: fetchData
    };
  }

  @Cron('0 0 * * * *', {name: 'refreshWeatherJob'}) // or 0 */1 * * * *
  public async refreshWeatherCronJob(): Promise<void> {
    const refreshData: WeatherDocTidy[] = await this.weatherTransactionService.fetchWeatherOpenData();
    if (refreshData.length > 0) {
      const updatedNumber: number = await this.weatherService.updateWeatherData(refreshData);
      Logger.log(`weather fetch result: ${updatedNumber}`, 'CronUpdateWeather');
      this.refreshWeatherCronJobEveryMinutesJob.stop();
    } else {
      Logger.log(`weather fetch result: ${refreshData.length}, restart at 3 min.`, 'CronUpdateWeather');
      this.refreshWeatherCronJobEveryMinutesJob.start();
    }
  }

}
