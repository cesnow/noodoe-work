import {Module, OnModuleInit} from '@nestjs/common';
import {ModuleRef} from '@nestjs/core';
import {MongooseProvider} from './mongoose.provider';

@Module({
  imports: [
    MongooseProvider,
  ],
})
export class DatabaseModule implements OnModuleInit {

  public constructor(
    private readonly moduleRef: ModuleRef
  ) {
  }

  public async onModuleInit() {
    return;
  }

}
