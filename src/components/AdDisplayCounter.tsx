
import React from 'react';

const AdDisplayCounter = () => {
  const adsShown = 5;
  const adsLimit = 15;
  const percentComplete = (adsShown / adsLimit) * 100;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{adsShown} / {adsLimit} ads shown</span>
          <span className="text-sm text-gray-500">{Math.round(percentComplete)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-500 ease-in-out"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>
      
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
      
      <button className="w-full py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
        Upgrade to view more
      </button>
    </div>
  );
};

export default AdDisplayCounter;
