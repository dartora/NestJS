import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.create(createCommentDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.commentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.commentService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return await this.commentService.update(id, updateCommentDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.commentService.remove(id);
  }
}
