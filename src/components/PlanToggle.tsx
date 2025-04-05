
import React, { useState } from 'react';
import { Check } from 'lucide-react';

const PlanToggle = () => {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => setIsPaid(false)}
          className={`flex-1 py-3 px-4 rounded-l-lg border transition-all ${!isPaid ? 'bg-white border-gray-300 shadow-sm' : 'border-gray-200 bg-gray-50 text-gray-500'}`}
        >
          <div className="flex items-center justify-center">
            <span className="text-sm font-medium mr-1.5">Free</span>
            {!isPaid && <Check size={16} className="text-blue-500" />}
          </div>
        </button>
        
        <button 
          onClick={() => setIsPaid(true)}
          className={`flex-1 py-3 px-4 rounded-r-lg border transition-all ${isPaid ? 'bg-white border-gray-300 shadow-sm' : 'border-gray-200 bg-gray-50 text-gray-500'}`}
        >
          <div className="flex items-center justify-center">
            <span className="text-sm font-medium mr-1.5">Paid</span>
            {isPaid && <Check size={16} className="text-green-500" />}
          </div>
        </button>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-lg text-sm">
        {isPaid ? (
          <div className="animate-fade-in text-gray-700">
            <span className="font-medium text-green-600">Premium:</span> 50+ ads & export option
          </div>
        ) : (
          <div className="animate-fade-in text-gray-700">
            <span className="font-medium text-blue-600">Free:</span> 15 ads only
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanToggle;
