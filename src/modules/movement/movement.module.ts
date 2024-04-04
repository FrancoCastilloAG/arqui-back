import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementProviders } from './movement.provider';
import { MovementController } from './movement.controller';
import { UserModule } from '../user/user.module'; // Importa UserModule
import { UserService } from '../user/user.service'; // Importa UserService

@Module({
  imports: [UserModule], // Asegúrate de importar UserModule aquí
  providers: [MovementService, ...MovementProviders, UserService], // Añade UserService en los providers
  exports: [MovementService, ...MovementProviders], // No es necesario exportar UserService si no lo estás utilizando fuera de este módulo
  controllers: [MovementController]
})
export class MovementModule {}
