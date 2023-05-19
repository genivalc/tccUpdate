import { Controller, Body, Head } from '@nestjs/common';
import { ApikeyService } from './apikey.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('apikey')
@Controller('apikey')
export class ApikeyController {
  constructor(private readonly apikeyService: ApikeyService) { }

  @Head('/exists')
  CreateApiKeyHandler(@Body() ctx) {
    return this.apikeyService.checkIfApiKeyExists(ctx);
  }
}
