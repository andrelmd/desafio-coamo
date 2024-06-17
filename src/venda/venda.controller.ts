import { Body, Controller, Post } from '@nestjs/common';
import { VendaService } from './venda.service';
import { CriarVendaDto } from './dto/criar-venda.dto';

@Controller('venda')
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Post()
  create(@Body() createVendaDto: CriarVendaDto) {
    return this.vendaService.criarVenda(createVendaDto);
  }
}
