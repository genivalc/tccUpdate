import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException } from "@nestjs/common";
import { VALIDATORS_ERRORS } from 'src/other/constants/constants';
import { v4 as uuidv4 } from 'uuid';
// import { uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.users.create({ data: createUserDto });
    } catch (error) {
      console.error(error)
      throw new HttpException(VALIDATORS_ERRORS.USER_CREATED, 400);
    }
  }

  async findAll() {
    let users = await this.prisma.users.findMany();
    if (!users) {
      throw new HttpException(VALIDATORS_ERRORS.UNAUTHORIZED, 400);
    }
    return users.map(data => {
      delete data.password
      return data
    })
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({ where: { id: id } })
    if (!user) {
      throw new HttpException(VALIDATORS_ERRORS.NOT_FOUND, 404);
    }

    const userResponse = {
      ...user,
      apiKey: user.apiKey[user.apiKey.length - 1]
    }

    delete userResponse.password
    return userResponse
  }

  update(id, updateUserDto: UpdateUserDto) {
    return this.prisma.feedbacks.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.feedbacks.delete({ where: { id } });
  }

}
