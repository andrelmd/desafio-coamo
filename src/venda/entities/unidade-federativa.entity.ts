import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('unidade_federativa')
export class UnidadeFederativaEntidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sigla: string;
}
