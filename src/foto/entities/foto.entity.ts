import { Opera } from 'src/opera/entities/opera.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Foto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  linkFotoMax: string;

  @Column()
  linkFotoMin: string;

  @Column()
  dimensione: string;

  @Column({ type: 'json' })
  descrizione: { it: string; en: string };

  @ManyToOne(() => Opera, (opera) => opera.foto, { onDelete: 'CASCADE' })
  opera: Opera;
}
