import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { TodoDocument } from './todos.model';
import { TodosService } from './todos.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createTodo(@Body() todo: TodoDocument) {
    return this.todoService.createTodo(todo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/update')
  async updateTodo(@Body() todo: TodoDocument) {
    return this.todoService.updateTodo(todo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete')
  async deleteTodo(@Body() todoId: string) {
    return this.todoService.deleteTodo(todoId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/view')
  async viewTodos(@Body() userId: string) {
    return this.todoService.getAllTodosByUserID(userId);
  }
}
