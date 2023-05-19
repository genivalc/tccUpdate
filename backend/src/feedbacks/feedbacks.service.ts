import { HttpException, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VALIDATORS_ERRORS } from 'src/other/constants/constants';

@Injectable()
export class FeedbacksService {
  constructor(private prisma: PrismaService) { }

  async create(createFeedbackDto: CreateFeedbackDto) {
    try {
      return await this.prisma.feedbacks.create({ data: createFeedbackDto });
    } catch {
      throw new HttpException(VALIDATORS_ERRORS.FEEDBACK_UPDATE, 422);
    }

  }

  async findAll(getAllFeedbackDto, id) {
    const type = getAllFeedbackDto?.type
    let offset = getAllFeedbackDto.offset ? Number(getAllFeedbackDto.offset) : 0
    let limit = getAllFeedbackDto.limit ? Number(getAllFeedbackDto.limit) : 5

    let [
      user,
      feedbacks
    ] = await Promise.all([
      this.prisma.users.findUnique({ where: { id: id } }),
      this.prisma.feedbacks.findMany()
    ])

    if (!user) {
      throw new HttpException(VALIDATORS_ERRORS.UNAUTHORIZED, 401);
    }

    if (!feedbacks) {
      throw new HttpException(VALIDATORS_ERRORS.UNKNOW_FEEDBACK, 401);
    }

    feedbacks = feedbacks.filter((feedback) => {
      return user.apiKey.includes(feedback.apiKey)
    })

    if (type?.type) {
      feedbacks = feedbacks.filter((feedback) => {
        return feedback.type === String(type?.type).toUpperCase()
      })
    }

    const total = feedbacks.length

    if (limit > 10) {
      limit = 5
    }
    if (offset > limit) {
      offset = limit
    }

    feedbacks = feedbacks.slice(offset, feedbacks.length).slice(0, limit)

    return {
      results: feedbacks || [],
      pagination: { offset, limit, total }
    }
  }

  async findOne(id: string, type) {
    let [
      user,
      feedbacks
    ] = await Promise.all([
      this.prisma.users.findUnique({ where: { id: id } }),
      this.prisma.feedbacks.findMany()
    ])

    if (!user) {
      throw new HttpException(VALIDATORS_ERRORS.UNAUTHORIZED, 401);
    }

    if (!feedbacks) {
      throw new HttpException(VALIDATORS_ERRORS.UNKNOW_FEEDBACK, 401);
    }

    if (!type?.type) {
      throw new HttpException(VALIDATORS_ERRORS.UNKNOW_FEEDBACK, 401);
    }



    if (type?.type) {
      feedbacks = feedbacks.filter((feedback) => {
        return feedback.type === String(type?.type).toUpperCase()
      })
    }

    let all = 0
    let issue = 0
    let idea = 0
    let other = 0

    feedbacks.forEach((feedback) => {
      all++

      if (feedback.type === 'ISSUE') {
        issue++
      }
      if (feedback.type === 'IDEA') {
        idea++
      }
      if (feedback.type === 'OTHER') {
        other++
      }
    })


    return { all, issue, idea, other }
  }

  update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    return this.prisma.feedbacks.update({
      where: { id },
      data: updateFeedbackDto,
    });
  }

  remove(id: string) {
    return this.prisma.feedbacks.delete({ where: { id } });
  }
}
