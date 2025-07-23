import { Controller, Post, Body, UseGuards, Param, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Throttle({ default: { limit: 5, ttl: 60 } })
  signup(@Body() dto: any) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60 } })
  login(@Body() dto: any) {
    console.log('JWT Secret:', process.env.JWT_SECRET || '');
    return this.authService.login(dto);
    
  }

  @Post('follow/:id')
  @UseGuards(AuthGuard('jwt'))
  async followUser(@Param('id') id: string, @Req() req) {
    return this.authService.followUser(req.user.userId, id); 
  }

  @Post('unfollow/:id')
  @UseGuards(AuthGuard('jwt')) 
  async unfollowUser(@Param('id') id: string, @Req() req) {
    return this.authService.unfollowUser(req.user.userId, id);
  }

  @Get('profile/:id')
  @UseGuards(AuthGuard('jwt')) 
  async getProfile(@Param('id') id: string) {
    return this.authService.getUserProfile(id);
  }
}
