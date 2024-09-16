import React from 'react';

const PinnedComment: React.FC = () => {
  return (
    <div className="bg-blue-100 text-blue-900 p-4 rounded-md shadow-lg h-full">
      <h3 className="font-bold mb-2">About This Website</h3>
      <p className="text-sm mb-2">
        Image Generation hosted on my server. Ngrok used for tunneling.
      </p>
      <div className="grid grid-cols-1 gap-2">
        <div>
          <p className="text-sm font-semibold">Current models:</p>
          <ul className="list-disc list-inside text-sm">
            <li>Flux Dev</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Planned integration:</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Flux Schnell (faster)</li>
            <li>Stable Diffusion</li>
            <li>Image to Image for Flux</li>
            <li>LORA Training in Flux</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PinnedComment;