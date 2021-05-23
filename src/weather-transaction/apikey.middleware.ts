import {Inject, Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import {ApikeyService} from '../models/user/apikey.service';

@Injectable()
export class ApikeyMiddleware implements NestMiddleware {
  @Inject(ApikeyService) private readonly apikeyService: ApikeyService;

  async use(req: Request, res: Response, next: NextFunction) {
    const userApiKey: string = (req.query.apikey || '-').toString();
    const findApikeyExists: boolean = await this.apikeyService.findApikeyExists(userApiKey);
    if (!findApikeyExists) {
      res.sendStatus(401);
      return;
    }
    next();
  }
}
