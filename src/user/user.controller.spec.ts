import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
    let userController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ], imports: [JwtModule]
        }).compile();

        userController = moduleRef.get<UsersController>(UsersController);
        usersService = moduleRef.get<UsersService>(UsersService);
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const users: User[] = [
                { id: 1, name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' },
                { id: 2, name: 'Jane Smith', age: 30, gender: 'female', username: 'janesmith', email: 'janesmith@example.com', password: '123' },
            ];

            jest.spyOn(usersService, 'findAllUsers').mockResolvedValue(users);

            const result = await userController.findAll();

            expect(result).toEqual(users);
        });
    });

    // Add more test cases for other methods in UserController
    describe('findOne', () => {
        it('should return a user', async () => {
            const user: User = { id: 1, name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' };

            jest.spyOn(usersService, 'viewUser').mockResolvedValue(user);

            const result = await userController.findOne(1);

            expect(result).toEqual(user);
        });
    });

    describe('create', () => {
        it('should create a user', async () => {
            const user: User = { id: 1, name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' };

            jest.spyOn(usersService, 'createUser').mockResolvedValue(user);

            const result = await userController.create(user);

            expect(result).toEqual(user);
        });
    });
    describe('remove', () => {
        it('should delete a user', async () => {
            const user: User = { id: 1, name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' };

            jest.spyOn(usersService, 'removeUser').mockResolvedValue({ affected: 1 });

            const result = await userController.remove(1);

            expect(result).toEqual({ affected: 1 });
        });
    });

    describe('findAllUsersWithPosts', () => {
        it('should return an array of users with their posts', async () => {
            const users: User[] = [
                { id: 1, name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123', posts: [] },
                { id: 2, name: 'Jane Smith', age: 30, gender: 'female', username: 'janesmith', email: 'janesmith@example.com', password: '123', posts: [] },
            ];

            jest.spyOn(usersService, 'findAllUsersWithPosts').mockResolvedValue(users);

            const result = await userController.findAllUsersWithPosts();

            expect(result).toEqual(users);
        });
    });
    describe('update', () => {
        it('should update a user', async () => {
            const user: User = { id: 1, name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' };
            const updateUser: UpdateUserDto = { id: 1, name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' };

            jest.spyOn(usersService, 'updateUser').mockResolvedValue(user);

            const result = await userController.update(1, updateUser);

            expect(result).toEqual(updateUser);
        });
    });

});