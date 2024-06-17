import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
import { TipoCooperadoEntidade } from './tipo-cooperado.entity';
import { ClassificacaoCooperadoEntidade } from './classificacao-cooperado.entity';

@Entity('cooperado')
export class CooperadoEntidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ name: 'tipo_cooperado_id' })
  tipoCooperadoId: number;

  @Column({ name: 'classificacao_cooperado_id' })
  classificaoCooperadoId: number;

  @ManyToOne(() => TipoCooperadoEntidade)
  @JoinColumn({ name: 'tipo_cooperado_id' })
  tipoCooperado: TipoCooperadoEntidade;

  @ManyToOne(() => ClassificacaoCooperadoEntidade)
  @JoinColumn({ name: 'classificacao_cooperado_id' })
  classificacaoCooperado: ClassificacaoCooperadoEntidade;
}
