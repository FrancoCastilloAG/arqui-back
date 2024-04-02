// auth.service.ts
import { Inject, Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, @Inject('USER_REPOSITORY')
  private readonly userRepository: Repository<User>,) { }

  async register(name: string, email: string, password: string): Promise<any> {
    try {
      // Check if user with email already exists
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new UnauthorizedException('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
      });
      await this.userRepository.save(newUser);

      // Generate JWT
      const payload = { email };
      const accessToken = this.jwtService.sign(payload);

      return { statusCode: HttpStatus.OK, accessToken };
    } catch (error) {
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, error: error };
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      // Find user by email
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Check if password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT
      const payload = { email };
      const accessToken = this.jwtService.sign(payload);

      return { statusCode: HttpStatus.OK, accessToken };
    } catch (error) {
      return { statusCode: HttpStatus.UNAUTHORIZED, error: error };
    }
  }

  async validateUser(email: string): Promise<any> {
    try {
      // Find user by email
      const user = await this.userRepository.findOne({ where: { email } });
      return { statusCode: HttpStatus.OK, user };
    } catch (error) {
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, error: error };
    }
  }
}