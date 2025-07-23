import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './Auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './post/post.module';
import { NotificationsModule } from './nortifications/nortifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
       MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/socialmedia',
      }),
    }),
     ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, 
          limit: 10, 
        },
      ],
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
