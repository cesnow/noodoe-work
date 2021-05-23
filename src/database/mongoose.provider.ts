import {MongooseModule, MongooseModuleOptions} from '@nestjs/mongoose';

const MONGODB_USERNAME: string = '[your mongodb username]';
const MONGODB_PASSWORD: string = '[your mongodb password]';
const MONGODB_CONNECTION_URI: string = '[your mongodb connection uri with database name]';

const config: MongooseModuleOptions = {
  user: MONGODB_USERNAME,
  pass: MONGODB_PASSWORD,
  connectTimeoutMS: 1000,
  socketTimeoutMS: 0,
  poolSize: 15,
  bufferMaxEntries: 0,
  readPreference: 'secondaryPreferred',
  useNewUrlParser: true,
  keepAlive: true,
  bufferCommands: false,
  useCreateIndex: true,
};

export const MongooseProvider = MongooseModule.forRoot(MONGODB_CONNECTION_URI, config);
