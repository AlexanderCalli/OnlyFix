'use client';

import { useState } from 'react';
import { GeneratedImage } from '@/types';
import ImageGenerationForm from '@/components/ImageGenerationForm';
import OutputDisplay from '@/components/OutputDisplay';
import ExamplesSection from '@/components/ExamplesSection';
import AdditionalInfo from '@/components/AdditionalInInfo';
import AlertBox from '@/components/AlertBox';
import PinnedComment from '@/components/PinnedComment';

export default function Home() {
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <AlertBox />
        <PinnedComment />
      </div>
      <h1 className="text-3xl font-bold mb-6">AI Image Generation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageGenerationForm onImageGenerated={setGeneratedImage} />
        <OutputDisplay image={generatedImage} />
      </div>
      <ExamplesSection />
      <AdditionalInfo />
    </div>
  );
}