import { IsNumber } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/swagger";


export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNumber()
    id: number;
}
