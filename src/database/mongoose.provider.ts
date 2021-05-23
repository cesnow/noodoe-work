import {MongooseModule, MongooseModuleOptions} from '@nestjs/mongoose';

const config: MongooseModuleOptions = {
  user: 'liquid',
  pass: 'C4p5nmn9tTvB6M2m',
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

export const MongooseProvider = MongooseModule.forRoot(
  'mongodb+srv://liquid.t0knb.mongodb.net/noodoe-work',
  config
);
