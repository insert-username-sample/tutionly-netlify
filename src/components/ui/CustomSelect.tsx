'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CustomSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  isDark: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 rounded-lg border flex items-center justify-between ${
          isDark
            ? 'bg-gray-800 border-gray-600 text-white'
            : 'bg-white border-gray-300 text-gray-900'
        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown size={20} className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
      </button>
      {isOpen && (
        <ul className={`absolute z-10 w-full mt-1 rounded-lg border ${
          isDark
            ? 'bg-gray-800 border-gray-600 text-white'
            : 'bg-white border-gray-300 text-gray-900'
        }`}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
