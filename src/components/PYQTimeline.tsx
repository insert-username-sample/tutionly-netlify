'use client';

import { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', pyqs: 10 },
  { name: 'Feb', pyqs: 20 },
  { name: 'Mar', pyqs: 15 },
  { name: 'Apr', pyqs: 30 },
  { name: 'May', pyqs: 25 },
  { name: 'Jun', pyqs: 40 },
];

const PYQTimeline: FC = () => {
  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl shadow-lg border border-transparent dark:border-gray-700">
      <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">PYQ Timeline</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis dataKey="name" tick={{ fill: '#94A3B8' }} />
          <YAxis tick={{ fill: '#94A3B8' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#334155',
              borderColor: '#475569',
              color: '#F1F5F9',
            }}
          />
          <Legend wrapperStyle={{ color: '#F1F5F9' }} />
          <Line type="monotone" dataKey="pyqs" stroke="#3B82F6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PYQTimeline;
