import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { User } from "src/user/entities/user.entity";
export declare class PostService {
    private readonly postRepository;
    private readonly userRepository;
    constructor(postRepository: Repository<Post>, userRepository: Repository<User>);
    create(createPostDto: CreatePostDto): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: number): string;
    update(id: number, updatePostDto: UpdatePostDto): Promise<UpdatePostDto & Post>;
    remove(id: number): string;
}
