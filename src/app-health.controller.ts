import {Controller, Get} from '@nestjs/common';

@Controller('/health')
export class AppHealthController {

  @Get('/readiness')
  async health(): Promise<object> {
    return {status: true, successfully: true};
  }

  @Get('/ping')
  async ping(): Promise<object> {
    return {};
  }
}
