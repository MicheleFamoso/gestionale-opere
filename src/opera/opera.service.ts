import { Injectable } from '@nestjs/common';
import { CreateOperaDto } from './dto/create-opera.dto';
import { UpdateOperaDto } from './dto/update-opera.dto';

@Injectable()
export class OperaService {
  create(createOperaDto: CreateOperaDto) {
    return 'This action adds a new opera';
  }

  findAll() {
    return `This action returns all opera`;
  }

  findOne(id: number) {
    return `This action returns a #${id} opera`;
  }

  update(id: number, updateOperaDto: UpdateOperaDto) {
    return `This action updates a #${id} opera`;
  }

  remove(id: number) {
    return `This action removes a #${id} opera`;
  }
}
