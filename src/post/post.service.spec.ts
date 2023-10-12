import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { PostService } from "./post.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test } from "@nestjs/testing";
import { UpdatePostDto } from "./dto/update-post.dto";

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
  it('should find a post', async () => {
    const post = {
      id: 1,
      title: 'Post 1',
      body: 'Content 1',
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
    jest.spyOn(postRepository, 'findOne').mockResolvedValue(post);

    const result = await postService.findOne(1);

    expect(result).toEqual(post);
  });

  it('should remove a post', async () => {
    jest.spyOn(postRepository, 'delete').mockResolvedValue({ affected: 1, raw: [] });
    await postService.remove(1);

    expect(postRepository.delete).toHaveBeenCalledWith(1);
  });


  it('should update a post', async () => {
    const updatePostDto = {
      title: 'Updated Post',
      body: 'Updated Content',
      userId: 1,

    };
    const post = {
      id: 1,
      title: 'Post 1',
      body: 'Content 1',
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
    jest.spyOn(postRepository, 'save').mockResolvedValue({ ...post, ...updatePostDto });

    const result = await postService.update(1, updatePostDto);

    expect(result).toEqual({ ...post, ...updatePostDto });
  });
});
