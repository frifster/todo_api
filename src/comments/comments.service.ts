import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comment, CommentDocument } from './comments.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async createComment(comment: Comment) {
    const newComment = new this.commentModel(comment);

    return newComment.save();
  }

  async updateComment(comment: CommentDocument) {
    return this.commentModel.findByIdAndUpdate(comment.id, { ...comment });
  }

  async deleteComment(commentId: string) {
    try {
      return this.commentModel.deleteOne({ id: commentId });
    } catch (e) {
      return new BadRequestException();
    }
  }

  async getAllCommentsInTodo(todoId: string) {
    return this.commentModel.find({ todoId });
  }
}
