import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MunicipioEntidade } from './municipio.entity';

@Entity('unidade_cooperativa')
export class UnidadeCooperativaEntidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ name: 'municipio_id', type: 'integer' })
  municipioId: number;

  @ManyToOne(() => MunicipioEntidade)
  @JoinColumn({ name: 'municipio_id' })
  municipio: MunicipioEntidade;
}
