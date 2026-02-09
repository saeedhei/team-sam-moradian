import { userAdapter } from '@/adapters/user.adapter';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await userAdapter.listUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
