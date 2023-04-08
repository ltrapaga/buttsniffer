const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const path = require('path');
const typeDefs = require('./server/schemas/typeDefs');
const resolvers = require('./server/schemas/resolvers');
const db = require('./server/config/connection');
const app = express();
const PORT = process.env.port || 3001;


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call async function to start the server
startApolloServer(typeDefs, resolvers);