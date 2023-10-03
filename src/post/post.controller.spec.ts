import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { JwtModule } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

describe('PostController', () => {
    let controller: PostController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostController],
            providers: [
                PostService,
                {
                    provide: getRepositoryToken(Post),
                    useClass: Repository,
                },],
            imports: [JwtModule]
        }).compile();

        controller = module.get<PostController>(PostController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});