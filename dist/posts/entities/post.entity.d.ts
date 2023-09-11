import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
export declare class Post {
    id: number;
    title: string;
    body: string;
    user: User;
    comments: Comment[];
}
