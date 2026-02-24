import { Module } from '@nestjs/common';
import { FotoService } from './foto.service';
import { FotoController } from './foto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foto } from './entities/foto.entity';

@Module({
  imports: [
    // Questo è l'interruttore che manca per far funzionare FotoRepository
    TypeOrmModule.forFeature([Foto]),
  ],
  controllers: [FotoController],
  providers: [FotoService],
})
export class FotoModule {}
