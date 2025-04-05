
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'global', label: 'Global' },
];

const states = {
  us: [
    { value: 'ny', label: 'New York' },
    { value: 'ca', label: 'California' },
    { value: 'tx', label: 'Texas' },
    { value: 'fl', label: 'Florida' }
  ],
  ca: [
    { value: 'on', label: 'Ontario' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'qc', label: 'Quebec' }
  ],
  uk: [],
  au: [
    { value: 'nsw', label: 'New South Wales' },
    { value: 'vic', label: 'Victoria' }
  ],
  global: []
};

interface State {
  value: string;
  label: string;
}

const LocationFilter = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [countryOpen, setCountryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);

  // Load saved location filters on component mount
  useEffect(() => {
    try {
      const savedCountry = localStorage.getItem('adFilterCountry');
      const savedState = localStorage.getItem('adFilterState');
      
      if (savedCountry) setSelectedCountry(savedCountry);
      if (savedState) setSelectedState(savedState);
    } catch (error) {
      console.error('Failed to load saved location filters:', error);
    }
  }, []);

  const handleCountrySelect = (value: string) => {
    setSelectedCountry(value);
    setSelectedState(''); // Reset state when country changes
    localStorage.setItem('adFilterCountry', value);
    localStorage.removeItem('adFilterState'); // Clear saved state
    setCountryOpen(false);
  };

  const handleStateSelect = (value: string) => {
    setSelectedState(value);
    localStorage.setItem('adFilterState', value);
    setStateOpen(false);
  };

  const hasStates = selectedCountry && states[selectedCountry as keyof typeof states]?.length > 0;

  return (
    <div className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
        <button
          onClick={() => setCountryOpen(!countryOpen)}
          className="w-full flex items-center justify-between p-2.5 border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className={selectedCountry ? "text-gray-800" : "text-gray-400"}>
            {selectedCountry ? countries.find(c => c.value === selectedCountry)?.label : "Select a country"}
          </span>
          <ChevronDown size={16} className={`text-gray-400 transition-transform ${countryOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {countryOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in">
            {countries.map((country) => (
              <div
                key={country.value}
                onClick={() => handleCountrySelect(country.value)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-50 text-gray-800 first:rounded-t-lg last:rounded-b-lg"
              >
                {country.label}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {hasStates && (
        <div className="relative animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <button
            onClick={() => setStateOpen(!stateOpen)}
            className="w-full flex items-center justify-between p-2.5 border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className={selectedState ? "text-gray-800" : "text-gray-400"}>
              {selectedState 
                ? states[selectedCountry as keyof typeof states].find((s: State) => s.value === selectedState)?.label 
                : "Select a state"}
            </span>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${stateOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {stateOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in">
              {states[selectedCountry as keyof typeof states].map((state: State) => (
                <div
                  key={state.value}
                  onClick={() => handleStateSelect(state.value)}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-50 text-gray-800 first:rounded-t-lg last:rounded-b-lg"
                >
                  {state.label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationFilter;
