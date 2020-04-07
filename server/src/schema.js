import { gql } from "apollo-server";

const typeDefs = gql`
  directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
    UNKNOWN
  }

  type Id {
    videoId: String!
    kind: String!
  }

  type Media {
    url: String!
    width: Int
    height: Int!
  }

  type Thumbnails {
    medium: Media!
  }

  type Video {
    id: Id!
    title: String!
    description: String!
    channelTitle: String!
    thumbnails: Thumbnails!
  }

  input SearchInput {
    query: String!
  }

  type Query {
    videosSaved(limit: Int): [Video]
  }

  type Mutation {
    searchVideo(video: SearchInput): [Video]
  }
`;

export default typeDefs;
