import {Test} from '@nestjs/testing';
import {MongooseModelsModule} from '../models/mongoose.models.module';
import {UserApikeyController} from './user-apikey.controller';
import {ApikeyService} from '../models/user/apikey.service';

describe('WeatherTransactionModule', () => {
  let userApikeyController: UserApikeyController;
  let apikeyService: ApikeyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongooseModelsModule
      ],
      controllers: [
        UserApikeyController
      ],
    }).compile();
    userApikeyController = module.get<UserApikeyController>(UserApikeyController);
    apikeyService = module.get<ApikeyService>(ApikeyService);
  });
  describe('user apikey controllers test (rest api)', () => {
    it('test /user/gen-apikey, should return new apikey of user', async () => {
      const mockNewUserApiKey: string = 'uuid4-key';
      jest.spyOn(apikeyService, 'generateNewKey').mockImplementation(async () => mockNewUserApiKey);
      const mockControllerResult: object = {apikey: mockNewUserApiKey, new: true};
      expect(await userApikeyController.generateApiKey()).toStrictEqual(mockControllerResult);
    });

  });
});
