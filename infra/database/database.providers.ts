
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: 5432,
                password: process.env.POSTGRES_PASSWORD,
                username: process.env.POSTGRES_USER,
                database: process.env.POSTGRES_DATABASE,
                entities: [User, Post, Comment],
                // entities: [
                //     __dirname + '/../**/*.entity{.ts,.js}',
                // ],
                synchronize: true,
                logging: true,
                ssl: {
                    rejectUnauthorized: false, // Set this to true if you want to verify the server's certificate (recommended for production)
                    ca: process.env.POSTGRES_CA || '', // Provide the path to your CA certificate (optional)
                    cert: process.env.POSTGRES_CERT || '', // Provide the path to your client certificate (optional)
                    key: process.env.POSTGRES_KEY || '', // Provide the path to your client private key (optional)
                },
            });

            return dataSource.initialize();
        },
    },
];
