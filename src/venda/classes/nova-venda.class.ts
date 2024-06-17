import { calcularDiasUteis } from '../../utils/calcular-dias-uteis';
import { NovaVendaProduto } from '../classes/nova-venda-produto.class';
import { CooperadoEntidade } from '../entities/cooperado.entity';
import { VendaEntidade } from '../entities/venda.entity';

export class NovaVenda {
  private cooperadoEntidade: CooperadoEntidade;
  private dataCompra: Date;
  private dataVencimento: Date;
  private valorVenda: number;
  private valorDesconto: number;
  private valorJuros: number;
  private valorIcms: number;
  private porcentagemDesconto: number;
  private porcentagemJuros: number;
  private porcentagemIcms: number;
  private valorTotal: number;
  private vendaProdutos: NovaVendaProduto[];
  private estadoOrigemId: number;
  private estadoDestinoId: number;

  constructor(vendaProdutos: NovaVendaProduto[], cooperadoEntidade: CooperadoEntidade, dataVencimento: Date, estadoOrigemId: number, estadoDestinoId: number) {
    this.vendaProdutos = vendaProdutos;
    this.cooperadoEntidade = cooperadoEntidade;
    this.dataCompra = new Date();
    this.dataVencimento = new Date(dataVencimento);
    this.estadoOrigemId = estadoOrigemId;
    this.estadoDestinoId = estadoDestinoId;
  }

  private getGroupIds(): number[] {
    return this.vendaProdutos.map((vendaProduto) => vendaProduto.produto.grupoProdutoId);
  }

  private pegarPorcentagemDescontoPorQuantidadeDeGrupos(): number {
    const quantidadeDeGrupos = new Set(this.getGroupIds()).size;
    return Math.min(quantidadeDeGrupos * 0.01, 0.05);
  }

  private pegarPorcentagemDescontoAVistaPorConceito(): number {
    if (calcularDiasUteis(this.dataCompra, this.dataVencimento) > 1) return 0;
    else return Number(this.cooperadoEntidade.classificacaoCooperado.desconto);
  }

  private pegarPorcentagemJurosPorPrazo(taxaJuros: number): number {
    const quantidadeDiasUteis = calcularDiasUteis(this.dataCompra, this.dataVencimento);
    return Math.max((1 + taxaJuros / 100) ** quantidadeDiasUteis - 1, 0);
  }

  private aplicarJurosPorPrazo(valor: number): number {
    return valor * this.pegarPorcentagemJurosPorPrazo(0.05);
  }

  private pegarPorcentagemDeDesconcontoPorConceito(valor: number): number {
    const desconto = this.pegarPorcentagemDescontoAVistaPorConceito();
    return valor * desconto;
  }

  private aplicarDescontoPorQuantidadeDeGrupos(valor: number): number {
    const desconto = this.pegarPorcentagemDescontoPorQuantidadeDeGrupos();
    return valor * desconto;
  }

  private pegarPorcentagemDeIcms(): number {
    console.log('estadoOrigemId', this.estadoOrigemId);
    console.log('estadoDestinoId', this.estadoDestinoId);
    if (this.estadoOrigemId === 2 && this.estadoDestinoId === 2) return 0.0;
    else if (this.estadoOrigemId === this.estadoDestinoId) return 0.12;
    else if ([2, 1].includes(this.estadoOrigemId) && [2, 1].includes(this.estadoDestinoId)) return 0.12;
    else return 0.18;
  }

  private aplicarIcms(valor: number): number {
    return valor * this.pegarPorcentagemDeIcms();
  }
  calcularValorFinal(): number {
    this.valorVenda = this.vendaProdutos.reduce((acc, vendaProduto) => {
      return acc + vendaProduto.produto.valorVenda * vendaProduto.quantidade;
    }, 0);

    this.porcentagemDesconto = this.pegarPorcentagemDescontoAVistaPorConceito() + this.pegarPorcentagemDescontoPorQuantidadeDeGrupos();
    this.porcentagemJuros = this.pegarPorcentagemJurosPorPrazo(0.05);
    this.porcentagemIcms = this.pegarPorcentagemDeIcms();

    console.log('porcentagemPorConceito', this.pegarPorcentagemDescontoAVistaPorConceito());
    console.log('porcentagemPorQuantidadeDeGrupos', this.pegarPorcentagemDescontoPorQuantidadeDeGrupos());
    console.log('porcentagemDesconto', this.porcentagemDesconto);
    console.log('porcentagemJuros', this.porcentagemJuros);
    console.log('porcentagemIcms', this.porcentagemIcms);

    const valorDescontoPorConceito = this.pegarPorcentagemDeDesconcontoPorConceito(this.valorVenda);
    const valorDescontoPorQuantidadeDeGrupos = this.aplicarDescontoPorQuantidadeDeGrupos(this.valorVenda);
    const valorJurosPorPrazo = this.aplicarJurosPorPrazo(this.valorVenda);

    console.log('valorDescontoPorConceito', valorDescontoPorConceito);
    console.log('valorDescontoPorQuantidadeDeGrupos', valorDescontoPorQuantidadeDeGrupos);
    console.log('valorJurosPorPrazo', valorJurosPorPrazo);

    this.valorDesconto = valorDescontoPorConceito + valorDescontoPorQuantidadeDeGrupos;
    this.valorJuros = valorJurosPorPrazo;

    const valorAntesDoIcms = this.valorVenda - this.valorDesconto + this.valorJuros;
    const valorIcms = this.aplicarIcms(valorAntesDoIcms);

    this.valorIcms = valorIcms;

    this.valorTotal = valorAntesDoIcms + this.valorIcms;

    return this.valorTotal;
  }

  novaVendaParaVendaEntidade(): VendaEntidade {
    const vendaEntidade = new VendaEntidade();
    vendaEntidade.cooperadoId = this.cooperadoEntidade.id;
    vendaEntidade.dataCompra = this.dataCompra;
    vendaEntidade.dataVencimento = this.dataVencimento;
    vendaEntidade.valorVenda = this.valorVenda;
    vendaEntidade.valorIcms = this.valorIcms;
    vendaEntidade.valorDesconto = this.valorDesconto;
    vendaEntidade.valorJuros = this.valorJuros;
    vendaEntidade.porcentagemDesconto = this.porcentagemDesconto;
    vendaEntidade.porcentagemJuros = this.porcentagemJuros;
    vendaEntidade.porcentagemIcms = this.porcentagemIcms;
    vendaEntidade.valorTotal = this.valorTotal;

    return vendaEntidade;
  }
}
