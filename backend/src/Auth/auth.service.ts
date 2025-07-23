import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schema/users.schema';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(dto: { username: string; email: string; password: string }) {
    const existingUser = await this.userModel.findOne({ email: dto.email });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    });

    await user.save();
    return { message: 'User registered successfully' };
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user._id, email: user.email });
    return { token, userId: user._id, username: user.username };
  }

  async followUser(currentUserId: string, targetUserId: string) {
    if (currentUserId === targetUserId) {
      throw new BadRequestException('You cannot follow yourself');
    }

    const currentUser = await this.userModel.findById(currentUserId);
    const targetUser = await this.userModel.findById(targetUserId);

    if (!currentUser || !targetUser) {
      throw new NotFoundException('User not found');
    }

    if (!currentUser.following.includes(new Types.ObjectId(targetUserId))) {
      currentUser.following.push(new Types.ObjectId(targetUserId));
      await currentUser.save();
    }

    if (!targetUser.followers.includes(new Types.ObjectId(currentUserId))) {
      targetUser.followers.push(new Types.ObjectId(currentUserId));
      await targetUser.save();
    }

    return { message: `You are now following ${targetUser.username}` };
  }

  async unfollowUser(currentUserId: string, targetUserId: string) {
    const currentUser = await this.userModel.findById(currentUserId);
    const targetUser = await this.userModel.findById(targetUserId);

    if (!currentUser || !targetUser) {
      throw new NotFoundException('User not found');
    }

    currentUser.following = currentUser.following.filter(
      (id) => !id.equals(new Types.ObjectId(targetUserId)),
    );
    await currentUser.save();

    targetUser.followers = targetUser.followers.filter(
      (id) => !id.equals(new Types.ObjectId(currentUserId)),
    );
    await targetUser.save();

    return { message: `You unfollowed ${targetUser.username}` };
  }

  async getAllUsers(excludeUserId: string) {
    return this.userModel
      .find({ _id: { $ne: excludeUserId } })
      .select('-password')
      .exec();
  }
  async getUserProfile(userId: string) {
  const user = await this.userModel
    .findById(userId)
    .populate('followers', 'username email') 
    .populate('following', 'username email')
    .lean();

  if (!user) throw new NotFoundException('User not found');

  return user;
}

}
