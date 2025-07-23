import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Req() req) {
    console.log('👤 Request User:', req.user); 
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User ID missing in JWT payload');
    }
    return this.usersService.getUserProfile(userId);
  }

  @Get('all')
  async getAllUsers(@Req() req) {
    const currentUserId = req.user?.userId;
    return this.usersService.getAllUsers(currentUserId);
  }

  @Post('follow/:id')
  follow(@Req() req, @Param('id') id: string) {
    return this.usersService.followUser(req.user.userId, id);
  }

  @Post('unfollow/:id')
  unfollow(@Req() req, @Param('id') id: string) {
    return this.usersService.unfollowUser(req.user.userId, id);
  }
}
