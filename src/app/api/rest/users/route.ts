import { userAdapter } from '@/adapters/user.adapter';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await userAdapter.list();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = await userAdapter.create(body);
  // CouchDB returns { ok: true, id: "...", rev: "..." }
  return NextResponse.json(result);
}
