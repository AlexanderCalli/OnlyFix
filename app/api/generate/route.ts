import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const apiUrl = process.env.API_URL || 'http://localhost:5000';

  const response = await fetch(`${apiUrl}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }

  const data = await response.json();
  return NextResponse.json(data);
}