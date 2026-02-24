import { Type } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

export class ReorderOperaDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  id: number[];
}
