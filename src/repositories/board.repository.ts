// src/repositories/board.repository.ts
import { getDb } from '@/lib/db/couch';

export const boardRepository = {
  async findById(id: string) {
    const db = await getDb(); // <--- ADD AWAIT
    try {
      return await db.get(id);
    } catch (e) {
      return null;
    }
  },

  async create(board: any) {
    const db = await getDb(); // <--- ADD AWAIT
    return await db.insert(board);
  },

  async delete(id: string, rev: string) {
    const db = await getDb(); // <--- ADD AWAIT
    return await db.destroy(id, rev);
  },
};
