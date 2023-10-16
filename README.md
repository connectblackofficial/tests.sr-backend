# Teste para Programador Senior

## Objetivo

Avaliar sua habilidade em desenvolver uma micro-aplicação para lidar com um grande número de requisições usando Node.js, TypeScript, Redis e MySQL.

## Descrição

Desenvolva uma micro-aplicação que receberá até 1000 requisições. 
Cada requisição deve interagir primeiro com um cache Redis e depois sincronizar com um banco de dados MySQL.

### Requisitos

1. *API Endpoints*: A aplicação deverá possuir endpoints para:
   - Adicionar saldo à carteira de um usuário.
   - Subtrair saldo da carteira de um usuário.
   
2. *Parâmetros*: Cada requisição à sua API deve aceitar os seguintes parâmetros:
   - `userId`: ID do usuário.
   - `balance`: O montante a ser adicionado ou subtraído.
   - `walletName`: Nome da carteira do usuário.

3. *Redis*: Antes de interagir com o banco de dados MySQL, sua aplicação deve verificar e/ou atualizar o cache no Redis.
   - Se a informação estiver disponível no Redis, use-a.
   - Ao adicionar ou subtrair do saldo, atualize o cache Redis.

4. *MySQL*: Mantenha o MySQL sincronizado com as operações que acontecem no Redis.

5. *Concorrência*: Sua aplicação deve ser capaz de lidar com múltiplas requisições simultâneas sem causar inconsistências nos saldos dos usuários.

6. *Tipos*: Como estamos usando TypeScript, certifique-se de definir e utilizar tipos adequados.

7. *Testes*: Escreva testes para sua aplicação para garantir que tudo está funcionando como esperado.

## Exemplos

### Entrada

*Endpoint para adicionar saldo*:  
POST `/api/wallet/add`

Request Body:
sh
{
  "userId": "12345",
  "balance": 100.50,
  "walletName": "Carteira Principal"
}


*Endpoint para subtrair saldo*:  
POST `/api/wallet/subtract`

Request Body:
sh
{
"userId": "12345",
"balance": 50.25,
"walletName": "Carteira Principal"
}


### Saída Esperada

Para ambos os endpoints, em caso de sucesso:

Status Code: `200 OK`

Response Body:
sh
{
"message": "Operation successful",
"updatedBalance": 50.25
}


Em caso de erro (e.g., saldo insuficiente):

Status Code: `400 Bad Request`

Response Body:
sh
{
"message": "Insufficient funds"
}


### Organização do Projeto

Recomendamos a seguinte estrutura de diretórios para sua aplicação:

>|-- src/
>| |-- controllers/
>| |-- middlewares/
>| |-- models/
>| |-- routes/
>| |-- utils/
>|-- tests/
>|-- .env
>|-- package.json
>|-- tsconfig.json
>|-- README.md

## Bônus

1. Implemente autenticação JWT para os endpoints.
2. Implemente um sistema de logging para rastrear as operações.
3. *Organização e Documentação*: Ganhe pontos extras pela organização de seu código e pela clareza e abrangência de sua documentação.

## Instruções

1. Faça um fork deste repositório.
2. Desenvolva a aplicação conforme os requisitos acima.
3. Adicione um arquivo `docker-compose.yml` para que possamos inicializar facilmente sua aplicação, o Redis e o MySQL localmente.
4. Escreva instruções claras sobre como executar e testar sua aplicação no `README.md`.
5. Uma vez que você tenha concluído o teste, envie um pull request para este repositório e notifique o entrevistador.

## Avaliação

Você será avaliado com base nos seguintes critérios:

1. Qualidade e clareza do código.
2. Implementação dos requisitos.
3. Maneira como você lida com a concorrência e possíveis problemas de corrida.
4. Presença, qualidade e cobertura dos testes.
5. Documentação e instruções fornecidas.
