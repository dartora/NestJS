import { Post } from '../../posts/entities/post.entity';
export declare class Comment {
    id: number;
    name: string;
    email: string;
    body: string;
    post: Post;
}
