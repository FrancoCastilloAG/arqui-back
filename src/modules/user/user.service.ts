import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email: email }, })
    }

    async updateUserByEmail(email: string, updateUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.findByEmail(email);

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        // Update the user object with the new data
        if (updateUserDto.name) {
            existingUser.name = updateUserDto.name;
        }
        if (updateUserDto.password) {
            existingUser.password = updateUserDto.password;
        }

        return this.userRepository.save(existingUser);
    }
}
