import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';

const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class UpdateUserDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    name: string;

    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    username: string;

    @IsEmail(null, { message: 'Please provide valid Email.' })
    email: string;

    @IsInt()
    age: number;

    @IsString()
    @IsEnum(['f', 'm', 'u'])
    gender: string;

    @Matches(passwordRegEx, {
        message: `Password must contain Minimum 8 and maximum 20 characters, 
        at least one uppercase letter, 
        one lowercase letter, 
        one number and 
        one special character`,
    })
    password: string;
}
