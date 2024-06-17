import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoEntidade } from '../../produtos/entities/produto.entity';
import { VendaEntidade } from './venda.entity';

@Entity('venda_produto')
export class VendaProdutoEntidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidade: number;

  @Column({ name: 'produto_id', type: 'integer' })
  produtoId: number;

  @Column({ name: 'venda_id', type: 'integer' })
  vendaId: number;

  @ManyToOne(() => ProdutoEntidade)
  @JoinColumn({ name: 'produto_id' })
  produto: ProdutoEntidade;

  @ManyToOne(() => VendaEntidade)
  @JoinColumn({ name: 'venda_id' })
  venda: VendaEntidade;
}
