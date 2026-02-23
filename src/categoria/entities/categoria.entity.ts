import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descrizioneUsoPersonale: string;

  @Column({ type: 'json' })
  nomeCategoria: { it: string; eng: string };
}
