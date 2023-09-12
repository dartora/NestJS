import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
export declare class Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    user: User;
    comments: Comment[];
}
