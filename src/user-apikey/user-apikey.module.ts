import {Logger, Module, OnModuleInit} from '@nestjs/common';
import {MongooseModelsModule} from '../models/mongoose.models.module';
import {UserApikeyController} from './user-apikey.controller';

@Module({
  imports: [
    MongooseModelsModule
  ],
  controllers: [
    UserApikeyController
  ]
})
export class UserApikeyModule implements OnModuleInit {
  public async onModuleInit() {
    Logger.log(`Module Init`, 'UserAuthKeyModule');
  }
}
