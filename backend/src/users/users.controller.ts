import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GenericValidators } from 'src/other/validators/genericValiadators';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly genericValidators: GenericValidators
  ) { }

  @Post()
  @ApiCreatedResponse({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.genericValidators.validateRequireCreateUsers({ body: createUserDto })
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CreateUserDto, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CreateUserDto, isArray: true })
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    await this.genericValidators.validateRequireGetUser(id)
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CreateUserDto })
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.genericValidators.validateRequireUpdateUser(id, updateUserDto)
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: CreateUserDto })
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    await this.genericValidators.validateRequireGetUser(id)
    return this.usersService.remove(id);
  }
}
