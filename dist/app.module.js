"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const user_entity_1 = require("./user/entities/user.entity");
const post_entity_1 = require("./post/entities/post.entity");
const comment_entity_1 = require("./comment/entities/comment.entity");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const post_module_1 = require("./post/post.module");
const comment_module_1 = require("./comment/comment.module");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: 5432,
                password: process.env.POSTGRES_PASSWORD,
                username: process.env.POSTGRES_USER,
                entities: [user_entity_1.User, post_entity_1.Post, comment_entity_1.Comment],
                database: process.env.POSTGRES_DATABASE,
                synchronize: true,
                logging: true,
                autoLoadEntities: true,
                ssl: {
                    rejectUnauthorized: false,
                    ca: process.env.POSTGRES_CA || '',
                    cert: process.env.POSTGRES_CERT || '',
                    key: process.env.POSTGRES_KEY || '',
                },
            }),
            user_module_1.UsersModule,
            auth_module_1.AuthModule,
            post_module_1.PostModule,
            comment_module_1.CommentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,
            {
                provide: core_1.APP_PIPE,
                useClass: common_1.ValidationPipe,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map