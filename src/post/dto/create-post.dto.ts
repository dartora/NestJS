import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    body: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number; // Assuming you provide the user ID when creating a post
}
