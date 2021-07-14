# FIN-API
Fin API é o projeto criado no Chapeter 1, do Bootcamp trilha de Node.js da Rocketseat. 💜

## 📝 Anotações
As minhas anotações e repostas para as perguntas, estão nesse [arquivo](caderno.md).

## ✅ TO-DO
**Requisitos**
- [x] Deve Ser possível Criar uma conta
- [x] Deve Ser possível buscar o extrato bancário do cliente
- [x] Deve Ser possível ralizar um depósito
- [x] Deve Ser possível realizar um saque
- [x] Deve Ser possível buscar o extrato bancário do cliente por data
- [x] Deve Ser possível atualizar dados da conta do cliente
- [x] Deve Ser possível obter dados da conta do cliente
- [x] Deve Ser possível deletar uma conta
- [x] Deve Ser possível retornar o balance 

**Regras de negócio**
- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível buscar extato em uma conta não existente
- [x] Não deve ser possível fazer um depósito em uma conta não existente
- [x] Não deve ser possível fazer um saque em uma conta não existente
- [x] Não deve ser possível excluir uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente
- [x] Não deve ser possível retornar o balance de uma conta não existente

## 📃 Documentação

### 👤 POST | /account 
**Request**: A rota account é para criação de usuário, é necessário o envio de um body (JSON), duas informações são: **name**, tipo string, obrigatório e **cpf**, tipo string, obrigatório. Um exemplo de request:
```json
{
  "name": "João Victor Ramalho",
  "cpf": "11111111111"
}
```
**Response**: Caso a resposta seja bem sucedida, é retornado um 201 (Created). Caso contrário é retornado o status HTTP, junto com um JSON, descrevendo o erro. Um exemplo de erro:
```json
{
  "error": "Customer Already Exists!"
}
// Status retornado é 409 (Conflict)
```

### 📜 GET | /statement
**Request**: Rota de listagem de statement, a requisição precisa conter header com um CPF do tipo string, vinculado com uma conta existente.

**Response**: Se a request for bem sucedida a resposta vai o status 200 (OK) e um JSON com um array que possui o statment vinculado ao CPF, exemplo:
```JSON
[
  {
    "description": "Netflix",
    "amount": 30,
    "type": "credit",
    "created_at": "2021-07-13T21:39:27.469Z"
  },
  {
    "description": "The Witcher 3",
    "amount": 21,
    "type": "credit",
    "created_at": "2021-07-13T21:39:37.599Z"
  },
  {
    "amount": 10,
    "type": "debit",
    "created_at": "2021-07-13T21:39:48.853Z"
  }
]
```
Caso a request estaja com problema, é retornado um status HTTP com um JSON descrevendo o erro, exemplo:
```json
{ 
  "error": "Customer not found"
}
// Status retornado é 404 (Resource not found)
```

### ➕ POST | /deposit
**Request**: Rota para efetuar um deposito. Na request é necessário um body (JSON) com duas informações: description, tipo string, obrigatório e amount, tipo float, obrigatório. E o header contendo o CPF, tipo string, obrigatório. Exemplo de request:
```json
{
	"description": "The Witcher 3",
	"amount": 21.00
}
```

**Response**: Caso a request seja bem sucedida, é retornado um status 201 (Created). Caso contrário é retornado o status HTTP com um JSON descrevendo o erro, exemplo de uma resposta ao um erro:
```json
{ 
  "error": "Customer not found"
}
// Status retornado é 404 (Resource not found)
```

### ➖ POST | /withdraw
**Request**: Rota para efetuar um saque. Na request é necessário um body (JSON) com uma informação: amount, tipo float, obrigatório. E o header com o CPF, tipo string, obrigatório. Exemplo de Request:
```json
{
	"amount": 10
}
```

**Response**: Como resposta para uma request bem sucedida é retornado um status 201 (Created), caso contrário a resposta contêm o status HTTP com um JSON descrevendo o error, por exemplo:
```json
{ 
  "error": "Customer not found"
}
// Status retornado é 404 (Resource not found)
```

