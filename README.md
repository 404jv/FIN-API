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
- [ ] Deve Ser possível buscar o extrato bancário do cliente por data
- [ ] Deve Ser possível atualizar dados da conta do cliente
- [ ] Deve Ser possível obter dados da conta do cliente
- [ ] Deve Ser possível deletar uma conta

**Regras de negócio**
- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível buscar extato em uma conta não existente
- [x] Não deve ser possível fazer um depósito em uma conta não existente
- [x] Não deve ser possível fazer um saque em uma conta não existente
- [ ] Não deve ser possível excluir uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente

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
  // Status retornado é 409 (Conflict)
  "error": "Customer Already Exists!"
}
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
{ // Status retornado é 404 (Resource not found)
  "error": "Customer not found"
}
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
{ /// Status retornado é 404 (Resource not found)
  "error": "Customer not found"
}
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
{ /// Status retornado é 404 (Resource not found)
  "error": "Customer not found"
}
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