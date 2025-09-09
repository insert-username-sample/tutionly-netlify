'use client';

import React from 'react';

interface WhiteboardProps {
  subject: 'Math' | 'Science' | 'History';
  isAttachment?: boolean;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ subject, isAttachment }) => {
  const renderContent = () => {
    switch (subject) {
      case 'Math':
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-3xl text-gray-800 font-serif">
              x =&nbsp;
              <div className="inline-block relative align-middle">
                <div className="text-center">
                  -b ± √(<span className="border-t border-gray-800">b<sup>2</sup> - 4ac</span>)
                </div>
                <div className="h-px bg-gray-800 w-full absolute top-1/2 left-0" />
                <div className="text-center">
                  2a
                </div>
              </div>
            </div>
          </div>
        );
      case 'Science':
        return (
          <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="100" cy="75" r="30" fill="#FF6B6B" />
            <circle cx="60" cy="115" r="20" fill="#F0F0F0" />
            <circle cx="140" cy="115" r="20" fill="#F0F0F0" />
            <line x1="100" y1="75" x2="60" y2="115" stroke="#333" strokeWidth="4" />
            <line x1="100" y1="75" x2="140" y2="115" stroke="#333" strokeWidth="4" />
            <text x="92" y="82" fontSize="24" fill="white" fontWeight="bold">O</text>
            <text x="52" y="122" fontSize="18" fill="#333" fontWeight="bold">H</text>
            <text x="132" y="122" fontSize="18" fill="#333" fontWeight="bold">H</text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`p-4 bg-white rounded-lg shadow-md w-full h-full flex items-center justify-center ${isAttachment ? 'h-32' : ''}`}>
      {renderContent()}
    </div>
  );
};

export default Whiteboard;
