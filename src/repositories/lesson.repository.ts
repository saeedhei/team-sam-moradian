// src/repositories/lesson.repository.ts
import { getDb } from '@/lib/db/couch';

export const lessonRepository = {
  async findById(id: string) {
    const db = await getDb(); // <--- ADD AWAIT
    try {
      return await db.get(id);
    } catch (e) {
      return null;
    }
  },

  async create(lesson: any) {
    const db = await getDb(); // <--- ADD AWAIT
    return await db.insert(lesson);
  },

  async delete(id: string, rev: string) {
    const db = await getDb(); // <--- ADD AWAIT
    return await db.destroy(id, rev);
  },
};
