import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { AuthModule } from './auth/auth.module';
import { ApikeyModule } from './apikey/apikey.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, UsersModule, FeedbacksModule, AuthModule, ApikeyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