## 📅 GET | /statement/date
**Request**: Rota para listar statment pela data. Na request é necessário que o header tenha o CPF, tipo string e uma query date, tipo string, obrigatório e a data precisa estar no formato "yyyy-mm-dd". Exemplo de request bem sucedida:
```
http://localhost:3333/statement/date?date=2021-07-13
```

**Response**: Como resposta para uma request bem sucedida, é retornado o status 200 (OK) e JSON com um array que possui o statment vinculado ao CPF e criado na data enviada na query, por exemplo:
```json
[
  {
    "description": "The Witcher 3",
    "amount": 21,
    "type": "credit",
    "created_at": "2021-07-13T21:39:37.599Z"
  },
  {
    "description": "The Witcher 2",
    "amount": 21,
    "type": "credit",
    "created_at": "2021-07-13T21:39:37.599Z"
  },
  {
    "amount": 10,
    "type": "debit",
    "created_at": "2021-07-13T21:39:48.853Z"
  }
]
```

## 🆕 PUT | /account
**Request**: Rota para atualizar o nome de um cliente, a request é  preciso um body (JSON) com o nome, tipo string, obrigatório e no header o CPF, tipo string, obrigatório. Exemplo:
```json
{
  "name": "João Victor R. Alves"
}
```

**Response**: Para uma request bem sucedida é retornado o status 204 (No Content), no entanto caso a request tenha algum erro, será retornado um JSON descrevendo o erro, por exemplo:
```json
{ 
  "error": "Customer not found"
}
// Status retornado é 404 (Resource not found)
```

## 📁 GET | /account
**Request**: Rota para listar informações de um cliente, o único requisito nessa rota é o CPF, tipo string.<br/>

**Response**: Caso a request seja bem sucedida é retornado um JSON com as informações do usuário e os statment do mesmo, por exemplo:
```json
{
  "id": "21510b1c-9465-43d9-8907-4c73528b8192",
  "name": "João Victor R. Alves",
  "cpf": "23132323412312",
  "statement": [
    {
      "description": "The Witcher 3",
      "amount": 21,
      "type": "credit",
      "created_at": "2021-07-14T20:24:38.665Z"
    },
    {
      "description": "The Witcher 2",
      "amount": 21,
      "type": "credit",
      "created_at": "2021-07-14T20:24:39.738Z"
    },
    {
      "amount": 10,
      "type": "debit",
      "created_at": "2021-07-13T21:39:48.853Z"
    }
  ]
}
```

## 👋 DELETE | /balance
**Request**: Rota para deletar uma account, o único requisito é o header contendo o CPF, tipo string.<br />

**Response**: Uma request bem sucedida vai obter um JSON com um array que tem todos as contas que não foram removidos, por exemplo:
```json
[
  {
    "id": "47e87ad4-311a-49a0-9ab1-b5eed1272ec2",
    "name": "Victor",
    "cpf": "1111111111",
    "statement": [
      {
        "amount": 10,
        "type": "debit",
        "created_at": "2021-07-14T20:49:50.142Z"
      }
    ]
  },
  {
    "id": "21510b1c-9465-43d9-8907-4c73528b8192",
    "name": "Ruan",
    "cpf": "2222222222",
    "statement": [
      {
        "description": "God of War",
        "amount": 70,
        "type": "credit",
        "created_at": "2021-07-14T20:24:38.665Z"
      },
      {
        "description": "GTA V",
        "amount": 62.50,
        "type": "credit",
        "created_at": "2021-07-14T20:24:38.665Z"
      }
    ]
  }
]
```

Caso a request estaja com problema, é retornado um status HTTP com um JSON descrevendo o erro, exemplo:
```json
{ 
  "error": "Customer not found"
}
// Status retornado é 404 (Resource not found)
```

## 💲 GET | /balance
**Request**: Rota para mostrar o balance de um cliente, a request tem que ter um header com o CPF, tipo string, obrigatório.

**Response**: Se a request for bem sucedida é retornado um JSON com o balance do cliente, por exemplo:

```json
{
  "balance": 375.55
}
```

Caso a request estaja com problema, é retornado um status HTTP com um JSON descrevendo o erro, exemplo:
```json
{ 
  "error": "Customer not found"
}
// Status retornado é 404 (Resource not found)
```
