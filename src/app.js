const express = require('express');

const app = express();

app.use(express.json());

const teams = [
  {
    id: 1,
    name: 'São Paulo Futebol Clube',
    initials: 'SPF',
  },
  {
    id: 2,
    name: 'Clube Atlético Mineiro',
    initials: 'CAM',
  },
];

// Observe que a função get recebe dois parâmetros:

// 1° parâmetro '/': Aqui é rota que tanto falamos. Podem ser /login, /produtos, /pessoas, ou qualquer outra coisa! 
// Neste caso, colocamos apenas /.

// 2° parâmetro (req, res) => {}: Este espera uma função de callback. Esta função pode receber de 2 a 4 parâmetros, sendo eles:
// req: Essa é a Request (ou requisição), é por meio dela que recebemos os dados (envio por query, params e body);
// res: Essa é a Response (ou resposta), é por meio dela que respondemos o que nos é solicitado;
// next: Não vamos trabalhar com ele nesta aula;
// err: Não vamos trabalhar com ele nesta aula.
app.get('/', (req, res) => res.status(200).json({ message: 'Olá Mundo!' }));
// Essa função é responsável por responder nossas requisições. 
// Então, observe o trecho res.status(200).json({ message: 'Olá Mundo!' }) e reflita sobre o que cada coisa deve significar.

// res como comentado, responde as requisições. Estas requisições podem ser respondidas de vários jeitos, tais como:
// Formato text/JSON, como o caso do res.json({ message: 'Olá Mundo!' });
// Formato text/HTML, como o caso do res.send('<h1>Olá Mundo!</h1>');
// Redirecionamentos, como o caso do res.redirect('https://www.betrybe.com/');
// Páginas completas ou partes dela, como o caso do res.render('index.html');
// Finalizando, como o caso do res.end();

// É de costume enviar um status code, como é demostrado no trecho res.status(200).... 
// Estes status code são importantes para identificarmos o que está acontecendo com nossas requisições, 
// mas não se preocupe em decorá-los, com o tempo você vai aprendendo a usá-los e, se tiver dúvidas, 
// pode consultar a documentação do MDN.

// Os status code mais conhecidos são:

// 200: Que quer dizer ‘ok’;
// 500: Que quer dizer erro no servidor;
// 404: Este muitas pessoas já viram, ele quer dizer que a página não foi encontrada;

app.get('/teams', (req, res) => res.status(200).json({ teams }));

app.post('/teams', (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);

  res.status(201).json({ team: newTeam });
});

app.put('/teams/:id', (req, res) => {
  const { id } = req.params;
  const { name, initials } = req.body;

  const updateTeam = teams.find((team) => team.id === Number(id));

  if (!updateTeam) {
    res.status(404).json({ message: 'Team not found' });
  }

  updateTeam.name = name;
  updateTeam.initials = initials;
  res.status(200).json({ updateTeam });
});

app.delete('/teams/:id', (req, res) => {
  const { id } = req.params;
  const arrayPosition = teams.findIndex((team) => team.id === Number(id));
  teams.splice(arrayPosition, 1);

  res.status(200).end();
});

module.exports = app;