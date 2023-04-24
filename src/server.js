const app = require('./app');

// Primeiro parâmetro é o port (ou porta): Aqui passamos 3001, mas poderia ser qualquer número não utilizado acima de 1023;

// Segundo parâmetro é uma função: Aqui passamos apenas um console.log exibindo uma mensagem “que estamos no ar”;

app.listen(3001, () => console.log('servidor rodando na porta 3001'));