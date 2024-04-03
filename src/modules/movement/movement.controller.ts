import { Controller, Get, Post, Delete, Put, Param, Body, Query } from '@nestjs/common';
import { MovementService } from './movement.service';
import { Movement } from 'src/database/entities/movement.entity';

@Controller('movements')
export class MovementController {
    constructor(private readonly movementService: MovementService) {}

    @Post()
    async createMovement(@Body() movementData: Partial<Movement>): Promise<Movement> {
        return await this.movementService.createMovement(movementData);
    }

    @Delete(':id')
    async deleteMovement(@Param('id') id: string): Promise<void> {
        await this.movementService.deleteMovement(id);
    }

    @Put(':id')
    async updateMovement(@Param('id') id: string, @Body() movementData: Partial<Movement>): Promise<Movement> {
        return await this.movementService.updateMovement(id, movementData);
    }

    @Get()
    async getAllMovementsByUser(@Query('userId') userId: string): Promise<Movement[]> {
        return await this.movementService.getAllMovementsByUser(userId);
    }

    @Get(':category')
    async getMovementsByCategory(@Query('userId') userId: string, @Param('category') category: string): Promise<Movement[]> {
        return await this.movementService.getMovementsByCategory(userId, category);
    }
}
