import { lessonAdapter } from '@/adapters/lesson.adapter';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await lessonAdapter.list();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = await lessonAdapter.create(body);
  return NextResponse.json(result);
}
