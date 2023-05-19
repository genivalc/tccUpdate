// src/articles/entities/article.entity.ts

import { Feedbacks } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FeedbacksEntity implements Feedbacks {
    @ApiProperty()
    id: string;

    @ApiProperty()
    text: string

    @ApiProperty()
    fingerprint: string

    @ApiProperty()
    type: string

    @ApiProperty()
    apiKey: string

    @ApiProperty()
    device: string

    @ApiProperty()
    page: string

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}