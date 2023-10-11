import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) { }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return this.postRepository.save(createPostDto);
  }

  async findAll() {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.save(updatePostDto);
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
