import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const apiUrl = process.env.API_URL || 'http://localhost:5000';

  try {
    if (body.mode === 'online') {
      // For online mode, return immediately and trigger generation asynchronously
      console.log('Triggering online image generation');
      fetch(`${apiUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...body,
          mode: body.mode
        }),
      }).catch(error => console.error('Error triggering online image generation:', error));

      return NextResponse.json({ message: 'Image generation started' });
    } else {
      // For local mode, wait for the image generation to complete
      console.log('Triggering local image generation');
      const response = await fetch(`${apiUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...body,
          mode: body.mode
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}