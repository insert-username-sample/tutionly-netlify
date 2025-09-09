import { FC } from 'react';

const PricingPage: FC = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827] text-gray-900 dark:text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Pricing</h1>
      <p className="text-lg mb-8">
        Our pricing is currently being finalized. We will offer a range of plans to suit different needs.
      </p>
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
        <p className="text-lg">
          Detailed pricing information will be available shortly.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
