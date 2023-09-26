import { Test, TestingModule } from "@nestjs/testing";
import { PostService } from "./post.service";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("PostService", () => {
  let service: PostService;
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
        PostService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<PostService>(PostService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
