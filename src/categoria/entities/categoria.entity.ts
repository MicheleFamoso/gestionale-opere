import { Opera } from 'src/opera/entities/opera.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descrizioneUsoPersonale: string;

  @Column({ type: 'json' })
  nomeCategoria: { it: string; eng: string };

  @ManyToMany(() => Opera, (opera) => opera.categoria)
  opere: Opera[];
}
