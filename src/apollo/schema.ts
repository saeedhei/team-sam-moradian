import { makeExecutableSchema } from '@graphql-tools/schema';
import { userAdapter } from '@/adapters/user.adapter';
import { lessonAdapter } from '@/adapters/lesson.adapter';

const typeDefs = `#graphql
  type User { _id: String, name: String, email: String }
  type Lesson { _id: String, title: String, order: Int }

  type Query { 
    users: [User!]!, user(id: String!): User
    lessons: [Lesson!]!, lesson(id: String!): Lesson
  }

  type Mutation {
    # User Mutations (Existing)
    createUser(name: String!, email: String!): User
    updateUser(id: String!, name: String, email: String): User
    deleteUser(id: String!): Boolean

    # Lesson Mutations (New)
    createLesson(title: String!, order: Int!, boardId: String!): Lesson
    updateLesson(id: String!, title: String, order: Int): Lesson
    deleteLesson(id: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    users: async () => await userAdapter.list(),
    // Added : any here to satisfy TypeScript
    user: async (_: any, { id }: { id: string }) => await userAdapter.get(id),

    lessons: async () => await lessonAdapter.list(),
    // Added : any and explicit type for id
    lesson: async (_: any, { id }: { id: string }) => await lessonAdapter.get(id),
  },
  Mutation: {
    // --- USER MUTATIONS ---
    createUser: async (_: any, args: any) => {
      const res = await userAdapter.create({ ...args, role: 'student' });
      return { _id: res.id, ...args };
    },
    updateUser: async (_: any, { id, ...data }: { id: string; name?: string; email?: string }) => {
      await userAdapter.update(id, data);
      return { _id: id, ...data };
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      await userAdapter.delete(id);
      return true;
    },

    // --- LESSON MUTATIONS (Added these for you) ---
    createLesson: async (_: any, args: any) => {
      const res = await lessonAdapter.create(args);
      return { _id: res.id, ...args };
    },
    updateLesson: async (
      _: any,
      { id, ...data }: { id: string; title?: string; order?: number },
    ) => {
      await userAdapter.update(id, data);
      return { _id: id, ...data };
    },
    deleteLesson: async (_: any, { id }: { id: string }) => {
      await lessonAdapter.delete(id);
      return true;
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
