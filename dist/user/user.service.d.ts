import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findAllUsers(): Promise<User[]>;
    findAllUsersWithPosts(): Promise<UserResponse[]>;
    viewUser(id: number): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    removeUser(id: number): Promise<{
        affected?: number;
    }>;
    findOne(username: string): Promise<User>;
}
export interface UserResponse {
    id: number;
    name: string;
    username: string;
    email: string;
    age: number;
    gender: string;
    posts: Post[];
}
