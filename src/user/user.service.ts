import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findAllUsersWithPosts(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['posts'],
      select: [
        'id',
        'name',
        'age',
        'gender',
        'username',
        'email'
      ]
    });
  }

  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userRepository.update(id, updateUserDto);
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
