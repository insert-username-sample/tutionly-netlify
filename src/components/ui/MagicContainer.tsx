'use client';
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const clsx = (...args: (string | boolean | undefined | null)[]): string =>
  args.filter(Boolean).join(' ');

interface MagicContainerProps {
  children: React.ReactNode;
  className?: string;
}

const MagicContainer: React.FC<MagicContainerProps> = ({ children, className }) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        'relative rounded-3xl p-[1px] transition-all duration-300',
        className
      )}
      style={{
        background: isHovered
          ? `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, #9E7AFF, #38bdf8, #FF5C5C, #FE8BBB, transparent 80%)`
          : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'),
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={clsx(
        "relative z-10 w-full h-full rounded-[23px] overflow-hidden",
        isDark ? 'bg-gray-900' : 'bg-white'
      )}>
        {children}
      </div>
    </div>
  );
};

export default MagicContainer;
