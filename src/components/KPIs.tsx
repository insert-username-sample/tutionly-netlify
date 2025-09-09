import { FC } from 'react';

const KPIs: FC = () => {
  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl shadow-lg border border-transparent dark:border-gray-700">
      <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">Key Performance Indicators</h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Syllabus Coverage</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">75%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Mastery Level</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">82%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">PYQs Solved</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">120</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Mock Tests</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
        </div>
      </div>
    </div>
  );
};

export default KPIs;
