import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const apiUrl = process.env.API_URL || 'http://localhost:5000';

  // Immediately return a response
  const response = NextResponse.json({ message: 'Image generation started' });

  // Trigger image generation asynchronously
  fetch(`${apiUrl}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).catch(error => console.error('Error triggering image generation:', error));

  return response;
}