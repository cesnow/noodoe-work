import {Document} from 'mongoose';
import {ObjectID} from 'bson';

export interface WeatherInterface extends Document {
  id?: ObjectID;
  lat: string;
  lon: string;
  locationName: string;
  stationId: string;
  time: Date;
  weatherElement: object;
  parameter: object;
}
