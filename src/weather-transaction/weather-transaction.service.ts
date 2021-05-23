import {Inject, Injectable, Logger} from '@nestjs/common';
import axios, {AxiosResponse} from 'axios';
import {ResponseWeatherResult, WeatherDocTidy} from './weather-transaction.interface';
import {WeatherService} from '../models/weather/weather.service';

@Injectable()
export class WeatherTransactionService {

  private ApiOpenDataRemote: string = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001';
  private ApiOpenDataCwbAuthKey: string = 'CWB-7BB526EB-A129-4302-9F13-D19AF15D4C69';
  private IncludeCountries: string[] = [
    '五分山雷達站', '板橋', '淡水', '山佳', '坪林', '四堵', '泰平', '福山', '桶後', '石碇', '火燒寮', '瑞芳', '大坪', '五指山',
    '福隆', '雙溪', '富貴角', '三和', '金山', '鼻頭角', '三貂角', '三峽', '新莊', '三芝', '八里', '蘆洲', '土城', '鶯歌', '中和',
    '汐止', '永和', '五分山', '林口', '深坑', '福山植物園', '五股', '屈尺', '白沙灣', '三重', '下盆', '四十份', '國一N039K',
    '鞍部', '臺北', '竹子湖', '社子', '天母', '士林', '內湖', '大屯山', '信義', '文山', '平等', '松山', '石牌', '關渡',
    '國三N016K', '新屋', '復興', '桃園', '八德', '大園', '觀音', '蘆竹', '大溪', '平鎮', '楊梅', '龍潭', '龜山', '中壢',
    '大溪永福', '水尾'];

  constructor(
    @Inject(WeatherService) private readonly weatherService: WeatherService
  ) {
  }

  public async fetchWeatherOpenData(): Promise<WeatherDocTidy[]> {
    try {
      const response: AxiosResponse<ResponseWeatherResult> =
        await axios.get<ResponseWeatherResult>(this.getFinalApiUrl());
      return response.data.records.location.filter((doc) =>
        this.weatherService.getNowTimestampWithoutHS().getTime() -
        new Date(doc.time.obsTime).getTime() === 0
      ).map((doc): WeatherDocTidy => {
        return {
          lat: doc.lat,
          lon: doc.lon,
          locationName: doc.locationName,
          stationId: doc.stationId,
          time: new Date(doc.time.obsTime),
          weatherElement: doc.weatherElement.reduce((map, obj) => {
            map[obj.elementName] = obj.elementValue;
            return map;
          }, {}),
          parameter: doc.parameter.reduce((map, obj) => {
            map[obj.parameterName] = obj.parameterValue;
            return map;
          }, {}),
        };
      });
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }

  private getFinalApiUrl(): string {
    const locName: string = encodeURI(this.IncludeCountries.join(','));
    const parameter: string = `?Authorization=${this.ApiOpenDataCwbAuthKey}&format=JSON&locationName=${locName}`;
    // Logger.log(this.ApiOpenDataRemote + parameter, 'OpenDataApi');
    return this.ApiOpenDataRemote + parameter;
  }

}
