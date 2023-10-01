import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Post } from './post/entities/post.entity';
import { Comment } from './comment/entities/comment.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { APP_PIPE } from '@nestjs/core';
import { join } from 'path';

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
    PostModule,
    CommentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule { }
