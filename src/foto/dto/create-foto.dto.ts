import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class DescrizioneMultilingua {
  @IsString()
  @IsNotEmpty()
  it: string;
  @IsString()
  @IsNotEmpty()
  en: string;
}

export class CreateFotoDto {
  @IsString()
  linkFotoMax: string;
  @IsString()
  linkFotoMin: string;
  @IsString()
  dimensione: string;
  @IsObject()
  @ValidateNested()
  @Type(() => DescrizioneMultilingua)
  descrizione: DescrizioneMultilingua;
}
