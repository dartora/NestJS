import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { Comment } from './comments/entities/comment.entity';


import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      entities: [User, Post, Comment],
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false, // Set this to true if you want to verify the server's certificate (recommended for production)
        ca: process.env.POSTGRES_CA || '', // Provide the path to your CA certificate (optional)
        cert: process.env.POSTGRES_CERT || '', // Provide the path to your client certificate (optional)
        key: process.env.POSTGRES_KEY || '', // Provide the path to your client private key (optional)
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
