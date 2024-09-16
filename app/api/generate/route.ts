import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const apiUrl = process.env.API_URL || 'http://localhost:5000';

  if (body.mode === 'online') {
    // For online mode, return immediately and trigger generation asynchronously
    console.log('Triggering online image generation');
    
    // Use fetch with no-wait
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

    // Return immediately
    return NextResponse.json({ message: 'Image generation started' });
  } else {
    // Local mode logic remains unchanged
    try {
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
    } catch (error) {
      console.error('Error generating image:', error);
      return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
    }
  }
}