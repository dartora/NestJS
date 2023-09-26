import { Post } from '../../post/entities/post.entity';
export declare class User {
    id: number;
    name: string;
    username: string;
    email: string;
    age: number;
    password: string;
    gender: string;
    posts: Post[];
}
