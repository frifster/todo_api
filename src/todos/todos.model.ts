import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({
    required: true,
  })
  title: string;
  @Prop({
    required: true,
  })
  text: string;
  @Prop({
    required: true,
  })
  userId: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
