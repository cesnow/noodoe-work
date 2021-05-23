import {Document} from 'mongoose';
import {ObjectID} from 'bson';

export interface ApikeyInterface extends Document {
  id?: ObjectID;
  apikey: string;
}
