const { ApolloServer } = require("apollo-server");
const { sequelize } = require("./models/index");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database Connected!");
      console.log(resolvers);
    })
    .catch((err) => console.log(err));
});
