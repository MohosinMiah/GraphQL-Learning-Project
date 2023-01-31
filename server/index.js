const express = require('express');
require('dotenv').config()
const {graphqlHTTP} = require('express-graphql');
const cors =  require('cors');
const schema = require('./schema/schema.js');
const port = process.env.PORT || 5000;
const connectDB = require('./schema/config/db.js');

var app = express();
app.use(cors());

// Connect To Mongo DB
connectDB();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));



app.listen(port, console.log(`Server Running on ${port}`));


