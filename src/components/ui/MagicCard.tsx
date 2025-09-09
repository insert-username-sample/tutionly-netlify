'use client';
import React from 'react';

const clsx = (...args: (string | boolean | undefined | null)[]): string => 
  args.filter(Boolean).join(' ');

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
}

const MagicCard: React.FC<MagicCardProps> = ({ children, className }) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

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
          ? `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, #9E7AFF, #38bdf8, #FF5C5C, #FE8BBB, transparent 80%), rgba(255, 255, 255, 0.05)`
          : 'rgba(255, 255, 255, 0.05)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

export default MagicCard;
