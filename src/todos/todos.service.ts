import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo, TodoDocument } from './todos.model';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async createTodo(todo: Todo) {
    const newTodo = new this.todoModel(todo);

    return newTodo.save();
  }

  async updateTodo(todo: TodoDocument) {
    return this.todoModel.findByIdAndUpdate(todo.id, { ...todo });
  }

  async deleteTodo(todoId: string) {
    try {
      return this.todoModel.deleteOne({ id: todoId });
    } catch (e) {
      return new BadRequestException();
    }
  }

  async getAllTodosByUserID(userId: string) {
    return this.todoModel.find({ userId });
  }
}
