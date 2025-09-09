'use client';

import { FC, useState } from 'react';
import Button from '@/components/ui/Button';
import GoalCard from '@/components/GoalCard';
import KPIs from '@/components/KPIs';
import SyllabusCoverageChart from '@/components/SyllabusCoverageChart';
import MasteryHeatmap from '@/components/MasteryHeatmap';
import PYQTimeline from '@/components/PYQTimeline';
import ProbabilityCard from '@/components/ProbabilityCard';
import SubjectDetailsModal from '@/components/SubjectDetailsModal';
import LiveSessionMockUI from '@/components/LiveSessionMockUI';
import ChatContent from '@/components/ChatContent';

const demoData = {
  goal: 'Ace my exams',
  subjects: [
    {
      name: 'Subject A',
      chapters: [
        { name: 'Chapter 1', mastery: 80 },
        { name: 'Chapter 2', mastery: 60 },
        { name: 'Chapter 3', mastery: 90 },
      ],
    },
  ],
};

const FeaturesPage: FC = () => {
  const [goal, setGoal] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleGenerateDashboard = () => {
    if (goal.trim()) {
      setShowDashboard(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827] text-gray-900 dark:text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-6">Features</h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
          Tuitionly is building a comprehensive platform to help students achieve their academic goals.
        </p>

        <div className="space-y-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold mb-6">Live Tutoring Sessions</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Engage in one-on-one sessions with our AI tutors. Get personalized guidance, ask questions, and work through problems on a shared whiteboard.
              </p>
            </div>
            <div className="flex justify-center">
              <LiveSessionMockUI />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center lg:order-last">
              <ChatContent />
            </div>
            <div className="text-center lg:text-left lg:order-first">
              <h2 className="text-4xl font-bold mb-6">Interactive Chat</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Our AI tutors are available 24/7 to help you with your homework, explain concepts, and provide instant feedback.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-4">
            We are working on a dashboard that could look like this -
          </h2>
          {!showDashboard ? (
            <div className="flex flex-col items-center justify-center mt-8">
              <div className="w-full max-w-md">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="What's your main goal?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
                />
                <Button
                  onClick={handleGenerateDashboard}
                  className="w-full mt-4 bg-gradient-to-r from-[#1E90FF] to-[#7B68EE] text-white"
                >
                  Generate Dashboard Preview
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  <GoalCard goal={goal || demoData.goal} />
                  <KPIs />
                </div>
                <div className="lg:col-span-2 space-y-6">
                  <SyllabusCoverageChart />
                  <MasteryHeatmap />
                </div>
                <div className="lg:col-span-1 space-y-6">
                  <ProbabilityCard />
                </div>
                <div className="lg:col-span-4">
                  <PYQTimeline />
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button 
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-[#1E90FF] to-[#40E0D0] text-white"
                >
                  View Subject Details
                </Button>
              </div>
              {showModal && (
                <SubjectDetailsModal
                  subject={demoData.subjects[0]}
                  onClose={() => setShowModal(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
