'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const Divider: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="w-full flex justify-center py-10">
      <div
        className="w-2/3 h-px"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent)',
        }}
      />
    </div>
  );
};

export default Divider;
