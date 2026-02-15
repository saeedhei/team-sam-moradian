// src/adapters/user.adapter.ts
import { userService } from '@/services/user.service';

export const userAdapter = {
  list: async () => {
    return await userService.getAllUsers();
  },

  get: async (id: string) => {
    return await userService.getUser(id);
  },

  create: async (input: any) => {
    return await userService.registerUser(input);
  },

  // ✅ FIXED: Changed updateProfile to updateUser to match your service
  update: async (id: string, input: any) => {
    return await userService.updateUser(id, input);
  },

  delete: async (id: string) => {
    return await userService.removeUser(id);
  },

  getStats: async () => {
    return await userService.getStats();
  },
};
