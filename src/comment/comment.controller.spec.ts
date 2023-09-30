import { Test, TestingModule } from "@nestjs/testing";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { JwtModule } from "@nestjs/jwt";
import { CreateCommentDto } from "./dto/create-comment.dto";

describe('createComment', () => {
    let service: CommentService;
    let commentController: CommentController;
    let repository: Repository<Comment>;


    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [CommentController],
            providers: [
                CommentService, {
                    provide: getRepositoryToken(Comment),
                    useClass: Repository,
                },],
            imports: [JwtModule],
        }).compile();

        service = moduleRef.get<CommentService>(CommentService);
        commentController = moduleRef.get<CommentController>(CommentController);
        repository = moduleRef.get<Repository<Comment>>(getRepositoryToken(Comment));

    });
    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(commentController).toBeDefined();
        expect(repository).toBeDefined();
    });
    it('should return an array of comments', async () => {
        const comments = [
            {
                id: 1,
                content: 'This is a comment',
                postId: 1,
                name: 'John Doe',
                email: 'john@example.com',
                body: 'Comment body',
                post: {
                    id: 1,
                    title: 'Post title',
                    body: 'Post body',
                    userId: 1,
                    user: {
                        id: 1,
                        name: 'John Doe',
                        username: 'johndoe',
                        email: 'john@example.com',
                        age: 25,
                        password: 'password123',
                        gender: 'male',
                    },
                },
            },
            {
                id: 2,
                content: 'This is another comment',
                postId: 1,
                name: 'Jane Doe',
                email: 'jane@example.com',
                body: 'Another comment body',
                post: {
                    id: 1,
                    title: 'Post title',
                    body: 'Post body',
                    userId: 1,
                    user: {
                        id: 1,
                        name: 'John Doe',
                        username: 'johndoe',
                        email: 'john@example.com',
                        age: 25,
                        password: 'password123',
                        gender: 'male',
                    },
                },
            },
        ];

        jest.spyOn(service, 'findAll').mockResolvedValue(comments);
        expect(await commentController.findAll()).toBe(comments);
    });


    it('should create a comment', async () => {
        const comment: CreateCommentDto = {
            name: 'John Doe',
            email: 'john@example.com',
            body: 'Comment body',
        };
        const createdComment = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            body: 'Comment body',
            post: null,
        };
        jest.spyOn(commentController, 'create').mockResolvedValue(createdComment);
        expect(await commentController.create(comment)).toEqual(createdComment);
    });

});

