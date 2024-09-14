import Image from 'next/image';

const examples = [
  '/example1.jpg',
  '/example2.jpg',
  '/example3.jpg',
  '/example4.jpg',
  '/example5.jpg',
];

export default function ExamplesSection() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Examples</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {examples.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Example ${index + 1}`}
            width={200}
            height={200}
            className="rounded"
          />
        ))}
      </div>
    </div>
  );
}