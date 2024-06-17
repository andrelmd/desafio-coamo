import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificacaoCooperadoEntidade } from './entities/classificacao-cooperado.entity';
import { CooperadoEntidade } from './entities/cooperado.entity';
import { EstadoCivilEntidade } from './entities/estado-civil.entity';
import { GrupoProdutoEntidade } from '../produtos/entities/grupo-produto.entity';
import { MunicipioEntidade } from './entities/municipio.entity';
import { PessoaFisicaEntidade } from './entities/pessoa-fisica.entity';
import { ProdutoEntidade } from '../produtos/entities/produto.entity';
import { TipoCooperadoEntidade } from './entities/tipo-cooperado.entity';
import { UnidadeFederativaEntidade } from './entities/unidade-federativa.entity';
import { UnidadeCooperativaEntidade } from './entities/unidade_cooperativa.entity';
import { VendaProdutoEntidade } from './entities/venda-produto.entity';
import { VendaEntidade } from './entities/venda.entity';
import { VendaController } from './venda.controller';
import { VendaService } from './venda.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassificacaoCooperadoEntidade,
      CooperadoEntidade,
      EstadoCivilEntidade,
      GrupoProdutoEntidade,
      MunicipioEntidade,
      PessoaFisicaEntidade,
      ProdutoEntidade,
      TipoCooperadoEntidade,
      UnidadeCooperativaEntidade,
      UnidadeFederativaEntidade,
      VendaProdutoEntidade,
      VendaEntidade
    ])
  ],
  controllers: [VendaController],
  providers: [VendaService]
})
export class VendaModule {}
