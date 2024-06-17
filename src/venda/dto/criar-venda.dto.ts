import { ProdutoDto } from './produto.dto';

export class CriarVendaDto {
  cooperadoId: number;
  produtos: ProdutoDto[];
  dataVencimento: Date | null;
  unidadeCooperativaOrigemId: number;
  unidadeCooperativaDestinoId: number;
}
