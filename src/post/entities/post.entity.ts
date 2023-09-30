import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;


  @Column()
  userId: number;

  @ManyToOne(() => User) // This defines the Many-to-One relationship
  user: User; // This property holds the reference to the associated User

  @OneToMany(() => Comment, (comment) => comment.post)
  comments?: Comment[];
}