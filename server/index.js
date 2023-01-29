const express = require('express');
require('dotenv').config()
const {graphqlHTTP} = require('express-graphql');

const schema = require('./schema/schema.js');
const port = process.env.PORT || 5000;


var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(port, console.log(`Server Running on ${port}`));


