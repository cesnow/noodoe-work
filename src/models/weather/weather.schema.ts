import * as mongoose from 'mongoose';
import {ObjectID} from 'bson';

export const WeatherSchemaName = 'WeatherSchema';
export const WeatherSchema = new mongoose.Schema(
  {
    id: {type: ObjectID},
    lat: {type: String},
    lon: {type: String},
    locationName: {type: String},
    stationId: {type: String},
    time: {type: Date},
    weatherElement: {type: Object},
    parameter: {type: Object},
  },
  {
    collection: 'weather',
    versionKey: false
  }
);
WeatherSchema.index({'parameter.CITY': 1}, {unique: false});
WeatherSchema.index({time: -1}, {unique: false});
