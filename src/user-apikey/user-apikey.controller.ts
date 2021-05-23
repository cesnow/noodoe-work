import {Controller, Get, Inject} from '@nestjs/common';
import {ApikeyService} from '../models/user/apikey.service';

@Controller('/user')
export class UserApikeyController {

  constructor(
    @Inject(ApikeyService) private readonly apikeyService: ApikeyService,
  ) {
  }

  @Get('/gen-apikey')
  public async generateApiKey(): Promise<object> {
    const newKey: string = await this.apikeyService.generateNewKey();
    return {apikey: newKey, new: true};
  }

}
