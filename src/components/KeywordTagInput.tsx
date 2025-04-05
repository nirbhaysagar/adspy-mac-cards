
import React, { useState } from 'react';
import { X } from 'lucide-react';

const KeywordTagInput = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const maxTags = 5;

  const addTag = () => {
    if (input && !tags.includes(input) && tags.length < maxTags) {
      setTags([...tags, input]);
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <span 
            key={tag} 
            className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm flex items-center group animate-fade-in"
          >
            {tag}
            <button 
              onClick={() => removeTag(tag)} 
              className="ml-1.5 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 p-0.5"
            >
              <X size={14} className="text-gray-500" />
            </button>
          </span>
        ))}
      </div>
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? "e.g. fitness, crypto, ai..." : ""}
          disabled={tags.length >= maxTags}
          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {tags.length >= maxTags && (
          <span className="absolute right-2 top-2 text-xs text-gray-400">
            Max 5 tags
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {tags.length} of {maxTags} keywords used
      </p>
    </div>
  );
};

export default KeywordTagInput;
