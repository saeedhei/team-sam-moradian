import { getDb } from '@/lib/db/couch.ts'; // Assuming your connection logic is here
import type { User } from '@/generated/types';

export const userRepository = {
  // FIND
  async findByEmail(email: string): Promise<User | null> {
    const db = getDb(); // Connect to DB
    // CouchDB specific query (Mango Query)
    const response = await db.find({
      selector: {
        type: 'user',
        email: email,
      },
      limit: 1,
    });

    if (response.docs.length === 0) return null;
    return response.docs[0] as unknown as User;
  },

  // CREATE
  async create(user: Omit<User, '_id' | '_rev'>) {
    const db = getDb();
    const result = await db.insert(user);
    return result;
  },
};
