const { gql } = require("apollo-server");
module.exports = gql`
  type User {
    id: ID!
    dp: String
    name: String
    bio: String
  }
  type Query {
    getUserDetails: [User]
  }
  type Mutation {
    addProfilePicture(dp: String!): [User]
  }
`;
