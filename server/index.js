const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');
const dbHelpers = require('../database/index');

// process.env.PORT is only expected to be defined when deployed to Heroku.
const port = process.env.PORT || 4000;
const schema = buildSchema(`
  type Query {
    text: String,
    snakeHighScore: Int,
    snakeTotalFoodEaten: Int,
    
    saveText(text: String): String,
    registerSnakeHighScore(score: Int): Int,
    trackStats(stat: String, numValue: Int, textValue: String): String
  }
`);

const root = { // The root provides a resolver function for each API endpoint
  // read
  text: dbHelpers.getText,
  snakeHighScore: dbHelpers.getSnakeHighScore,
  snakeTotalFoodEaten: dbHelpers.getSnakeTotalFoodEaten,

  // write
  saveText: dbHelpers.saveText,
  registerSnakeHighScore: dbHelpers.registerSnakeHighScore,
  trackStats: dbHelpers.trackStats
};

const app = express();
app.set('trust proxy', true);
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));
app.get('/ip', (req, res) => {
  res.status(200).json(req.ip);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/../build')));
  // the '*' endpoint is disabled in development to allow hot reloading.
  // this means React Router Hash Link will not scroll on refresh in development.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '/../build'), 'index.html'));
  });
}

app.listen(port);

if (process.env.NODE_ENV !== 'production') {
  console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
}
