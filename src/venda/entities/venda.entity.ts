import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VendaProdutoEntidade } from './venda-produto.entity';

@Entity('venda')
export class VendaEntidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cooperado_id', type: 'integer' })
  cooperadoId: number;

  @Column({ name: 'data_compra', type: 'timestamptz' })
  dataCompra: Date;

  @Column({ name: 'data_vencimento', type: 'timestamptz' })
  dataVencimento: Date;

  @Column({ name: 'valor_venda', type: 'numeric' })
  valorVenda: number;

  @Column({ name: 'valor_icms', type: 'numeric' })
  valorIcms: number;

  @Column({ name: 'valor_desconto', type: 'numeric' })
  valorDesconto: number;

  @Column({ name: 'valor_juros', type: 'numeric' })
  valorJuros: number;

  @Column({ name: 'porcentagem_desconto', type: 'numeric' })
  porcentagemDesconto: number;

  @Column({ name: 'porcentagem_juros', type: 'numeric' })
  porcentagemJuros: number;

  @Column({ name: 'porcentagem_icms', type: 'numeric' })
  porcentagemIcms: number;

  @Column({ name: 'valor_total', type: 'numeric' })
  valorTotal: number;

  @OneToMany(() => VendaProdutoEntidade, (vendaProduto) => vendaProduto.venda, { cascade: true })
  vendaProdutos: VendaProdutoEntidade[];
}
