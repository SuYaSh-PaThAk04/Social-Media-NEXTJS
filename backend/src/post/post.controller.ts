import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  ForbiddenException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './post.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../users/schema/users.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createPost(@Body() dto: any, @Req() req) {
    const userId = req.user?.userId;

    if (!userId) {
      return { error: 'User ID not found in token' };
    }

    if (!dto.title || !dto.description) {
      return { error: 'Title and description are required' };
    }

    return this.postsService.createPost(userId, dto);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('my-posts')
  async getMyPosts(@Req() req) {
    const userId = req.user?.userId;

    if (!userId) {
      return { error: 'User ID not found in token' };
    }

    const posts = await this.postsService.getMyPosts(userId);
    return {
      userId,
      totalPosts: posts.length,
      posts,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:targetUserId')
  async getUserPosts(
    @Param('targetUserId') targetUserId: string,
    @Req() req,
  ) {
    const currentUserId = req.user?.userId;

    if (!currentUserId) {
      return { error: 'Current user not found in token' };
    }

    if (currentUserId === targetUserId) {
      return this.postsService.getMyPosts(currentUserId);
    }

    const currentUser = await this.userModel.findById(currentUserId);
    if (!currentUser) throw new ForbiddenException('Current user not found');

    const follows = currentUser.following.some((f) =>
      f.equals(new Types.ObjectId(targetUserId)),
    );

    if (!follows) {
      throw new ForbiddenException(
        'You are not allowed to view posts of this user',
      );
    }

    const posts = await this.postsService.getPostsByUser(targetUserId);
    return {
      targetUserId,
      totalPosts: posts.length,
      posts,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('following')
  async getFollowingPosts(@Req() req) {
    const userId = req.user?.userId;

    if (!userId) {
      return { error: 'User ID not found in token' };
    }

    const posts = await this.postsService.getFollowingPosts(userId);
    return {
      totalPosts: posts.length,
      posts,
    };
  }
}
