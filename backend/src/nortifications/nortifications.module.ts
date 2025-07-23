import { Module } from '@nestjs/common';
import { NotificationsGateway } from './nortification.gateway';

@Module({
  providers: [NotificationsGateway],
  exports: [NotificationsGateway],
})
export class NotificationsModule {}
