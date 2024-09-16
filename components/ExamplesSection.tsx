import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import { GeneratedImage } from '@/types';
import { Button } from "@/components/ui/button";

export default function ExamplesSection() {
  const [examples, setExamples] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const offsetRef = useRef(0);
  const initialLoadDone = useRef(false);

  const fetchRandomImages = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    const { data, error } = await supabase
      .from('generated_images')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offsetRef.current, offsetRef.current + 4);

    if (error) {
      console.error('Error fetching random images:', error);
      setIsLoading(false);
      return;
    }

    if (data) {
      const validImages = await Promise.all(data.map(async (image) => {
        const { data: fileExists } = await supabase
          .storage
          .from('images')
          .list(image.storage_path.split('/')[0], {
            limit: 1,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
          });

        if (fileExists && fileExists.length > 0) {
          return {
            id: image.id,
            filename: image.filename,
            prompt: image.prompt,
            storage_path: image.storage_path,
            width: image.width,
            height: image.height,
            created_at: image.created_at,
            public_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${image.storage_path}`
          };
        }
        return null;
      }));

      const newExamples = validImages.filter((image): image is GeneratedImage => image !== null);
      setExamples(prevExamples => [...prevExamples, ...newExamples]);
      offsetRef.current += newExamples.length;
    }
    setIsLoading(false);
  }, [isLoading]);

  useEffect(() => {
    if (!initialLoadDone.current) {
      fetchRandomImages();
      initialLoadDone.current = true;
    }
  }, [fetchRandomImages]);

  const handleLoadMore = () => {
    fetchRandomImages();
  };

  if (isLoading && examples.length === 0) {
    return <div>Loading examples...</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {examples.map((image) => (
          <div key={image.id} className="relative aspect-square">
            <Image
              src={image.public_url}
              alt={`Example: ${image.prompt}`}
              fill
              className="rounded object-cover"
            />
          </div>
        ))}
      </div>
      {examples.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Button onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
}