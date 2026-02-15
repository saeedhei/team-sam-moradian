import { userAdapter } from '@/adapters/user.adapter';
import { NextResponse } from 'next/server';

// Next.js 15/16 requires 'params' to be awaited
type RouteParams = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: RouteParams) {
  const { id } = await params; // ✅ CRITICAL FIX
  const user = await userAdapter.get(id);
  return NextResponse.json(user);
}

export async function PATCH(req: Request, { params }: RouteParams) {
  const { id } = await params; // ✅ CRITICAL FIX
  const body = await req.json();
  const result = await userAdapter.update(id, body);
  return NextResponse.json(result);
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params; // ✅ CRITICAL FIX
    await userAdapter.delete(id);
    // Always return a JSON object so 'res.json()' in the test doesn't crash
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
