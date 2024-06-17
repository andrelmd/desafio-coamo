import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('classificacao_cooperado')
export class ClassificacaoCooperadoEntidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ name: 'desconto', type: 'numeric' })
  desconto: number;
}
