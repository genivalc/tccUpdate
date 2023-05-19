import { Module } from '@nestjs/common';
import { ApikeyService } from './apikey.service';
import { ApikeyController } from './apikey.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ApikeyController],
  providers: [ApikeyService],
  imports: [PrismaModule],
})
export class ApikeyModule { }
