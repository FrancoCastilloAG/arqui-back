import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movement } from 'src/database/entities/movement.entity';

@Injectable()
export class MovementService {
    constructor(
        @Inject('MOVEMENT_REPOSITORY')
        private readonly movementRepository: Repository<Movement>,
    ) {}
    
    async createMovement(movementData: Partial<Movement>): Promise<Movement> {
        const movement = this.movementRepository.create(movementData);
        return await this.movementRepository.save(movement);
    }
    

    async deleteMovement(id: string): Promise<void> {
        await this.movementRepository.delete(id);
    }

    async updateMovement(id: string, movementData: Partial<Movement>): Promise<Movement> {
        await this.movementRepository.update(id, movementData);
        return await this.movementRepository.findOne({ where: { id } });
    }

    async getMovementsByCategory(userId: string, category: string): Promise<Movement[]> {
        return await this.movementRepository.find({
            where: { user: { id: userId }, category },
        });
    }

    async getAllMovementsByUser(userId: string): Promise<Movement[]> {
        return await this.movementRepository.find({
            where: { user: { id: userId } },
        });
    }
}
