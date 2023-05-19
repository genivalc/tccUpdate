import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GenericValidators } from '../other/validators/genericValiadators';
import { JwtStrategy } from 'src/other/guard/jwt-strategy';

@Module({
  controllers: [FeedbacksController],
  providers: [FeedbacksService, GenericValidators, JwtStrategy],
  imports: [PrismaModule],
})
export class FeedbacksModule { }
