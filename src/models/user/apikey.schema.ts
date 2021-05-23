import * as mongoose from 'mongoose';
import {ObjectID} from 'bson';

export const ApikeySchemaName = 'ApikeySchema';
export const ApikeySchema = new mongoose.Schema(
  {
    id: {type: ObjectID},
    apikey: {type: String},
  },
  {
    collection: 'user-apikey',
    versionKey: false
  }
);
ApikeySchema.index({apikey: -1}, {unique: true});
