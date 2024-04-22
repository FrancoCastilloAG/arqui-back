// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserProviders } from '../user/user.provider';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret, // Deberías cambiar esto por una clave segura
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService,...UserProviders],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
