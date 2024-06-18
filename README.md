## Desafio Coamo

Projeto feito  em 1 dia para o desafio da Coamo, onde foi solicitado um programa, em qualquer linguagem que o candidato se sinta confortável, que calcule descontos, juros e impostos baseados em parâmetros de entrada, como classificação do cliente, estado da unidade e estado a ser enviado.

Project made in 1 day for the Coamo challenge, where a program was requested, in any language that the candidate feels comfortable with, that calculates discounts, interest and taxes based on input parameters, such as customer classification, unit state and state to be sent.

### Pré-requisitos
- NodeJs 20.12.2
- PostgreSQL

### Instalação
#### Manual
1. Clone o repositório
```sh
git clone
```

2. Instale as dependências
```sh
npm install
```

3. Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente
```sh
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=coamo
```

4. Execute o comando para criar as tabelas e popular a tabela de estados no banco de dados utilizando o arquivo init-database.sql

5. Execute o comando para iniciar o servidor
```sh
npm run start
```

#### Docker
1. Clone o repositório
```sh
git clone
```

2. Instale as dependências
```sh
npm install
```

3. Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente
```sh
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=coamo
```

4. Execute o comando para criar a imagem do banco de dados
```sh
docker-compose up -d
```

5. Execute o comando para criar as tabelas e popular a tabela de estados no banco de dados utilizando o arquivo init-database.sql

### Utilização
Para utilizar a aplicação, basta fazer uma requisição POST para a rota /venda com o seguinte corpo:
```json
{
  "cooperadoId": 1,
  "produtos": [
    {
      "id": 1,
      "quantidade": 1
    }
  ],
  "dataVencimento": "2021-10-10",
  "unidadeCooperativaOrigemId": 1,
  "unidadeCooperativaDestinoId": 2
}
```
