import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GenericValidators } from 'src/other/validators/genericValiadators';
import { JwtStrategy } from 'src/other/guard/jwt-strategy';

@Module({
  controllers: [UsersController],
  providers: [UsersService, GenericValidators, JwtStrategy],
  imports: [PrismaModule],
})
export class UsersModule { }
