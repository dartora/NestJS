<<<<<<< HEAD:src/post/post.service.speca.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { JwtModule } from '@nestjs/jwt';
=======
import { Test, TestingModule } from "@nestjs/testing";
import { PostService } from "./post.service";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
>>>>>>> 333b1096 (unitary and integration tests fixing):src/post/post.service.spec.ts

describe("PostService", () => {
  let service: PostService;
  let userRepositoryMock: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
<<<<<<< HEAD:src/post/post.service.speca.ts
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
      imports: [JwtModule]
    }).compile();
=======
    userRepositoryMock = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;
>>>>>>> 333b1096 (unitary and integration tests fixing):src/post/post.service.spec.ts

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
