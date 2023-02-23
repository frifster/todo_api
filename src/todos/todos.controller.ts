import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Patch,
  Req,
} from '@nestjs/common';
import { TodoDocument } from './todos.model';
import { TodosService } from './todos.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createTodo(@Body() todo: TodoDocument, @Req() req) {
    return this.todoService.createTodo({ ...todo, userId: req.user.userId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/update')
  async updateTodo(@Body() todo: TodoDocument) {
    return this.todoService.updateTodo(todo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/delete')
  async deleteTodo(@Body() todo: TodoDocument) {
    return this.todoService.deleteTodo(todo.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/view')
  async viewTodos(@Req() req) {
    return this.todoService.getAllTodosByUserID(req.user.userId);
  }
}
