const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if (!customer) {
    return response.status(404).json({
      error: 'Customer not found'
    })
  }

  request.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }

  }, 0);

  return balance;
}

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some((costumer) => costumer.cpf === cpf);

  if (customerAlreadyExists) {
    return response.status(409).json({
      error: "Customer Already Exists!",
    });
  }

  customers.push({
    id: uuidv4(),
    name,
    cpf,
    statement: []
  });

  console.log(customers);

  return response.sendStatus(201)
});

app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer.statement);
});

app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;
  
  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    type: 'credit',
    created_at: new Date(),
  }

  customer.statement.push(statementOperation);

  console.log(customer);

  return response.sendStatus(201);
});

app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(409).json({
      error: 'Insufficent funds!'
    });
  }

  const statementOperation = {
    amount,
    type: 'debit',
    created_at: new Date(),
  }

  customer.statement.push(statementOperation);

  return response.sendStatus(201);
})

app.get('/statement/date', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + ' 00:00');

  const statement = customer.statement.filter(
    (statement) => 
      statement.created_at.toDateString() === new Date(dateFormat).toDateString()
  );

  return response.json(statement);
});


app.listen(3333, () => console.log('🚀 Server is running at: http://localhost:3333'));
