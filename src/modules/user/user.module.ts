import { Module } from '@nestjs/common';
import { UserProviders } from './user.provider';
import { UserService } from './user.service';

@Module({
  providers: [],
  exports: [UserService, ...UserProviders]
})
export class UserModule {}
