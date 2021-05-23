import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {ApikeyInterface} from './apikey.interface';
import {ApikeySchemaName} from './apikey.schema';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class ApikeyService {

  constructor(
    @InjectModel(ApikeySchemaName) private readonly apikeyRepository: Model<ApikeyInterface>
  ) {
  }

  public async generateNewKey(): Promise<string> {
    const newKey: string = uuidv4().toString();
    const executeUpdate = await this.apikeyRepository.updateOne(
      {apikey: newKey},
      {apikey: newKey},
      {upsert: true}
    );
    if (executeUpdate.ok === 1)
      return newKey;
    return 'null';
  }

  public async findApikeyExists(apikey: string): Promise<boolean> {
    const weatherDocs: ApikeyInterface = await this.apikeyRepository.findOne(
      {apikey: apikey}, {_id: 0}
    );
    return weatherDocs !== null;
  }

}
