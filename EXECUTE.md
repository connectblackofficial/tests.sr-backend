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

3. Execute o comando para instalação do mysql e redis de acordo com o seu ambiente:
   
   ```bash
   docker-compose --env-file .env.local up
   ```

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

O projeto utiliza o Jest para a execução de testes. Os testes podem ser encontrados no diretório `src`. Certifique-se de que os testes estejam funcionando corretamente usando o comando:

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