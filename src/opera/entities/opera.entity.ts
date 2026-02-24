import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Foto } from 'src/foto/entities/foto.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Opera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Column({ type: 'int', default: 0 })
  indice: number;

  @Column()
  dataOpera: string;

  @Column({ type: 'json' })
  nomeOpera: { it: string; en: string };

  @Column({ type: 'json' })
  materiale: { it: string; en: string };

  @Column({ type: 'json' })
  supporto: { it: string; en: string };

  @OneToMany(() => Foto, (foto) => foto.opera, { cascade: true })
  foto: Foto[];

  @ManyToMany(() => Categoria, (categoria) => categoria.opere)
  @JoinTable() // Obbligatorio su uno dei due lati per creare la tabella ponte
  categoria: Categoria[];
}
