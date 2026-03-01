import { Module } from '@nestjs/common';

import { CategoriaModule } from './categoria/categoria.module';
import { FotoModule } from './foto/foto.module';
import { OperaModule } from './opera/opera.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foto } from './foto/entities/foto.entity';
import { Opera } from './opera/entities/opera.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Mkl050795Fms!',
      database: 'luxportfolio',
      entities: [Categoria, Foto, Opera],
      synchronize: true,
      // Aggiungi questa riga se disponibile nel tuo driver
      connectorPackage: 'mysql2',
    }),

    CategoriaModule,
    FotoModule,
    OperaModule,
  ],
})
export class AppModule {}
