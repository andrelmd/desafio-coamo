import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipo_cooperado')
export class TipoCooperadoEntidade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
}