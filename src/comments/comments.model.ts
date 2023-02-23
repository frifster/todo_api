import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({
    required: true,
  })
  text: string;
  @Prop({
    required: true,
  })
  todoId: string;
  @Prop({
    required: true,
  })
  userId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
