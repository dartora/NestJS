import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsNumber } from 'class-validator';

export class UpdateCommentDto extends CreateCommentDto {
    @IsNumber()
    userId: number;
}
