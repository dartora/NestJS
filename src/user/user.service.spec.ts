import { Test } from '@nestjs/testing';
import { UsersService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

describe('UsersService', () => {
    let usersService: UsersService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        usersService = moduleRef.get<UsersService>(UsersService);
        userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
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


});