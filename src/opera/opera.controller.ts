import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OperaService } from './opera.service';
import { CreateOperaDto } from './dto/create-opera.dto';
import { UpdateOperaDto } from './dto/update-opera.dto';
import { ReorderOperaDto } from './dto/update-opera-id.dto';

@Controller('opera')
export class OperaController {
  constructor(private readonly operaService: OperaService) {}

  @Post()
  create(@Body() createOperaDto: CreateOperaDto) {
    return this.operaService.create(createOperaDto);
  }

  @Get()
  findAll() {
    return this.operaService.findAll();
  }
  @Patch('riordina')
  async updateOrder(@Body() reorderDto: ReorderOperaDto) {
    // Passiamo reorderDto.id perché il service vuole l'array
    console.log(reorderDto.id, typeof reorderDto.id[0]);
    return await this.operaService.updateOrder(reorderDto.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperaDto: UpdateOperaDto) {
    return this.operaService.update(+id, updateOperaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operaService.remove(+id);
  }
}
