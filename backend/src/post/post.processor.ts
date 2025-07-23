import { OnModuleInit, Injectable, Logger } from '@nestjs/common';
import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { NotificationsGateway } from '../nortifications/nortification.gateway';
import { User } from '../users/schema/users.schema';

@Injectable()
export class PostProcessor implements OnModuleInit {
  private readonly logger = new Logger(PostProcessor.name);

  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
    private notificationsGateway: NotificationsGateway,
  ) {}

  onModuleInit() {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';


    const connection = new IORedis(redisUrl, {
      maxRetriesPerRequest: null,
    });

    new Worker(
      'posts',
      async (job) => {
        try {
          this.logger.log(`Processing job: ${job.id} - ${job.name}`);
          const { userId, title, description } = job.data as {
            userId: string;
            title: string;
            description: string;
          };

          const newPost = new this.postModel({
            title,
            description,
            author: userId,
          });
          await newPost.save();
          this.logger.log(`Post created by user: ${userId}`);


          const author = await this.userModel.findById(userId);
          if (!author) {
            this.logger.error(`Author not found: ${userId}`);
            throw new Error('Author not found');
          }

         
          for (const followerId of author.followers) {
            this.notificationsGateway.sendNotification(
              followerId.toString(),
              `${author.username} created a new post`,
            );
          }

          return { status: 'success', postId: newPost._id };
        } catch (error) {
          this.logger.error(`Error processing job: ${error.message}`);
          throw error;
        }
      },
      {
        connection, 
      },
    );
  }
}
