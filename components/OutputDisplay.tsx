import Image from 'next/image';
import { Button } from "@/components/ui/button"

interface GeneratedImage {
  filename: string;
  storage_path: string;
  public_url: string;
  width: number;
  height: number;
}

interface OutputDisplayProps {
  image: GeneratedImage | null;
}

export default function OutputDisplay({ image }: OutputDisplayProps) {
  const handleDownload = async () => {
    if (image) {
      try {
        const response = await fetch(image.public_url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = image.filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error: unknown) {
        console.error('Error downloading image:', error instanceof Error ? error.message : String(error));
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Output</h2>
      <div className="bg-gray-100 p-4 rounded min-h-[300px] flex items-center justify-center">
        {image ? (
          <div className="relative w-full h-[300px]">
            <Image
              src={image.public_url}
              alt="Generated"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        ) : (
          <p className="text-gray-500">Generated image will appear here</p>
        )}
      </div>
      {image && (
        <div className="mt-4">
          <p>Filename: {image.filename}</p>
          <p>Dimensions: {image.width}x{image.height}</p>
        </div>
      )}
      <div className="mt-4 flex space-x-2">
        <Button variant="outline" disabled={!image} onClick={handleDownload}>Download</Button>
        <Button variant="outline" disabled={!image}>Copy Prompt</Button>
        <Button variant="outline" disabled={!image}>Use as Input</Button>
      </div>
    </div>
  );
}