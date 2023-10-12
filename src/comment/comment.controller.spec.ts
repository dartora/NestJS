import { Test, TestingModule } from "@nestjs/testing";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { JwtModule } from "@nestjs/jwt";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

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
    it('should return an array of comments - findAll', async () => {
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
            ...comment,
            id: 1,
            post: null,
        };

        jest.spyOn(service, 'create').mockResolvedValue(createdComment);
        const result = await commentController.create(comment);
        expect(result).toEqual(createdComment);
    });

    it('should find a comment by id', async () => {
        const comment = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            body: 'Comment body',
            post: null,
        };

        jest.spyOn(service, 'findOne').mockResolvedValue(comment);
        const result = await commentController.findOne(1);
        expect(result).toEqual(comment);
    });


    it('should update a comment', async () => {
        const updateCommentDto: UpdateCommentDto = {
            name: 'Updated Name',
            email: 'updated@example.com',
            body: 'Updated comment body',
            userId: 1
        };

        const updateResult: UpdateResult = {
            raw: [],
            affected: 1,
            generatedMaps: []
        };

        jest.spyOn(service, 'update').mockResolvedValue(updateResult);
        const result = await commentController.update(1, updateCommentDto);
        expect(result).toEqual(updateResult);
    });

    it('should remove a comment', async () => {
        const commentId = 1;

        jest.spyOn(service, 'remove').mockResolvedValue({ affected: 1, raw: [] });
        const result = await commentController.remove(commentId);
        expect(result).toEqual({ affected: 1, raw: [] });
    });
});

