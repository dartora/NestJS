import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

describe('CommentService', () => {
  let service: CommentService;
  let repository: Repository<Comment>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    repository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  it('should create a comment', async () => {
    const comment = {
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
          age: 25, // add missing property
          password: 'password123', // add missing property
          gender: 'male', // add missing property
        },
      },
    };
    jest.spyOn(repository, 'save').mockResolvedValueOnce(comment);
    const result = await service.create(comment);
    expect(result).toBe(comment);
  });
  it('should find one comment', async () => {
    const comment = {
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
          age: 25, // add missing property
          password: 'password123', // add missing property
          gender: 'male', // add missing property
        },
      },
    };
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(comment);
    const result = await service.findOne(1);
    expect(result).toEqual(comment);
  });
  it('should find all comments', async () => {
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
            age: 25, // add missing property
            password: 'password123', // add missing property
            gender: 'male', // add missing property
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
            age: 25, // add missing property
            password: 'password123', // add missing property
            gender: 'male', // add missing property
          },
        },
      },
    ];
    jest.spyOn(repository, 'find').mockResolvedValueOnce(comments);
    const result = await service.findAll();
    expect(result).toEqual(comments);
  });

  it('should update a comment', async () => {
    const comment = {
      id: 1,
      content: 'This is an updated comment',
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
          age: 25, // add missing property
          password: 'password123', // add missing property
          gender: 'male', // add missing property
        },
      },
      userId: 1,

    };
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(comment);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(comment);
    const result = await service.create(comment);
    expect(result).toEqual(comment);
  });
  it('should delete a comment', async () => {
    const comment = {
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
          age: 25, // add missing property
          password: 'password123', // add missing property
          gender: 'male', // add missing property
        },
      },
      userId: 1,
    };
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(comment);
    jest.spyOn(repository, 'delete').mockResolvedValueOnce({ affected: 1, raw: null });
    const result = await service.remove(comment.id);
    expect(result).toEqual({ affected: 1, raw: null });; // 
  });

});
