import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
export declare class Post {
    id: number;
    user: User;
    title: string;
    body: string;
    comments: Comment[];
}
