import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendaModule } from './venda/venda.module';
import { ProdutosModule } from './produtos/produtos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.POSTGRESQL_DATABASE,
      username: process.env.POSTGRESQL_USERNAME,
      password: process.env.POSTGRESQL_PASSWORD,
      host: process.env.POSTGRESQL_HOST,
      port: parseInt(process.env.POSTGRESQL_PORT || '5432'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    VendaModule,
    ProdutosModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
