import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { FotoModule } from './foto/foto.module';
import { OperaModule } from './opera/opera.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'michele', // Metti il tuo username MySQL
      password: '050795', // Metti la tua password MySQL
      database: 'luxportfolio',
      entities: [Categoria],
      synchronize: true, // MAGIA: Crea le tabelle da solo leggendo il codice!
    }),

    CategoriaModule,
  ],
})
export class AppModule {}
