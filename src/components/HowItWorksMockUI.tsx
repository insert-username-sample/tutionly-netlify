'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mic, MessageSquare } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import GlassCard from './ui/GlassCard';
import Button from './ui/Button';

const HowItWorksMockUI: React.FC = () => {
  const { isDark } = useTheme();

  const steps = [
    {
      icon: BookOpen,
      title: 'Choose Your Tutor',
      description: 'Select from a wide range of subjects to find the perfect AI tutor.',
      mockUI: (
        <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-white">Subject</span>
            <span className="text-xs text-white/70">Math</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-white">Topic</span>
            <span className="text-xs text-white/70">Algebra</span>
          </div>
        </div>
      ),
    },
    {
      icon: Mic,
      title: 'Start a Session',
      description: 'Connect with your tutor for a live, interactive learning session.',
      mockUI: (
        <div className="text-center">
          <Button variant="primary" size="sm">Join Live Class</Button>
          <p className="text-xs text-white/70 mt-2">Session starting soon...</p>
        </div>
      ),
    },
    {
      icon: MessageSquare,
      title: 'Chat & Learn',
      description: 'Receive step-by-step solutions and personalized feedback.',
      mockUI: (
        <div className="space-y-2 text-left">
          <div className="text-xs p-2 rounded-lg bg-blue-500 text-white self-end max-w-[80%]">
            How do I solve for x?
          </div>
          <div className="text-xs p-2 rounded-lg bg-white/20 text-white self-start max-w-[80%]">
            Great question! Let's break it down step-by-step.
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-6 h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <step.icon size={24} className="text-primary" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {step.title}
                </h3>
              </div>
            </div>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {step.description}
            </p>
            <div className={`rounded-xl p-4 ${isDark ? 'bg-gray-800/50' : 'bg-gray-900/80'}`}>
              {step.mockUI}
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};

export default HowItWorksMockUI;
