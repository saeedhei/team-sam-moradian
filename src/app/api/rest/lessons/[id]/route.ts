import { lessonAdapter } from '@/adapters/lesson.adapter';
import { NextResponse } from 'next/server';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: RouteParams) {
  const { id } = await params;
  const data = await lessonAdapter.get(id);
  return NextResponse.json(data);
}

export async function PATCH(req: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await req.json();
  const result = await lessonAdapter.update(id, body);
  return NextResponse.json(result);
}

export async function DELETE(req: Request, { params }: RouteParams) {
  const { id } = await params;
  await lessonAdapter.delete(id);
  return NextResponse.json({ ok: true });
}
