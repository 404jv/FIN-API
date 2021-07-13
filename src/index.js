const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

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

app.listen(3333, () => console.log('🚀 Server is running at: http://localhost:3333'));
