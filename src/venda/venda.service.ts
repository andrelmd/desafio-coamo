import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProdutoEntidade } from '../produtos/entities/produto.entity';
import { NovaVendaProduto } from './classes/nova-venda-produto.class';
import { NovaVenda } from './classes/nova-venda.class';
import { CriarVendaDto } from './dto/criar-venda.dto';
import { CooperadoEntidade } from './entities/cooperado.entity';
import { UnidadeCooperativaEntidade } from './entities/unidade_cooperativa.entity';
import { VendaEntidade } from './entities/venda.entity';

@Injectable()
export class VendaService {
  constructor(
    @InjectRepository(ProdutoEntidade) private produtoRepository: Repository<ProdutoEntidade>,
    @InjectRepository(CooperadoEntidade) private cooperadoRepository: Repository<CooperadoEntidade>,
    @InjectRepository(UnidadeCooperativaEntidade) private unidadeCooperativaRepository: Repository<UnidadeCooperativaEntidade>,
    @InjectRepository(VendaEntidade) private vendaRepository: Repository<VendaEntidade>
  ) {}

  private async buscarUsuarioPorId(id: number) {
    const cooperadoEntidade = await this.cooperadoRepository.findOne({ where: { id }, relations: { tipoCooperado: true, classificacaoCooperado: true } });
    if (!cooperadoEntidade) throw new HttpException('Cooperado não encontrado', HttpStatus.NOT_FOUND);
    return cooperadoEntidade;
  }

  private async buscarProdutosPorIds(ids: number[]) {
    if (ids.length !== new Set(ids).size) throw new HttpException('Produtos duplicados', HttpStatus.BAD_REQUEST);

    const produtosEncontrados = await this.produtoRepository.findBy({ id: In(ids) });
    if (produtosEncontrados.length !== ids.length)
      throw new HttpException(
        `Produto(s) ${Array.from(new Set(produtosEncontrados.filter((produto) => !ids.includes(produto.id)).map((produto) => produto.id)))} não encontrado(s)`,
        HttpStatus.NOT_FOUND
      );

    return produtosEncontrados;
  }

  private async buscarUnidadeCooperativaPorId(id: number) {
    const unidadeCooperativa = await this.unidadeCooperativaRepository.findOne({ where: { id }, relations: { municipio: true } });
    if (!unidadeCooperativa) throw new HttpException('Unidade cooperativa não encontrada', HttpStatus.NOT_FOUND);
    return unidadeCooperativa;
  }

  async criarVenda(criarVendaDto: CriarVendaDto) {
    const { cooperadoId, dataVencimento, produtos, unidadeCooperativaDestinoId, unidadeCooperativaOrigemId } = criarVendaDto;
    if (produtos.some((produto) => produto.quantidade <= 0)) throw new HttpException('Quantidade de produtos inválida', HttpStatus.BAD_REQUEST);

    const cooperado = await this.buscarUsuarioPorId(cooperadoId);
    const produtoIds = produtos.map((produto) => produto.id);
    const produtosEncontrados = await this.buscarProdutosPorIds(produtoIds);

    const unidadeCooperativaOrigem = await this.buscarUnidadeCooperativaPorId(unidadeCooperativaOrigemId);
    const unidadeCooperativaDestino = await this.buscarUnidadeCooperativaPorId(unidadeCooperativaDestinoId);

    const novaVendaProduto = produtosEncontrados.map((produto) => {
      const produtoDto = produtos.find((produtoDto) => produtoDto.id === produto.id);
      if (!produtoDto) throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

      return new NovaVendaProduto(produto, produtoDto.quantidade);
    });

    const novaVenda = new NovaVenda(
      novaVendaProduto,
      cooperado,
      dataVencimento ?? new Date(),
      unidadeCooperativaOrigem.municipio.unidadeFederativaId,
      unidadeCooperativaDestino.municipio.unidadeFederativaId
    );
    novaVenda.calcularValorFinal();

    await this.vendaRepository.save(novaVenda.novaVendaParaVendaEntidade());

    return novaVenda;
  }
}
