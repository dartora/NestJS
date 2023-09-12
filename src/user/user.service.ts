import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.gender = createUserDto.gender;
    return this.userRepository.save(user);
  }

  findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findAllUsersWithPosts(): Promise<UserResponse[]> {
    const usersWithPosts = await this.userRepository.find({ relations: ['posts'] });

    // Assuming UserResponse is a type representing the desired response structure
    const userResponses: UserResponse[] = usersWithPosts.map(user => {
      return {
        id: user.id,
        name: user.name,
        age: user.age,
        gender: user.gender,
        username: user.username,
        email: user.email,
        posts: user.posts.map(post => ({
          id: post.id,
          title: post.title,
          body: post.body,
          userId: post.userId,
          comments: post.comments,
          user: post.user
        })),
      };
    });

    return userResponses;
  }

  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.name = updateUserDto.name;
    user.age = updateUserDto.age;
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  async findOne(username: string): Promise<User> {
    return (await this.findAllUsers()).find(
      (user) => user.username === username,
    );
  }
}
export interface UserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  age: number;
  gender: string;
  posts: Post[]
}