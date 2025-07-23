import { ForbiddenException, Injectable,NotFoundException } from '@nestjs/common';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './schema/post.schema';
import { User } from '../users/schema/users.schema';
import { NotificationsGateway } from 'src/nortifications/nortification.gateway';
@Injectable()
export class PostsService {
  private postsQueue: Queue;

  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
      private notificationsGateway: NotificationsGateway,
  ) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    const connection = new IORedis(redisUrl, { maxRetriesPerRequest: null });
    this.postsQueue = new Queue('posts', { connection });
  }

  async createPost(userId: string, dto: { title: string; description: string }) {
    const { title, description } = dto;

    if (!title || !description) {
      throw new ForbiddenException('Title and description are required');
    }

    const post = new this.postModel({
      title,
      description,
      author: new Types.ObjectId(userId),
    });
     const author = await this.userModel.findById(userId);
      if (!author) throw new NotFoundException('Author not found');

    const followers = await this.userModel.find({
      following: userId,
    });

    followers.forEach((follower) => {
      const followerId = (follower._id as Types.ObjectId).toString(); 
      this.notificationsGateway.sendNotification(
        followerId,
        `${author.username} created a new post: ${dto.title}`
      );
    return post.save();
  }
    )};

  async getMyPosts(userId: string) {
    return this.postModel
      .find({ author: new Types.ObjectId(userId) })
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async getPostsByUser(targetUserId: string) {
    return this.postModel
      .find({ author: new Types.ObjectId(targetUserId) })
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async getFollowingPosts(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new ForbiddenException('User not found');

    const followingIds = user.following.map((id) => new Types.ObjectId(id));

    return this.postModel
      .find({ author: { $in: followingIds } })
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .exec();
  }
}
