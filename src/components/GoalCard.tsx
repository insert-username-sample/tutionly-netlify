import { FC } from 'react';

interface GoalCardProps {
  goal: string;
}

const GoalCard: FC<GoalCardProps> = ({ goal }) => {
  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl shadow-lg border border-transparent dark:border-gray-700">
      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Your Goal</h3>
      <p className="text-gray-700 dark:text-gray-300">{goal}</p>
    </div>
  );
};

export default GoalCard;
