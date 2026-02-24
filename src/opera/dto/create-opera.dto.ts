import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateFotoDto } from 'src/foto/dto/create-foto.dto';

class MultilangStringDto {
  @IsString() @IsNotEmpty() it: string;
  @IsString() @IsNotEmpty() en: string;
}
export class CreateOperaDto {
  @IsString()
  @IsNotEmpty()
  dataOpera: string;

  @IsObject()
  @ValidateNested()
  @Type(() => MultilangStringDto)
  nomeOpera: MultilangStringDto;

  @IsObject()
  @ValidateNested()
  @Type(() => MultilangStringDto)
  materiale: MultilangStringDto;

  @IsObject()
  @ValidateNested()
  @Type(() => MultilangStringDto)
  supporto: MultilangStringDto;

  // Qui integriamo le foto!
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFotoDto)
  @IsOptional()
  foto: CreateFotoDto[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  categorieIds: number[];
}
