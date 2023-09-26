<<<<<<< HEAD:src/post/post.controller.speca.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { JwtModule } from '@nestjs/jwt';

describe('PostController', () => {
=======
import { Test, TestingModule } from "@nestjs/testing";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { User } from "../user/entities/user.entity";
describe("PostController", () => {
>>>>>>> 333b1096 (unitary and integration tests fixing):src/post/post.controller.spec.ts
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
      imports: [JwtModule]
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
