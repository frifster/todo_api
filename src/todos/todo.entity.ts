import mongoose from 'mongoose';

export interface Todo extends mongoose.Document {
  title: string;
  text: string;
  userId: string;
}
