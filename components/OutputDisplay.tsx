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
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Output</h2>
      <div className="bg-gray-100 p-4 rounded min-h-[300px] flex items-center justify-center">
        {image ? (
          <img src={image.public_url} alt="Generated" className="max-w-full max-h-full" />
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
        <Button variant="outline" disabled={!image}>Download</Button>
        <Button variant="outline" disabled={!image}>Copy Prompt</Button>
        <Button variant="outline" disabled={!image}>Use as Input</Button>
      </div>
    </div>
  );
}