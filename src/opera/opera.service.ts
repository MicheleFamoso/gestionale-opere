import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOperaDto } from './dto/create-opera.dto';
import { UpdateOperaDto } from './dto/update-opera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Opera } from './entities/opera.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OperaService {
  constructor(
    @InjectRepository(Opera)
    private readonly operaRepository: Repository<Opera>,
  ) {}

  async create(createOperaDto: CreateOperaDto) {
    const opera = this.operaRepository.create(createOperaDto);
    return await this.operaRepository.save(opera);
  }

  async findAll() {
    return await this.operaRepository.find({
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
    // Riceve l'array [1, 5, 3]
    return await this.operaRepository.manager.transaction(async (manager) => {
      for (let i = 0; i < listaId.length; i++) {
        await manager.update(Opera, listaId[i], { indice: i + 1 });
      }
    });
  }
}
