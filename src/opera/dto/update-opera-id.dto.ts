import { IsArray, IsNumber } from 'class-validator';

export class ReorderOperaDto {
  @IsArray()
  @IsNumber({}, { each: true })
  id: number[];
}
