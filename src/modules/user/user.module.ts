import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProviders } from './user.provider'; // Asegúrate de importar UserProviders si lo tienes

@Module({
  providers: [UserService, ...UserProviders], // Asegúrate de incluir UserService aquí
  exports: [UserService, ...UserProviders] // Asegúrate de exportar UserService aquí si lo necesitas fuera del módulo
})
export class UserModule {}
