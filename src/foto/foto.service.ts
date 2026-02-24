import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Foto } from './entities/foto.entity';

import { Repository } from 'typeorm';
@Injectable()
export class FotoService {
  constructor(
    @InjectRepository(Foto)
    private readonly fotorepository: Repository<Foto>,
  ) {}

  async create(createFotoDto: CreateFotoDto) {
    const foto = this.fotorepository.create(createFotoDto);
    return await this.fotorepository.save(foto);
  }

  async findAll() {
    return await this.fotorepository.find();
  }

  async findOne(id: number) {
    const foto = await this.fotorepository.findOneBy({ id });
    if (!foto) {
      throw new NotFoundException('Foto non esistente');
    }
    return foto;
  }

  async update(id: number, updateFotoDto: UpdateFotoDto) {
    const foto = await this.fotorepository.findOneBy({ id });
    if (!foto) {
      throw new NotFoundException('Foto non esistente');
    }
    Object.assign(foto, updateFotoDto);
    return this.fotorepository.save(foto);
  }

  async remove(id: number) {
    const foto = await this.fotorepository.findOneBy({ id });
    if (!foto) {
      throw new NotFoundException('Foto non esistente');
    }
    return this.fotorepository.remove(foto);
  }
}
