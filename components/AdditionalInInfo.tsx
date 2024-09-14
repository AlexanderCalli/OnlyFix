export default function AdditionalInfo() {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Stable Diffusion XL 1.0 base model</li>
          <li>Supports various samplers and custom settings</li>
          <li>Negative prompts for fine-tuned results</li>
          <li>Adjustable image dimensions and generation steps</li>
        </ul>
        {/* Add more sections as needed */}
      </div>
    );
  }