// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from "apollo-server";

// The GraphQL schema
const mytypeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const myresolvers = {
  // resolver
  Query: {
    hello: () => {
      return "world";
    },
    // = hello: () => "Hello World"
  },
};

const server = new ApolloServer({
  typeDefs: mytypeDefs,
  resolvers: myresolvers,
});
// key = value -> v 생략
// : shorthand property

server.listen(3001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
