'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <div
      className="transition-all duration-300"
      style={{
        background: isDark
          ? `linear-gradient(180deg, var(--dark-bg) 0%, rgba(96, 165, 250, 0.1) 25%, rgba(110, 231, 183, 0.1) 50%, rgba(251, 191, 36, 0.05) 75%, var(--dark-bg) 100%)`
          : `linear-gradient(180deg, rgba(248, 250, 252, 1) 0%, rgba(110, 231, 183, 0.3) 15%, rgba(251, 191, 36, 0.2) 50%, rgba(248, 250, 252, 1) 100%)`,
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;
