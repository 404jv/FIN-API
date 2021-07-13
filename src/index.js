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


app.listen(3333, () => console.log('🚀 Server is running at: http://localhost:3333'));
