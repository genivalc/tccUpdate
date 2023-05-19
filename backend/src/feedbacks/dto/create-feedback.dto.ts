// src/articles/dto/create-article.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
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
}