// auth.controller.ts
import { Controller, Post, Body,UseGuards,HttpCode,HttpStatus,Get,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')  
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUserDto: LoginUserDto) {
      return await this.authService.ValidateUser(loginUserDto);
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req:any) {
      return req.user;
    }

    @Post('register')
    async create(@Body() registerUserDto: RegisterUserDto) {

      return await this.authService.create(registerUserDto);
   }
}
