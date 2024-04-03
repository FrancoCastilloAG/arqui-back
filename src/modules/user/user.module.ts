import { Module } from '@nestjs/common';
import { UserProviders } from './user.provider';
import { UserService } from './user.service';

@Module({
  exports: [UserService, ...UserProviders]
})
export class UserModule {}
