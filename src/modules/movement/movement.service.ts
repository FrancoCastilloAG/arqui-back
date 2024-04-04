import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movement } from 'src/database/entities/movement.entity';
import { movementDto } from './dto/movement.dto';
import { User } from '../../database/entities/user.entity';
import { UserService } from '../user/user.service'; // Importar el servicio de usuario

@Injectable()
export class MovementService {
    constructor(
        @Inject('MOVEMENT_REPOSITORY')
        private readonly movementRepository: Repository<Movement>,
        private readonly userService: UserService // Inyectar el servicio de usuario
    ) {}
    
    async createMovement(movementDto: movementDto, rut: string): Promise<Movement> {
        const user = await this.userService.findByRut(rut); // Buscar el usuario por rut
        const movement = new Movement();
        movement.category = movementDto.category;
        movement.description = movementDto.description;
        movement.value = movementDto.value;
        movement.user = user;
        return await this.movementRepository.save(movement);
    }
    async getAllMovementsByUser(rut: string): Promise<Movement[]> {
        const user = await this.userService.findByRut(rut);
        return this.movementRepository.find({ where: { user: user } });
    }
    
    async updateMovement(id: string, movementDto: movementDto, rut: string): Promise<Movement> {
        const user = await this.userService.findByRut(rut); // Buscar el usuario por rut
        const movement = await this.movementRepository.findOneOrFail({where:{id}});
        movement.category = movementDto.category;
        movement.description = movementDto.description;
        movement.value = movementDto.value;
        movement.user = user;
        return await this.movementRepository.save(movement);
    }
    
    async deleteMovement(id: string): Promise<void> {
        await this.movementRepository.delete(id);
    }
}
