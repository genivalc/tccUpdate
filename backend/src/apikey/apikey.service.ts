import { HttpException, Injectable } from '@nestjs/common';
import { VALIDATORS_ERRORS } from 'src/other/constants/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApikeyService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async checkIfApiKeyExists(ctx) {
    const { apikey } = ctx.query
    if (!apikey) {
      throw new HttpException(VALIDATORS_ERRORS.APIKEY_NOT_PROVIDED, 400);
    }
    const users = await this.prisma.users.findMany()

    if (!users) {
      throw new HttpException(VALIDATORS_ERRORS.NOT_FOUND, 404);
    }

    const apiKeyExists = users.map((user) => {
      return user.apiKey.includes(apikey)
    })

    if (apiKeyExists.includes(true)) {
      return true
    }

    throw new HttpException(VALIDATORS_ERRORS.APIKEY_NOT_PROVIDED, 404);

  }
}
