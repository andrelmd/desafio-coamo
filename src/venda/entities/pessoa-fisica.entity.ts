import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pessoa_fisica')
export class PessoaFisicaEntidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column({ name: 'estado_civil_id' })
  estadoCivilId: number;

  @Column({ name: 'data_nascimento', type: 'timestamptz' })
  dataNascimento: Date;

  @Column({ name: 'cooperado_id' })
  cooperadoId: number;
}
