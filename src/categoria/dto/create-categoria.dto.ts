import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
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
  @IsString() // <--- AGGIUNGI QUESTO!
  @IsOptional() // Aggiungilo se il campo non è obbligatorio
  descrizioneUsoPersonale: string;
  @IsObject()
  @ValidateNested()
  @Type(() => nomeCategoriaMultilingua)
  nomeCategoria: nomeCategoriaMultilingua;
}
