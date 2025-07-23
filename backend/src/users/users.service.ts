import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schema/users.schema';
import { NotificationsGateway } from '../nortifications/nortification.gateway';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  
  async getUserProfile(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate('followers', 'username email') 
      .populate('following', 'username email') 
      .select('_id username email followers following') 
      .lean();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      followers: user.followers || [],
      following: user.following || [],
    };
  }

  async getAllUsers(currentUserId: string) {
    return this.userModel
      .find({ _id: { $ne: currentUserId } }) 
      .select('-password'); 
  }


  async followUser(currentUserId: string, targetUserId: string) {
    if (currentUserId === targetUserId) {
      throw new BadRequestException('You cannot follow yourself');
    }

    const [currentUser, targetUser] = await Promise.all([
      this.userModel.findById(currentUserId),
      this.userModel.findById(targetUserId),
    ]);

    if (!currentUser) throw new NotFoundException('Current user not found');
    if (!targetUser) throw new NotFoundException('Target user not found');

    const targetObjectId = targetUser._id as Types.ObjectId;
    const currentObjectId = currentUser._id as Types.ObjectId;

    const isAlreadyFollowing = currentUser.following.some(
      (id) => id.toString() === targetUserId,
    );
    if (isAlreadyFollowing) {
      throw new BadRequestException('You are already following this user');
    }

    await Promise.all([
      this.userModel.updateOne(
        { _id: currentUserId },
        { $push: { following: targetObjectId } },
      ),
      this.userModel.updateOne(
        { _id: targetUserId },
        { $push: { followers: currentObjectId } },
      ),
    ]);


    console.log(`➡️ followUser called by ${currentUserId} for ${targetUserId}`);

    this.notificationsGateway.sendNotification(
      targetUserId,
      `${currentUser.username} followed you`,
    );

    return { message: 'Followed successfully' };
  }


  async unfollowUser(currentUserId: string, targetUserId: string) {
    const [currentUser, targetUser] = await Promise.all([
      this.userModel.findById(currentUserId),
      this.userModel.findById(targetUserId),
    ]);

    if (!currentUser) throw new NotFoundException('Current user not found');
    if (!targetUser) throw new NotFoundException('Target user not found');

    const targetObjectId = targetUser._id as Types.ObjectId;
    const currentObjectId = currentUser._id as Types.ObjectId;

    const isFollowing = currentUser.following.some(
      (id) => id.toString() === targetUserId,
    );
    if (!isFollowing) {
      throw new BadRequestException('You are not following this user');
    }

    await Promise.all([
      this.userModel.updateOne(
        { _id: currentUserId },
        { $pull: { following: targetObjectId } },
      ),
      this.userModel.updateOne(
        { _id: targetUserId },
        { $pull: { followers: currentObjectId } },
      ),
    ]);

console.log(`➡️ unfollowUser called by ${currentUserId} for ${targetUserId}`);

    return { message: 'Unfollowed successfully' };
  }
}
