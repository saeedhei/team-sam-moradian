import { describe, it, expect } from 'vitest';
import { userAdapter } from '@/adapters/user.adapter';

const BASE_URL = 'http://localhost:3000';

describe('User Master Protocol Test (CRUD via all Doors)', () => {
  const headers = { 'Content-Type': 'application/json' };

  // ==========================================
  // 1. REST API PROTOCOL
  // ==========================================
  describe('Protocol: REST API', () => {
    let id: string;
    const URL = `${BASE_URL}/api/rest/users`;

    it('should CREATE via POST', async () => {
      const res = await fetch(URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: 'REST Sam',
          email: `rest-${Date.now()}@master.com`,
          role: 'student',
        }),
      });
      const data = await res.json();
      id = data.id; // CouchDB returns .id
      expect(res.status).toBe(200);
      expect(id).toBeDefined();
    });

    it('should READ via GET', async () => {
      const res = await fetch(`${URL}/${id}`);
      const data = await res.json();
      expect(data.name).toBe('REST Sam');
    });

    it('should UPDATE via PATCH', async () => {
      const res = await fetch(`${URL}/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ name: 'REST Updated' }),
      });
      expect(res.status).toBe(200);

      // Give the DB a millisecond to breathe
      await new Promise((resolve) => setTimeout(resolve, 100));

      const check = await fetch(`${URL}/${id}`);
      const data = await check.json();
      expect(data.name).toBe('REST Updated');
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
      const query = `mutation { createUser(name: "GQL Sam", email: "gql-${Date.now()}@master.com") { _id } }`;
      const res = await fetch(GQL_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      id = data.createUser._id;
      expect(id).toBeDefined();
    });

    it('should READ via Query', async () => {
      const query = `query { user(id: "${id}") { name } }`;
      const res = await fetch(GQL_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      expect(data.user.name).toBe('GQL Sam');
    });

    it('should UPDATE via Mutation', async () => {
      const query = `mutation { updateUser(id: "${id}", name: "GQL Updated") { name } }`;
      await fetch(GQL_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query }),
      });

      const checkQuery = `query { user(id: "${id}") { name } }`;
      const check = await fetch(GQL_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: checkQuery }),
      });
      const { data } = await check.json();
      expect(data.user.name).toBe('GQL Updated');
    });

    it('should DELETE via Mutation', async () => {
      const query = `mutation { deleteUser(id: "${id}") }`;
      const res = await fetch(GQL_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      expect(data.deleteUser).toBe(true);
    });
  });

  // ==========================================
  // 3. ADAPTER / tRPC LAYER
  // ==========================================
  describe('Protocol: Adapter (Internal Logic)', () => {
    let id: string;

    it('should CREATE via Adapter', async () => {
      const res = await userAdapter.create({
        name: 'Adapter Sam',
        email: `adapter-${Date.now()}@master.com`,
        role: 'admin',
      });
      id = res.id;
      expect(id).toBeDefined();
    });

    it('should READ via Adapter', async () => {
      const user = await userAdapter.get(id);
      expect(user?.name).toBe('Adapter Sam');
    });

    it('should UPDATE via Adapter', async () => {
      await userAdapter.update(id, { name: 'Adapter Updated' });
      const user = await userAdapter.get(id);
      expect(user?.name).toBe('Adapter Updated');
    });

    it('should DELETE via Adapter', async () => {
      await userAdapter.delete(id);
      await expect(userAdapter.get(id)).rejects.toThrow('NOT_FOUND');
    });
  });
});
