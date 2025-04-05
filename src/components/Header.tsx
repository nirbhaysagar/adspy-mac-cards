
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-50 py-6 px-4 md:px-8 rounded-lg mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mr-4 flex items-center justify-center">
            <svg 
              className="w-5 h-5 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 20v-6M6 20V10M18 20V4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-medium text-gray-800">AdSpy Filter</h1>
            <p className="text-sm text-gray-500">Show only what matters. Hide the noise.</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
