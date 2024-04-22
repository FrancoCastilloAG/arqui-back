import { Inject, ConflictException, Injectable, NotFoundException ,BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { hash,compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, @Inject('USER_REPOSITORY')
  private readonly userRepository: Repository<User>,) { }

  async ValidateUser(loginUserDto: LoginUserDto): Promise<{ access_token: string ,rut:string}> {
    const user = await this.userRepository.findOne({ where: { email: loginUserDto.email }});
    if (user) {
        if(await compare(loginUserDto.password, user.password)) { //contraseña correcta si es true
          console.log(user.rut)
            const payload = {id:user.id,name:user.name,rut:user.rut}
           return {
            access_token: await this.jwtService.signAsync(payload),
            rut: user.rut, // Devolver el rut junto con el token
        };
        }
    }
    throw new NotFoundException('Usuario no encontrado');
}
async create({name,email,password,rut }: RegisterUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email }});
    if (!name || !email || !password) {
        throw new BadRequestException('Todos los campos son obligatorios');
    }
    if (!user) {
      const hashedPassword = await hash(password, 10);
      const newUser = this.userRepository.create({name,email, password:hashedPassword,rut});
      console.log('usuario guardado');
      return await this.userRepository.save(newUser);
    }
    else{
        throw new ConflictException('El correo electrónico ya está en uso');
    }
}
}
