import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoEntidade } from './entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntidade])],
  controllers: [ProdutosController],
  providers: [ProdutosService]
})
export class ProdutosModule {}
