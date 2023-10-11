import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async findAllUsers(): Promise<User[]> {
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

  async viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.userRepository.findOneBy({ id });
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = this.userRepository.merge(userToUpdate, updateUserDto);
    await this.userRepository.save(updatedUser);
    return updatedUser;
  }

  async removeUser(id: number): Promise<DeleteResult> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User not found`);
    }
    return result;
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }
}
