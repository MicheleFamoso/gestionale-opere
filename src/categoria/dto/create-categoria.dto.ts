import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class nomeCategoriaMultilingua {
  @IsString()
  @IsNotEmpty()
  it: string;
  @IsString()
  @IsNotEmpty()
  en: string;
}

export class CreateCategoriaDto {
  descrizioneUsoPersonale: string;
  @IsObject()
  @ValidateNested()
  @Type(() => nomeCategoriaMultilingua)
  nomeCategoria: nomeCategoriaMultilingua;
}
