import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column()
  name: string;
  
  @Column()
  email: string;
  
  @Column()
  body: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}