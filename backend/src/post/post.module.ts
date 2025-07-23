import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './post.controller';
import { PostsService } from './post.service';
import { Post, PostSchema } from './schema/post.schema';
import { User, UserSchema } from '../users/schema/users.schema';
import { PostProcessor } from './post.processor';
import { NotificationsGateway } from 'src/nortifications/nortification.gateway';
@Module({
   imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [PostsService, PostProcessor, NotificationsGateway],
  controllers: [PostsController],
})
export class PostsModule {}
