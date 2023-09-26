import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./user.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { Repository } from "typeorm";

describe("UsersService", () => {
  let service: UsersService;
  let userRepositoryMock: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    userRepositoryMock = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  // it("should be defined", () => {
  //   expect(service).toBeDefined();
  // });
});
describe("createUser", () => {
  let service: UsersService;
  let userRepositoryMock: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    userRepositoryMock = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  it("should create a user", async () => {
    const createUserDto: CreateUserDto = {
      name: "John Doe",
      username: "johndoe123",
      email: "johndoe@example.com",
      age: 30,
      gender: "m",
      password: "StrongP@ss123",
    };

    const createdUser: User = {
      id: 1,
      name: "John Doe",
      username: "johndoe123",
      email: "johndoe@example.com",
      age: 30,
      gender: "m",
      password: "StrongP@ss123",
    };

    userRepositoryMock.save.mockResolvedValue(createdUser);

    const result = await service.createUser(createUserDto);

    expect(result).toEqual(createdUser);
  });
});

// describe("findAllUsers", () => {
//   let service: UsersService;
//   let userRepositoryMock: jest.Mocked<Repository<User>>;

//   it("should return an array of users", async () => {
//     const users: User[] = [
//       // Initialize with expected user data
//       // ...
//       {
//         id: 1,
//         name: "John Doe",
//         username: "johndoe123",
//         email: "johndoe@example.com",
//         age: 30,
//         gender: "m",
//         password: "StrongP@ss123",
//       },
//     ];

//     userRepositoryMock.find.mockResolvedValue(users);

//     const result = await service.findAllUsers();

//     expect(result).toEqual(users);
//   });
// });

// Add more test cases for other service methods as needed (e.g., findAllUsersWithPosts, viewUser, updateUser, removeUser, findOne).
