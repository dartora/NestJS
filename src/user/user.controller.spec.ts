import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';

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

});