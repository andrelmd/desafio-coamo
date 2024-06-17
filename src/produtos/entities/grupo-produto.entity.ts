import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('grupo_produto')
export class GrupoProdutoEntidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
}
