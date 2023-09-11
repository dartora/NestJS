import { User } from '../../users/entities/user.entity';
import { Comment } from './Comment';
export declare class Post {
    id: number;
    user: User;
    title: string;
    body: string;
    comments: Comment[];
}
