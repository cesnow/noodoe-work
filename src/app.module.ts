import {DynamicModule, Module, OnModuleInit} from '@nestjs/common';
import {AppHealthController} from './app-health.controller';
import {WeatherTransactionModule} from './weather-transaction/weather-transaction.module';
import {UserApikeyModule} from './user-apikey/user-apikey.module';

@Module({})
export class AppModule implements OnModuleInit {

  public static forRoot(): DynamicModule {
    return {
      imports: [
        WeatherTransactionModule,
        UserApikeyModule
      ],
      module: AppModule,
      providers: [],
      controllers: [
        AppHealthController
      ],
    };
  }

  onModuleInit() {
    return;
  }

}
