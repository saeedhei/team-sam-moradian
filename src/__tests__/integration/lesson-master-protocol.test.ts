import { describe, it, expect } from 'vitest';
import { lessonAdapter } from '@/adapters/lesson.adapter';

const BASE_URL = 'http://localhost:3000';

describe('Lesson Master Protocol Test (12-Point CRUD Verification)', () => {
  const headers = { 'Content-Type': 'application/json' };

  // ==========================================
  // 1. REST API PROTOCOL
  // ==========================================
  describe('Protocol: REST API', () => {
    let id: string;
    const URL = `${BASE_URL}/api/rest/lessons`;

    it('should CREATE via POST', async () => {
      const res = await fetch(URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ title: 'REST Lesson', order: 1, boardId: 'b1' }),
      });
      const data = await res.json();
      id = data.id;
      expect(res.status).toBe(200);
      expect(id).toBeDefined();
    });

    it('should READ via GET', async () => {
      const res = await fetch(`${URL}/${id}`);
      const data = await res.json();
      expect(data.title).toBe('REST Lesson');
    });

    it('should UPDATE via PATCH', async () => {
      await fetch(`${URL}/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ title: 'REST Updated' }),
      });
      const res = await fetch(`${URL}/${id}`);
      const data = await res.json();
      expect(data.title).toBe('REST Updated');
    });

    it('should DELETE via DELETE', async () => {
      const res = await fetch(`${URL}/${id}`, { method: 'DELETE' });
      expect(res.status).toBe(200);
    });
  });

  // ==========================================
  // 2. GRAPHQL PROTOCOL
  // ==========================================
  describe('Protocol: GraphQL Apollo', () => {
    let id: string;
    const GQL_URL = `${BASE_URL}/api/graphql`;

    it('should CREATE via Mutation', async () => {
      const query = `mutation { createLesson(title: "GQL Lesson", order: 2, boardId: "b1") { _id } }`;
      const res = await fetch(GQL_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      id = data.createLesson._id;
      expect(id).toBeDefined();
    });

    it('should READ via Query', async () => {
      const query = `query { lesson(id: "${id}") { title } }`;
      const res = await fetch(GQL_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      expect(data.lesson.title).toBe('GQL Lesson');
    });

    it('should UPDATE via Mutation', async () => {
      const query = `mutation { updateLesson(id: "${id}", title: "GQL Updated") { title } }`;
      await fetch(GQL_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query }),
      });
      const check = await fetch(GQL_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: `query { lesson(id: "${id}") { title } }` }),
      });
      const { data } = await check.json();
      expect(data.lesson.title).toBe('GQL Updated');
    });

    it('should DELETE via Mutation', async () => {
      const query = `mutation { deleteLesson(id: "${id}") }`;
      const res = await fetch(GQL_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      expect(data.deleteLesson).toBe(true);
    });
  });

  // ==========================================
  // 3. ADAPTER LAYER
  // ==========================================
  describe('Protocol: Adapter Layer', () => {
    let id: string;

    it('should CREATE via Adapter', async () => {
      const res = await lessonAdapter.create({ title: 'Adapter Lesson', order: 3, boardId: 'b1' });
      id = res.id;
      expect(id).toBeDefined();
    });

    it('should READ via Adapter', async () => {
      const lesson = await lessonAdapter.get(id);
      expect(lesson?.title).toBe('Adapter Lesson');
    });

    it('should UPDATE via Adapter', async () => {
      await lessonAdapter.update(id, { title: 'Adapter Updated' });
      const lesson = await lessonAdapter.get(id);
      expect(lesson?.title).toBe('Adapter Updated');
    });

    it('should DELETE via Adapter', async () => {
      await lessonAdapter.delete(id);
      const lesson = await lessonAdapter.get(id);
      expect(lesson).toBeNull();
    });
  });
});
