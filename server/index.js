const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const dbHelpers = require('../database/index');

const app = express();
const port = 4000;

const schema = buildSchema(`
  type Query {
    text: String,
    saveText(username: String, filename: String, text: String): String
  }
`);

const root = { // The root provides a resolver function for each API endpoint
  text: dbHelpers.getText,
  saveText: dbHelpers.saveText
};

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
