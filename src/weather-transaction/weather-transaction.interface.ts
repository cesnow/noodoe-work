export interface ResponseWeatherResult {
  success: string;
  records: ResponseWeatherResultRecords;
}

export interface ResponseWeatherResultRecords {
  location: ResponseWeatherDoc[];
}

export interface ResponseWeatherDoc {
  lat: string;
  lon: string;
  locationName: string;
  stationId: string;
  time: ResponseWeatherDocTime;
  weatherElement: ResponseWeatherDocElement[];
  parameter: ResponseWeatherDocParameter[];
}

export interface ResponseWeatherDocTime {
  obsTime: string;
}

export interface ResponseWeatherDocElement {
  elementName:
    'ELEV' | 'WDIR' | 'WDSD' | 'TEMP' | 'HUMD' | 'PRES' | 'H_24R' |
    'H_FX' | 'H_XD' | 'H_FXT' | 'D_TX' | 'D_TXT' | 'D_TN' | 'D_TNT';
  elementValue: string;
}

export interface ResponseWeatherDocParameter {
  parameterName: 'CITY' | 'CITY_SN' | 'TOWN' | 'TOWN_SN';
  parameterValue: string;
}

export interface WeatherDocTidy {
  lat: string;
  lon: string;
  locationName: string;
  stationId: string;
  time: Date;
  weatherElement: object;
  parameter: object;
}

export interface WeatherResponse {
  count: number;
  data: WeatherDocTidy[];
}
