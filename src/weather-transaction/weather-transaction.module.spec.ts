import {Test} from '@nestjs/testing';
import {WeatherTransactionController} from './weather-transaction.controller';
import {WeatherTransactionService} from './weather-transaction.service';
import {WeatherService} from '../models/weather/weather.service';
import {WeatherDocTidy, WeatherResponse} from './weather-transaction.interface';
import {MongooseModelsModule} from '../models/mongoose.models.module';
import {ScheduleModule} from '@nestjs/schedule';

describe('WeatherTransactionModule', () => {
  let weatherTransactionController: WeatherTransactionController;
  let weatherTransactionService: WeatherTransactionService;
  let weatherService: WeatherService;
  const preConstWeatherDocTidy: WeatherDocTidy = {
    lat: '24.778333',
    lon: '121.494583',
    locationName: '福山',
    stationId: 'C0A560',
    time: new Date(),
    weatherElement: {
      ELEV: '405.0',
      WDIR: '0',
      WDSD: '0.0',
      TEMP: '21.8',
      HUMD: '1',
      PRES: '965.1',
      H_24R: '0.0',
      H_FX: '-99',
      H_XD: '-99',
      H_FXT: '-99',
      D_TX: '22.20',
      D_TXT: '2021-05-24T00:10:00+08:00',
      D_TN: '21.80',
      D_TNT: '2021-05-24T01:00:00+08:00',
    },
    parameter: {
      CITY: '新北市',
      CITY_SN: '06',
      TOWN: '烏來區',
      TOWN_SN: '061'
    }
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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
    }).compile();
    weatherTransactionController = module.get<WeatherTransactionController>(WeatherTransactionController);
    weatherTransactionService = module.get<WeatherTransactionService>(WeatherTransactionService);
    weatherService = module.get<WeatherService>(WeatherService);
  });
  describe('weather controllers test (rest api)', () => {
    it('test /weather/info, should return data count/content of weather info', async () => {
      const mockServiceResult: WeatherDocTidy[] = [preConstWeatherDocTidy];
      jest.spyOn(weatherService, 'fetchWeatherData').mockImplementation(async () => mockServiceResult);
      const mockControllerResult: WeatherResponse = {
        count: mockServiceResult.length,
        data: mockServiceResult
      };
      expect(await weatherTransactionController.info()).toStrictEqual(mockControllerResult);
    });

    it('test /manual-refresh', async () => {
      const mockFetchWeatherOpenData: WeatherDocTidy[] = [preConstWeatherDocTidy];
      jest.spyOn(weatherTransactionService, 'fetchWeatherOpenData').mockImplementation(
        async () => mockFetchWeatherOpenData
      );
      const mockUpdateWeatherData: number = 1;
      jest.spyOn(weatherService, 'updateWeatherData').mockImplementation(async () => mockUpdateWeatherData);
      const mockControllerResult: object = {updateResult: mockUpdateWeatherData};
      expect(await weatherTransactionController.manualRefresh()).toStrictEqual(mockControllerResult);
    });

  });
});
