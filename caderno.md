> 💡 Pergunta: Por qual tipo de parâmetro recebemos os dados para a criação de uma conta e qual a ferramenta utilizada para gerar o `id`?

Responda aqui: <br />

Recebemos através do params.<br />

A ferramenta utilizada é a uuid.

> 💡 Pergunta: Como funciona o método `some` presente em um Array?

Responda aqui<br />

O some serve para percorrer um array e para cada elemento no array fazer uma comparação, caso seja uma dessas comparações seja verdade então é retornado true, caso contrario é retornado false.

> 💡 Pergunta: Por qual tipo de parâmetro recebemos `cpf` para a listagem e como é o acesso pelo [Express](http://expressjs.com/)? Como funciona o método `find` presente em um Array?

Responda aqui<br />

Recebemos pelo parameters, o acesso é feito assim:

```jsx
app.get('/', (request, response) => {
	const { cpf } = request.params;
})
```

O find percorre o array, e para cada elemento do array é feito uma comparação, caso seja verdadeiro é retornado esse elemento, caso contrário é retornado undefined.

> 💡 Pergunta: Para que servem os Headers da requisição e como podemos acessá-los pelo [Express](http://expressjs.com/)? (Exemplifique com código se achar necessário)

Responda aqui<br />

O headers é mais uma forma de se passar informações importante para ser executada aquela requisição, geralmente se colocam os tokens no headers e outras informações como o tipo de dado (JSON, XML...) Para ter acesso:

```jsx
app.get('/', (request, response) => {
	const { token } = request.headers;
})
```

> 💡 Pergunta: Qual o conceito de Middlewares?

Responda Aqui<br />

Middlewares são métodos/funções que ficam no meio, geralmente são eles que vão verificar se a request do usuário está de acordo com o esperado. Por exemplo: Um middlware que verifica se o token da request existe e se ele é válido, esse middleware poderia ser executado antes de alguma ação que exige que o usuário esteja autenticado, caso estiver a aplicação segue normalmente, caso contrário o middleware retorna um error e não deixa a aplicação seguir em frente.

> 💡 Sugestão: Documente sobre a rota de criação de depósito na conta (`POST - /deposit`). Ex.: Qual o middleware utilizado? O que ele faz? Quais os dados recebidos e por onde eles vêm? Qual o HTTP Code de retorno?

Responda aqui:<br />

### Qual o middleware utilizado? / O que ele faz?

Essa rota é para deposito, o middleware utilizado é o "verifyIfExistsAccountCPF", que executa uma verificação para ter certeza que o CPF que está chegando está vinculado com uma conta.

### Quais os dados recebidos? / Por onde eles vêm?

Para isso o middleware pega o CPF, nessa linha.

```jsx
const { cpf } = request.headers;
```

com o CPF, precisamos verificar se tem alguma conta no nosso array customers, com esse CPF, fazemos isso nessa linha:

```jsx
const customer = customers.find(customer => customer.cpf === cpf);
```

Esse método "find" retorna o elemento caso a condição "customer.cpf === cpf" for verdadeira, caso a contrário é retornado "undefined", ou seja, se for "undefined" o CPF não está vinculada a uma conta, então vamos retornar um erro 404 (Resource not found):

```jsx
if (!customer) {
    return response.status(404).json({
      error: 'Customer not found'
    })
  }
```

Porém se for verdade, nos precisamos passar esse CPF para os próximos middlewares, para isso conseguimos colocar o CPF dentro do objeto "request" do express, assim:

```jsx
request.customer = customer;
```

agora todas os middleware middlewares que estiverem a frente do "verifyIfExistsAccountCPF", terão acesso ao CPF. E para finalizar precisamos retornar a função next(), que vai prosseguir com o próximo middleware:

```jsx
return next();
```