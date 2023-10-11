import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { JwtModule } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

describe('PostController', () => {
    let controller: PostController;
    let user: User;
    let postService: PostService;

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
        postService = module.get<PostService>(PostService);
        user = { id: 1, name: 'John Doe', age: 25, gender: 'male', username: 'johndoe', email: 'johndoe@example.com', password: '123' };

    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a post', async () => {

        const post = {
            id: 1,
            title: 'Post 1',
            body: 'Content 1',
            userId: 1,
            user: user,
        };

        jest.spyOn(postService, 'create').mockResolvedValue(post);

        const result = await controller.create(post);

        expect(result).toEqual(post);
    });

    it('should find all posts', async () => {
        const posts = [
            {
                id: 1,
                title: 'Post 1',
                body: 'Content 1',
                userId: 1,
                user: user,
            },
            {
                id: 2,
                title: 'Post 2',
                body: 'Content 2',
                userId: 1,
                user: user,
            },
        ];

        jest.spyOn(postService, 'findAll').mockResolvedValue(posts);

        const result = await controller.findAll();

        expect(result).toEqual(posts);
    });

    it('should find one post', async () => {
        const post = {
            id: 1,
            title: 'Post 1',
            body: 'Content 1',
            userId: 1,
            user: user,
        };

        jest.spyOn(postService, 'findOne').mockResolvedValue(post);

        const result = await controller.findOne(1);

        expect(result).toEqual(post);
    });

    it('should update a post', async () => {
        const post = {
            id: 1,
            title: 'Updated Post',
            body: 'Updated Content',
            userId: 1,
            user: user,
        };

        const updateSpy = jest.spyOn(postService, 'update').mockResolvedValue(post);

        const result = await controller.update(1, post);

        expect(updateSpy).toHaveBeenCalledWith(1, post);
        expect(result).toEqual(post);
    });

    it('should delete a post', async () => {
        const postId = 33;

        const removeSpy = jest.spyOn(postService, 'remove').mockImplementation(() => Promise.resolve());

        await controller.remove(postId);

        expect(removeSpy).toHaveBeenCalledWith(postId);
    });
});