
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-8 px-4 md:px-8 pb-6">
      <div className="flex flex-col items-center">
        <button className="bg-gradient-to-r from-green-400 to-green-500 text-white py-3 px-8 rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Start Filtering
        </button>
        <p className="text-xs text-gray-500 mt-4 text-center">
          We respect your privacy. No data is stored without your consent.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
