import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { Post } from './schema/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('posts') private postModel: Model<Post>,
    @InjectModel('users') private usersModel: Model<User>,
  ) {}

  async create(userId: string, createPostInput: CreatePostInput) {
    const post = new this.postModel({
      ...createPostInput,
      author: new Types.ObjectId(userId),
    });
    await post.save();

    await this.usersModel.findByIdAndUpdate(userId, {
      $push: { posts: post._id },
    });

    return post.populate({ path: 'author', select: 'fullName _id email' });
  }

  getAllPosts() {
    return this.postModel
      .find()
      .populate({ path: 'author', select: 'fullName _id email' });
  }

  findOne(id: string) {
    return this.postModel
      .findById(id)
      .populate({ path: 'author', select: 'fullName _id email' });
  }

  update(id: string, updatePostInput: UpdatePostInput) {
    return this.postModel
      .findByIdAndUpdate(id, updatePostInput, { new: true })
      .populate({ path: 'author', select: 'fullName _id email' });
  }

  async remove(id: string) {
    const deletedPost = await this.postModel.findByIdAndDelete(id);
    if (!deletedPost) return null;

    const authorId = Array.isArray(deletedPost.author)
      ? deletedPost.author[0]
      : deletedPost.author;

    if (authorId) {
      await this.usersModel.findByIdAndUpdate(authorId, {
        $pull: { posts: deletedPost._id },
      });
    }

    return deletedPost.populate({
      path: 'author',
      select: 'fullName _id email',
    });
  }
}
