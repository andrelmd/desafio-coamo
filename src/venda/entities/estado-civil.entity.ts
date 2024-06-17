import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EstadoCivilEntidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
}
