import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('municipio')
export class MunicipioEntidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ name: 'unidade_federativa_id', type: 'integer' })
  unidadeFederativaId: number;
}
