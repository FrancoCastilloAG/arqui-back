import { Controller, Post, Body, Param, Put, Delete,Get ,UseGuards} from '@nestjs/common';
import { MovementService } from './movement.service';
import { movementDto } from './dto/movement.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('movements')
@UseGuards(AuthGuard)
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post(':rut')
  async createMovement(@Param('rut') rut: string, @Body() movementDto: movementDto) {
    return this.movementService.createMovement(movementDto, rut);
  }
  @Get(':rut')
  async getAllMovementsByUser(@Param('rut') rut: string) {
    console.log("llamdao a obtener ususarios")
    return this.movementService.getAllMovementsByUser(rut);
  }

  @Put(':id')
  async updateMovement(@Param('id') id: string,rut: string , @Body() movementDto: movementDto) {
    return this.movementService.updateMovement(id, movementDto,rut);
  }

  @Delete(':id')
  async deleteMovement(@Param('id') id: string) {
    await this.movementService.deleteMovement(id);
    return { message: 'Movement deleted successfully' };
  }
}
