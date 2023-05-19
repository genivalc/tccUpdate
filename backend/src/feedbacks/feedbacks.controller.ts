import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FeedbacksEntity } from './entities/feedback.entity';
import { GenericValidators } from '../other/validators/genericValiadators';
import { AuthGuard } from '@nestjs/passport';
import { GetAllFeedbackDto } from './dto/getAll-feedback.dto';

@Controller('feedbacks')
@ApiTags('feedbacks')
export class FeedbacksController {
  constructor(
    private readonly feedbacksService: FeedbacksService,
    private readonly genericValidators: GenericValidators
  ) { }

  @Post()
  @ApiCreatedResponse({ type: FeedbacksEntity })
  async create(@Body() createFeedbackDto: CreateFeedbackDto) {
    await this.genericValidators.validateRequireCreateFeedback({ body: createFeedbackDto })
    return this.feedbacksService.create(createFeedbackDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: FeedbacksEntity, isArray: true })
  async findAll(@Param('id') id: string, @Body() getAllFeedbackDto: GetAllFeedbackDto) {
    await this.genericValidators.validateRequireGetFeedback(id)
    return this.feedbacksService.findAll(getAllFeedbackDto, id);
  }

  @Get('/summary/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: FeedbacksEntity, isArray: true })
  async findOne(@Param('id') id: string, @Body() type) {
    await this.genericValidators.validateRequireGetSummaryFeedback(id, type)
    return this.feedbacksService.findOne(id, type);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({ type: FeedbacksEntity })
  async update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    await this.genericValidators.validateRequireUpdateFeedback(id, updateFeedbackDto)
    return this.feedbacksService.update(id, updateFeedbackDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({ type: FeedbacksEntity })
  async remove(@Param('id') id: string) {
    await this.genericValidators.validateRequireGetFeedback(id)
    return this.feedbacksService.remove(id);
  }
}
