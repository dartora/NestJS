import { Test } from '@nestjs/testing';
import { UsersService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
    let usersService: UsersService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: getRepositoryToken(User), useClass: Repository },

            ],
        }).compile();

        usersService = moduleRef.get<UsersService>(UsersService);
        userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    // Add more test cases for other methods in UsersService


    it('should be defined', () => {
        expect(usersService).toBeDefined();
    });

    describe('findAllUsers', () => {
        it('should return an array of users', async () => {
            const users: User[] = [
                { id: 1, name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' },
                { id: 2, name: 'Jane Smith', age: 30, gender: 'female', username: 'janesmith', email: 'janesmith@example.com', password: '123' },
            ];

            jest.spyOn(userRepository, 'find').mockResolvedValue(users);

            const result = await usersService.findAllUsers();

            expect(result).toEqual(users);
        });

    });

    describe('createUser', () => {
        it('should create a user', async () => {
            const createUserDto: CreateUserDto = { name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' };
            const user: User = { id: 1, name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' };

            jest.spyOn(userRepository, 'save').mockResolvedValue(user);

            const result = await usersService.createUser(createUserDto);

            expect(result).toEqual(user);
        });
    });
    describe('findAllUsersWithPosts', () => {
        it('should return an array of users with posts', async () => {
            const users: User[] = [
                { id: 1, name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123', posts: [] },
                { id: 2, name: 'Jane Smith', age: 30, gender: 'female', username: 'janesmith', email: 'janesmith@example.com', password: '123', posts: [] },
            ];

            jest.spyOn(userRepository, 'find').mockResolvedValue(users);

            const result = await usersService.findAllUsersWithPosts();

            expect(result).toEqual(users);
        });
    });
    describe('findUserByUsername', () => {
        it('should return a user by username', async () => {
            const user: User = { id: 1, name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' };

            jest.spyOn(usersService, 'findUserByUsername').mockResolvedValue(user);

            const result = await usersService.findUserByUsername('johndoe');

            expect(result).toEqual(user);
        });
    });
    describe('viewUser', () => {
        it('should return a user by id', async () => {
            const user: User = { id: 1, name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' };

            jest.spyOn(usersService, 'viewUser').mockResolvedValue(user);

            const result = await usersService.viewUser(1);

            expect(result).toEqual(user);
        });
    });
    /*
    describe('updateUser', () => {
        it('should update a user', async () => {
            const updateUserDto: UpdateUserDto = { id: 1, name: 'John Doe', age: 26, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' };
            const user: User = { id: 1, name: 'John Doe', age: 26, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' };

            jest.spyOn(userRepository, 'update').mockResolvedValue({ affected: 1 } as UpdateResult);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

            const result = await usersService.updateUser(1, updateUserDto);

            expect(result).toEqual(user);
        });
    });
*/

    describe('findUserByUsername', () => {
        it('should return a user by username', async () => {
            const user: User = { id: 1, name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

            const result = await usersService.findUserByUsername('johndoe');

            expect(result).toEqual(user);
        });
    });
    /*
    describe('removeUser', () => {
        it('should remove a user by id', async () => {
            const id = 1;
            const deleteResult = { affected: 1, raw: [] };

            jest.spyOn(userRepository, 'delete').mockResolvedValue(deleteResult);

            const result = await usersService.removeUser(id);

            expect(result).toEqual(deleteResult);
            expect(userRepository.delete).toHaveBeenCalledWith(id);
        });
    });

    describe('removeUser error', () => {
        it('should throw an error if user not found', async () => {
            const id = 1;

            jest.spyOn(userRepository, 'delete').mockResolvedValue({ affected: 0, raw: [] });

            await expect(usersService.removeUser(id)).rejects.toThrow('User not found');
        });
    });
    */

});