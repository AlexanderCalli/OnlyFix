import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const apiUrl = process.env.API_URL || 'http://localhost:5000';

  try {
    if (body.mode === 'online') {
      // For online mode, ensure the request is sent to the Flask API
      const flaskResponse = await fetch(`${apiUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...body,
          mode: body.mode
        }),
      });

      if (!flaskResponse.ok) {
        throw new Error(`Flask API error: ${flaskResponse.status}`);
      }

      // Return a success response to the client
      return NextResponse.json({ message: 'Image generation started successfully' });
    } else {
      // Local mode logic remains unchanged
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