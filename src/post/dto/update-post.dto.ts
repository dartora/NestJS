import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
