"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(createUserDto) {
        const user = new user_entity_1.User();
        user.name = createUserDto.name;
        user.age = createUserDto.age;
        user.email = createUserDto.email;
        user.username = createUserDto.username;
        user.password = createUserDto.password;
        user.gender = createUserDto.gender;
        return this.userRepository.save(user);
    }
    findAllUsers() {
        return this.userRepository.find({ relations: ['posts'] });
    }
    viewUser(id) {
        return this.userRepository.findOneBy({ id });
    }
    updateUser(id, updateUserDto) {
        const user = new user_entity_1.User();
        user.name = updateUserDto.name;
        user.age = updateUserDto.age;
        user.email = updateUserDto.email;
        user.username = updateUserDto.username;
        user.password = updateUserDto.password;
        user.id = id;
        return this.userRepository.save(user);
    }
    removeUser(id) {
        return this.userRepository.delete(id);
    }
    async findOne(username) {
        return (await this.findAllUsers()).find((user) => user.username === username);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=user.service.js.map