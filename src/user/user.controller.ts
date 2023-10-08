import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "../auth/auth.guard";
import { User } from "./entities/user.entity";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get("/posts")
  async findAllUsersWithPosts(): Promise<User[]> {
    return await this.userService.findAllUsersWithPosts();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<User> {
    return await this.userService.viewUser(id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  async update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<{ affected?: number; }> {
    return await this.userService.removeUser(id);
  }
}
