const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const psqlHelper = require('../database/postgres');
const db = require('../database/db');
const dbHelpers = require('../database/index');

const app = express();
const port = 4000;

const schema = buildSchema(`
  type Query {
    hello: String,
    num: Int,
    increaseNum(increment: Int): Int
  }
`);

const root = { // The root provides a resolver function for each API endpoint
  hello: () => 'Hello world!',
  num: dbHelpers.getNum,
  increaseNum: dbHelpers.increaseNum
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port);

console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
