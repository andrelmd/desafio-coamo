import { ProdutoEntidade } from '../../produtos/entities/produto.entity';
import { VendaProdutoEntidade } from '../entities/venda-produto.entity';

export class NovaVendaProduto {
  produto: ProdutoEntidade;
  quantidade: number;

  constructor(produto: ProdutoEntidade, quantidade: number) {
    this.produto = produto;
    this.quantidade = quantidade;
  }

  novaVendaProdutoParaVendaProdutoEntidade() {
    const vendaProdutoEntidade = new VendaProdutoEntidade();
    vendaProdutoEntidade.produto = this.produto;
    vendaProdutoEntidade.quantidade = this.quantidade;
    return vendaProdutoEntidade;
  }
}
