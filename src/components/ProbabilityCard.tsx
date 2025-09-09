'use client';

import { FC, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Probability', value: 75 },
  { name: 'Remaining', value: 25 },
];

const COLORS = ['#3B82F6', '#475569'];

const ProbabilityCard: FC = () => {
  const [hours, setHours] = useState(10);

  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl shadow-lg border border-transparent dark:border-gray-700">
      <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">Probability of Success</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center -mt-20">
        <p className="text-5xl font-bold text-gray-900 dark:text-white">75%</p>
      </div>
      <div className="mt-4">
        <label htmlFor="hours" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          What-if: Hours/week
        </label>
        <input
          type="range"
          id="hours"
          min="0"
          max="40"
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <p className="text-center mt-2 text-gray-700 dark:text-gray-300">{hours} hours/week</p>
      </div>
    </div>
  );
};

export default ProbabilityCard;
