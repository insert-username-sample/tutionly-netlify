'use client';

import { FC } from 'react';

const data = Array.from({ length: 100 }, () => ({
  value: Math.floor(Math.random() * 100),
}));

const MasteryHeatmap: FC = () => {
  const getColor = (value: number) => {
    if (value > 80) return 'bg-green-500';
    if (value > 60) return 'bg-green-400';
    if (value > 40) return 'bg-yellow-400';
    if (value > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl shadow-lg border border-transparent dark:border-gray-700">
      <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">Mastery Heatmap</h3>
      <div className="grid grid-cols-10 gap-2">
        {data.map((item, index) => (
          <div
            key={index}
            className={`w-full h-8 rounded-md ${getColor(item.value)}`}
            title={`Mastery: ${item.value}%`}
          />
        ))}
      </div>
    </div>
  );
};

export default MasteryHeatmap;
