# Documentação de Instalação e Implementação do Projeto "wallet-test"

Este guia fornecerá instruções detalhadas para a instalação e implementação do projeto "wallet-test" em Node.js, com base no arquivo `package.json` fornecido.

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas e componentes instalados em seu sistema:

- [Node.js](https://nodejs.org/) (versão igual ou superior a 18.16.0)
- [Docker](https://docs.docker.com/desktop/)
- [Docker Compose](https://docs.docker.com/compose/)

## Instalação

Siga estas etapas para instalar e configurar o projeto "wallet-test":

1. Instale as dependências do projeto usando o npm ou yarn:

   ```bash
   npm install
   ```

   ```bash
   yarn install
   ```

2. Renomeie o arquivo .env.example para .env.local (para testes locais), .env.development (para ambiente de homologação) ou .env.production para o ambiente de produção.

3. Execute o comando para instalação da aplicação, mysql e redis de acordo com o seu ambiente (.env.local):
   
   ```bash
   docker-compose --env-file .env.local up
   ```
4. Pronto! Pode utilizar de acordo com a seção abaixo.

## Como utilizar a aplicação

Com base no documento do Postman, abaixo temos os endpoints da aplicação e fornecer informações sobre como testar e importar no Postman.

### Documentos do Postman

- [Coleção com payloads](docs/collection.postman.json) Contém todos os endpoints da aplicação
- [Variáveis de ambiente](docs/environment.postman.json) Contém variáveis de ambiente da aplicação

### Endpoints da Aplicação:

1. **/api**
   - Método: GET
   - Descrição: Este endpoint fornece informações gerais sobre a API.
   - URL: `{{host}}/api`

2. **/api/auth**
   - Método: POST
   - Descrição: Este endpoint é usado para autenticar um usuário e receber um token de acesso.
   - URL: `{{host}}/api/auth`
   - Corpo da Requisição (JSON):
     ```json
     {
         "email": "test@test.com",
         "password": "123456"
     }
     ```
   - Teste: O token de acesso retornado na resposta será armazenado em uma variável de ambiente chamada "token" para uso posterior.

3. **/api/wallet/add**
   - Método: POST
   - Descrição: Este endpoint é usado para adicionar fundos a uma carteira de usuário.
   - URL: `{{host}}/api/wallet/add`
   - Cabeçalho de Autorização: Bearer Token (Utiliza o token armazenado na variável de ambiente "token")
   - Corpo da Requisição (JSON):
     ```json
     {
         "userId": "12345",
         "balance": 100.50,
         "walletName": "Carteira Principal"
     }
     ```

4. **/api/wallet/subtract**
   - Método: POST
   - Descrição: Este endpoint é usado para subtrair fundos de uma carteira de usuário.
   - URL: `{{host}}/api/wallet/subtract`
   - Cabeçalho de Autorização: Bearer Token (Utiliza o token armazenado na variável de ambiente "token")
   - Corpo da Requisição (JSON):
     ```json
     {
         "userId": "12345",
         "balance": 30.25,
         "walletName": "Carteira Principal"
     }
     ```

### Como Testar no Postman:

Para testar os endpoints no Postman, siga estas etapas:

1. Abra o Postman.

2. Importe a coleção fornecida:
   - Clique no botão "Import" no canto superior esquerdo.
   - Selecione a opção "Link".
   - Cole o URL do documento do Postman (caso esteja disponível online) ou importe o arquivo JSON localmente.

3. Após importar a coleção, você verá os endpoints listados na seção "Collections" do Postman.

4. Certifique-se de que você tenha definido a variável de ambiente `host` com o URL base da sua aplicação.

5. Para testar os endpoints, clique no endpoint desejado na coleção.

6. Configure os parâmetros da requisição, como cabeçalhos, corpo da requisição, etc.

7. Clique no botão "Send" para enviar a requisição.

8. Os resultados da requisição, incluindo as respostas do servidor, serão exibidos na parte inferior da tela.

Lembre-se de que, no caso do endpoint `/api/auth`, o token de acesso retornado na resposta será armazenado na variável de ambiente "token" para uso posterior em requisições autenticadas.

Isso deve permitir que você teste com sucesso os endpoints da aplicação usando o Postman. Certifique-se de adaptar as informações, como o URL base e os dados de autenticação, conforme necessário para o ambiente de teste da sua aplicação.


## Comandos de Scripts

O arquivo `package.json` inclui vários scripts úteis para ajudar no desenvolvimento e teste do projeto. Aqui estão os principais comandos:

- **lint**: Execute a verificação de linting usando o ESLint para garantir a conformidade com as regras de código.

   ```bash
   npm run lint
   ```

- **format**: Formate os arquivos TypeScript no diretório `src` usando o Prettier.

   ```bash
   npm run format
   ```

- **format:check**: Verifique se os arquivos TypeScript no diretório `src` estão formatados corretamente.

   ```bash
   npm run format:check
   ```

- **test**: Execute os testes usando o Jest com a variável de ambiente `NODE_ENV` definida como 'test'.

   ```bash
   npm run test
   ```

- **test:cov**: Execute os testes com a geração de relatórios de cobertura de código.

   ```bash
   npm run test:cov
   ```

- **start:dev**: Inicie o servidor de desenvolvimento. Este comando irá limpar o diretório `dist`, compilar os arquivos TypeScript usando `tsc-watch`, e iniciar o servidor com `nodemon`.

   ```bash
   npm run start:dev
   ```

- **start:prod**: Inicie o servidor em modo de produção, executando o arquivo `main.js` na pasta `dist`.

   ```bash
   npm run start:prod
   ```

- **build**: Limpe o diretório `dist` e compile os arquivos TypeScript usando `tsc`.

   ```bash
   npm run build
   ```

## Testes

O projeto utiliza o Jest para a execução de testes. Os testes podem ser encontrados no diretório `tests`. Certifique-se de que os testes estejam funcionando corretamente usando o comando:

```bash
npm run test
```

Isso executará os testes definidos nos arquivos com a extensão `.spec.ts`.

## Executando o Projeto

Para executar o projeto em modo de desenvolvimento, utilize o seguinte comando:

```bash
npm run start:dev
```

Isso iniciará o servidor de desenvolvimento e monitorará as alterações nos arquivos, permitindo uma experiência de desenvolvimento mais eficaz.

Para executar o projeto em modo de produção, utilize o seguinte comando:

```bash
npm run start:prod
```

Isso iniciará o servidor em modo de produção.