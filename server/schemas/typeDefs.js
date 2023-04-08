const { gql } = require('apollo-server-express');

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    likes: [Like]!
    likeCount: Int!
  }
  type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  input registrationInput{
    username: String!
    password: String!
    confirmPwd: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getSinglePost(postId: ID!): Post
  }
  type Mutation{
    register(registrationInput: registrationInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!

  }
  `;