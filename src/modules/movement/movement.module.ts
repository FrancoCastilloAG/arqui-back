import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementProviders } from './movement.provider';
import { MovementController } from './movement.controller';

@Module({
  providers: [MovementService, ...MovementProviders], // Asegúrate de incluir MovementService aquí
  exports: [MovementService, ...MovementProviders],
  controllers: [MovementController]
})
export class MovementModule {}
