// src/articles/dto/create-article.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class GetAllFeedbackDto {
    @ApiProperty()
    trype: string

    @ApiProperty()
    offset: string

    @ApiProperty()
    limit: string
}