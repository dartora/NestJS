import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
export declare class Post {
    id: number;
    title: string;
    body: string;
    user: User;
    comments: Comment[];
}
