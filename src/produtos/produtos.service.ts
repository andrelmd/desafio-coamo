import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoEntidade } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  constructor(@InjectRepository(ProdutoEntidade) private produtoRepository: Repository<ProdutoEntidade>) {}

  async findAll() {
    return this.produtoRepository.find();
  }
}
