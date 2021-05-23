import {MongooseModule, MongooseModuleOptions} from '@nestjs/mongoose';

const config: MongooseModuleOptions = {
  user: '[your mongodb username]',
  pass: '[your mongodb password]',
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
  '[your mongodb uri with database name]', // like mongodb+srv://liquid.t0knb.mongodb.net/noodoe-work
  config
);
