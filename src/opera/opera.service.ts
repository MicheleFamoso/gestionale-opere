import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOperaDto } from './dto/create-opera.dto';
import { UpdateOperaDto } from './dto/update-opera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Opera } from './entities/opera.entity';

import { Repository, DataSource, In } from 'typeorm';
import { Categoria } from 'src/categoria/entities/categoria.entity';
@Injectable()
export class OperaService {
  constructor(
    @InjectRepository(Opera)
    private readonly operaRepository: Repository<Opera>,
    private dataSource: DataSource,
  ) {}

  async create(createOperaDto: CreateOperaDto) {
    return await this.dataSource.transaction(async (manager) => {
      // Cerchiamo il valore massimo attuale dell'ordine
      const result = await manager
        .createQueryBuilder(Opera, 'opera')
        .select('MAX(opera.indice)', 'max')
        .getRawOne<{ max: string | null }>(); // <--- Aggiungi questo "cast"

      // Usiamo l'optional chaining (?.) per sicurezza
      const maxAttuale = result?.max ? parseInt(result.max) : 0;
      const prossimoIndice = maxAttuale + 1;

      let categorieCaricate: Categoria[] = [];
      if (
        createOperaDto.categorieIds &&
        createOperaDto.categorieIds.length > 0
      ) {
        // Usiamo l'In() per cercare tutti gli ID insieme
        categorieCaricate = await manager.findBy(Categoria, {
          id: In(createOperaDto.categorieIds),
        });
      }
      const nuovaOpera = manager.create(Opera, {
        ...createOperaDto,
        indice: prossimoIndice,

        foto: createOperaDto.foto,
      });
      nuovaOpera.categoria = categorieCaricate;
      return await manager.save(nuovaOpera);
    });
  }
  async findAll() {
    return await this.operaRepository.find({
      relations: {
        foto: true, // Carica l'array delle foto
        categoria: true, // Carica l'array delle categorie
      },
      order: {
        indice: 'ASC', // 'ASC' per ordine crescente (1, 2, 3), 'DESC' per decrescente (3, 2, 1)
      },
    });
  }

  async findOne(id: number) {
    const opera = await this.operaRepository.findOneBy({ id });
    if (!opera) {
      throw new NotFoundException('Opera non trovata');
    }
    return opera;
  }

  async update(id: number, updateOperaDto: UpdateOperaDto) {
    const opera = await this.operaRepository.findOneBy({ id });
    if (!opera) {
      throw new NotFoundException('Opera non trovata');
    }
    const indiceOriginale = opera.indice;
    Object.assign(opera, updateOperaDto);
    opera.indice = indiceOriginale;
    return opera;
  }

  async remove(id: number) {
    const opera = await this.operaRepository.findOneBy({ id });
    if (!opera) {
      throw new NotFoundException('Opera non trovata');
    }
    return this.operaRepository.remove(opera);
  }

  async updateOrder(listaId: number[]) {
    return await this.dataSource.transaction(async (manager) => {
      for (let i = 0; i < listaId.length; i++) {
        const idDaAggiornare = listaId[i];
        const nuovoIndice = i + 1;

        // Debug per vedere cosa succede nel terminale
        console.log(
          `Aggiorno Opera ID: ${idDaAggiornare} con indice: ${nuovoIndice}`,
        );

        // USIAMO .update() che è più diretto e meno prono a errori di "NaN"
        await manager
          .createQueryBuilder()
          .update(Opera)
          .set({ indice: nuovoIndice })
          .where('id = :id', { id: idDaAggiornare }) // Usiamo il parametro nominato per sicurezza
          .execute();
      }
    });
  }
}
