import {Logger, MiddlewareConsumer, Module, NestModule, OnModuleInit} from '@nestjs/common';
import {MongooseModelsModule} from '../models/mongoose.models.module';
import {WeatherTransactionController} from './weather-transaction.controller';
import {WeatherTransactionService} from './weather-transaction.service';
import {ApikeyMiddleware} from './apikey.middleware';
import {ScheduleModule} from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModelsModule
  ],
  controllers: [
    WeatherTransactionController
  ],
  providers: [
    WeatherTransactionService
  ]
})
export class WeatherTransactionModule implements OnModuleInit, NestModule {

  public async onModuleInit() {
    Logger.log(`Module Init`, 'RemoteTransaction');
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApikeyMiddleware)
      .forRoutes('/weather/info');
  }

}
