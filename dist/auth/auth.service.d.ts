import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(username: any, pass: any): Promise<{
        access_token: string;
    }>;
}
export declare class authService {
}
