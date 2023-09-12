import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePostDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    body: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number; // Assuming you provide the user ID when creating a post
}
