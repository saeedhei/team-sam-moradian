import { userRepository } from '@/repositories/user.repository';
import type { User } from '@/generated/types'; // <--- Now used below

export const userService = {
  // We explicitly say this function returns a Promise of a User
  async registerUser(input: {
    name: string;
    email: string;
    role: 'admin' | 'teacher' | 'student';
  }): Promise<any> {
    // 1. Check logic
    const existingUser = await userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // 2. Prepare data
    // We cast this to 'User' to ensure it matches our Type Blueprint
    const newUser: Omit<User, '_id' | '_rev'> = {
      type: 'user',
      name: input.name,
      email: input.email,
      role: input.role,
      createdAt: new Date().toISOString(),
    };

    // 3. Save
    const result = await userRepository.create(newUser);
    return result;
  },
};
