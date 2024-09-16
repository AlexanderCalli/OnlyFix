import React from 'react';

const AlertBox: React.FC = () => {
  return (
    <div className="bg-red-500 text-white p-4 rounded-md shadow-lg h-full">
      <h3 className="font-bold mb-2">Under Construction</h3>
      <p className="text-sm mb-2">
        The webpage is still under construction. Please consider:
      </p>
      <ul className="list-disc list-inside text-sm space-y-1">
        <li>Vercel API Timeout may affect image display. Refresh to see generated images as examples.</li>
        <li>Estimated generation times:</li>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>512x512: ~40 seconds</li>
          <li>1024x1024: ~1 minute</li>
          <li>2080x2080: ~2 minutes</li>
        </ul>
        <li>Avoid generating larger images</li>
      </ul>
    </div>
  );
};

export default AlertBox;