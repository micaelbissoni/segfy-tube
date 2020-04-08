import { gql } from "apollo-server";

const typeDefs = gql`
  directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
    UNKNOWN
  }

  type Id {
    videoId: String
    kind: String
  }

  type Media {
    url: String
    width: Int
    height: Int
  }

  type Thumbnails {
    medium: Media
  }

  type Video {
    id: Id!
    title: String!
    description: String
    channelTitle: String
    thumbnails: Thumbnails!
  }

  type SearchResult {
    query: String
    result: [Video]
  }

  input SearchInput {
    query: String!
    type: String
  }

  type Query {
    queriesSaved(limit: Int): [SearchResult]
  }

  type Mutation {
    searchVideo(video: SearchInput): SearchResult
  }
`;

export default typeDefs;
