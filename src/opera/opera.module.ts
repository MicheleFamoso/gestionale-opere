import { Module } from '@nestjs/common';
import { OperaService } from './opera.service';
import { OperaController } from './opera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opera } from './entities/opera.entity';

@Module({
  imports: [
    // Questo è l'interruttore che manca per far funzionare FotoRepository
    TypeOrmModule.forFeature([Opera]),
  ],
  controllers: [OperaController],
  providers: [OperaService],
})
export class OperaModule {}
