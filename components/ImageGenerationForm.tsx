'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { GeneratedImage } from '@/types/index'

interface ImageGenerationFormProps {
  onImageGenerated: (image: GeneratedImage | null) => void;
}

export default function ImageGenerationForm({ onImageGenerated }: ImageGenerationFormProps) {
  const [prompt, setPrompt] = useState('A serene lake surrounded by mountains at night');
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [steps, setSteps] = useState(20);
  const [guidance, setGuidance] = useState(7.5);
  const [seed, setSeed] = useState(42);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onImageGenerated(null);

    try {
      // Trigger image generation without waiting for response
      fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          width,
          height,
          steps,
          guidance,
          seed,
        }),
      }).catch(error => console.error('Error triggering image generation:', error));

      // Wait for 60 seconds
      await new Promise(resolve => setTimeout(resolve, 60000));

      // Fetch the latest image from Supabase
      const latestImage = await fetchLatestImage();
      if (latestImage) {
        onImageGenerated(latestImage);
      } else {
        throw new Error('No image generated');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLatestImage = async (): Promise<GeneratedImage | null> => {
    const { data, error } = await supabase
      .from('generated_images')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching latest image:', error);
      return null;
    }

    if (data) {
      return {
        id: data.id,
        filename: data.filename,
        prompt: data.prompt,
        storage_path: data.storage_path,
        width: data.width,
        height: data.height,
        created_at: data.created_at,
        public_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.storage_path}`
      };
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Input</h2>
      
      <div>
        <Label htmlFor="prompt">Prompt</Label>
        <Textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="w-full"
        />
      </div>

      <div>
        <Label>Width: {width}px</Label>
        <Slider
          min={64}
          max={2048}
          step={64}
          value={[width]}
          onValueChange={(value) => setWidth(value[0])}
        />
      </div>

      <div>
        <Label>Height: {height}px</Label>
        <Slider
          min={64}
          max={2048}
          step={64}
          value={[height]}
          onValueChange={(value) => setHeight(value[0])}
        />
      </div>

      <div>
        <Label>Steps: {steps}</Label>
        <Slider
          min={1}
          max={150}
          value={[steps]}
          onValueChange={(value) => setSteps(value[0])}
        />
      </div>

      <div>
        <Label>Guidance: {guidance}</Label>
        <Slider
          min={1}
          max={30}
          step={0.1}
          value={[guidance]}
          onValueChange={(value) => setGuidance(value[0])}
        />
      </div>

      <div>
        <Label htmlFor="seed">Seed</Label>
        <Input
          id="seed"
          type="number"
          value={seed}
          onChange={(e) => setSeed(parseInt(e.target.value))}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate'}
      </Button>
    </form>
  );
}