import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async findAll() {
    return await this.categoriaRepository.find();
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOneBy({ id });

    if (!categoria) {
      throw new NotFoundException(`La categoria con ID ${id} non esiste`);
    }

    return categoria;
  }

  async remove(id: number) {
    // 1. Cerchiamo prima l'entità
    const categoria = await this.categoriaRepository.findOneBy({ id });

    // 2. Se non esiste, lanciamo un errore esplicito (404)
    if (!categoria) {
      throw new NotFoundException(
        `Impossibile eliminare: categoria con ID ${id} non trovata`,
      );
    }

    // 3. Rimuoviamo l'entità trovata
    return await this.categoriaRepository.remove(categoria);
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    // 1. Cerchiamo l'entità (usiamo await perché è un'operazione asincrona)
    const categoria = await this.categoriaRepository.findOneBy({ id });

    // 2. Gestione dell'errore
    if (!categoria) {
      throw new NotFoundException(`Categoria con ID ${id} non trovata`);
    }

    // 3. Sovrascriviamo i valori (Pattern "Spring-like")
    // Object.assign copia tutte le proprietà da updateCategoriaDto a categoria
    Object.assign(categoria, updateCategoriaDto);

    // 4. Salvi l'entità modificata
    return this.categoriaRepository.save(categoria);
  }
}
