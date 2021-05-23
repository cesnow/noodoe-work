import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {WeatherSchema, WeatherSchemaName} from './weather/weather.schema';
import {WeatherService} from './weather/weather.service';
import {DatabaseModule} from '../database/database.module';
import {ApikeySchema, ApikeySchemaName} from './user/apikey.schema';
import {ApikeyService} from './user/apikey.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      {name: WeatherSchemaName, schema: WeatherSchema},
      {name: ApikeySchemaName, schema: ApikeySchema}
    ]),
  ],
  providers: [
    WeatherService,
    ApikeyService,
  ],
  exports: [
    WeatherService,
    ApikeyService,
  ]
})
export class MongooseModelsModule {
}
