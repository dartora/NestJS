import { IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    body: string;
}
