import { Post } from '../../post/entities/post.entity';
export declare class Comment {
    id: number;
    name: string;
    email: string;
    body: string;
    post: Post;
}
