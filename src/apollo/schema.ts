import { makeExecutableSchema } from '@graphql-tools/schema';
import { lessonAdapter } from '@/adapters/lesson.adapter';

const typeDefs = `#graphql
  type Lesson {
    _id: String!
    title: String!
    order: Int
  }

  type Query {
    # This query now pulls real data from your CouchDB
    lessons: [Lesson!]!
  }
`;

const resolvers = {
  Query: {
    lessons: async () => {
      console.log('📡 Apollo Resolver: Fetching lessons via LessonAdapter');
      return await lessonAdapter.list();
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
