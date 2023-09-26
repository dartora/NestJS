import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { JwtModule } from '@nestjs/jwt';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
      imports: [JwtModule]
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
