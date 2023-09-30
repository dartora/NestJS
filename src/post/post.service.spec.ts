import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { PostService } from "./post.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test } from "@nestjs/testing";

describe('PostService', () => {
  let postService: PostService;
  let postRepository: Repository<Post>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useClass: Repository,
        },
      ],
    }).compile();

    postService = moduleRef.get<PostService>(PostService);
    postRepository = moduleRef.get<Repository<Post>>(getRepositoryToken(Post));
  });
  it('should be defined', () => {
    expect(postService).toBeDefined();
    expect(postRepository).toBeDefined();
  });
  describe('findAllPosts', () => {
    it('should return an array of posts', async () => {
      const posts = [
        {
          id: 2,
          title: 'Post 2',
          body: 'Content 2',
          userId: 1,
          user: {
            id: 1,
            username: 'user1',
            email: 'user1@example.com',
            age: 25,
            password: '123',
            gender: 'male',
            name: 'User 1' // Add the name property

          },
          comments: [] // Add an empty array for comments
        },
      ];

      jest.spyOn(postRepository, 'find').mockResolvedValue(posts);

      const result = await postService.findAll();

      expect(result).toEqual(posts);
    });
  });
  describe('createPost', () => {
    it('should create a post', async () => {
      const createPostDto = {
        title: 'Post 3',
        body: 'Content 3',
        userId: 1,
      };
      const post = {
        id: 3,
        title: 'Post 3',
        body: 'Content 3',
        userId: 1,
        user: {
          id: 1,
          username: 'user1',
          email: 'user1@example.com',
          age: 25,
          password: '123',
          gender: 'male',
          name: 'User 1',
        },
        comments: [],
      };
      jest.spyOn(postRepository, 'save').mockResolvedValue(post);

      const result = await postService.create(createPostDto);

      expect(result).toEqual(post);
    });
  });
});
