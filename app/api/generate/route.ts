import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const apiUrl = process.env.API_URL || 'http://localhost:5000';

  try {
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

    // If the mode is 'online', we don't wait for the image to be generated
    if (body.mode === 'online') {
      return NextResponse.json({ message: 'Image generation started' });
    }

    // For 'local' mode, we return the generated image data
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}