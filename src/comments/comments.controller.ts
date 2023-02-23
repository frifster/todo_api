import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { CommentDocument } from './comments.model';
import { CommentService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createTodo(@Body() comment: CommentDocument) {
    return this.commentService.createComment(comment);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/update')
  async updateTodo(@Body() comment: CommentDocument) {
    return this.commentService.updateComment(comment);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete')
  async deleteTodo(@Body() commentId: string) {
    return this.commentService.deleteComment(commentId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/view')
  async viewComments(@Body() todoId: string) {
    return this.commentService.getAllCommentsInTodo(todoId);
  }
}
