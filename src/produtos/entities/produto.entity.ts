import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VendaProdutoEntidade } from '../../venda/entities/venda-produto.entity';

@Entity('produto')
export class ProdutoEntidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'principio_ativo' })
  principioAtivo: string;

  @Column({ name: 'unidade_medida' })
  unidadeMedida: string;

  @Column({ name: 'valor_venda', type: 'numeric' })
  valorVenda: number;

  @Column({ name: 'grupo_produto_id', type: 'integer' })
  grupoProdutoId: number;

  @OneToMany(() => VendaProdutoEntidade, (vendaProduto) => vendaProduto.produto)
  vendaProdutos: VendaProdutoEntidade[];
}
