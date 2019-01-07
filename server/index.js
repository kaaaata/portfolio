const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');
const dbHelpers = require('../database/index');

const app = express();
const port = 3000;

const schema = buildSchema(`
  type Query {
    text: String,
    saveText(text: String): String,

    snakeHighScore: Int,
    registerSnakeHighScore(score: Int): Int
  }
`);

const root = { // The root provides a resolver function for each API endpoint
  text: dbHelpers.getText,
  saveText: dbHelpers.saveText,

  snakeHighScore: dbHelpers.getSnakeHighScore,
  registerSnakeHighScore: dbHelpers.registerSnakeHighScore
};

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/../build')));
}

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.set('trust proxy', true);

app.get('/ip', (req, res) => {
  res.status(200).json(req.ip);
});

app.listen(port);

console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
