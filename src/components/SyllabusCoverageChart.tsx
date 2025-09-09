'use client';

import { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Subject A', covered: 40, remaining: 60 },
  { name: 'Subject B', covered: 60, remaining: 40 },
  { name: 'Subject C', covered: 80, remaining: 20 },
  { name: 'Subject D', covered: 50, remaining: 50 },
  { name: 'Subject E', covered: 70, remaining: 30 },
];

const SyllabusCoverageChart: FC = () => {
  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl shadow-lg border border-transparent dark:border-gray-700">
      <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">Syllabus Coverage</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          <Bar dataKey="covered" stackId="a" fill="#3B82F6" />
          <Bar dataKey="remaining" stackId="a" fill="#475569" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SyllabusCoverageChart;
