'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Download, MessageSquare, NotebookPen } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import Button from './ui/Button';
import MagicContainer from './ui/MagicContainer';

const FeaturesMockUI: React.FC = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: Users,
      title: 'Personalized Tutorly List',
      mockUI: (
        <div className="space-y-2 text-left w-full">
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/10">
            <span className="text-xs font-semibold text-white">Calculus Tutorly</span>
            <span className="text-xs text-green-400">Online</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/10">
            <span className="text-xs font-semibold text-white">History Tutorly</span>
            <span className="text-xs text-green-400">Online</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/10">
            <span className="text-xs font-semibold text-white">Science Tutorly</span>
            <span className="text-xs text-green-400">Online</span>
          </div>
        </div>
      ),
    },
    {
      icon: NotebookPen,
      title: 'Automated Session Notes',
      mockUI: (
        <div className="text-left w-full">
          <p className="text-sm text-white/80 mb-2 font-semibold"># Session Summary</p>
          <p className="text-xs text-white/60 mb-1">- Key concepts covered</p>
          <p className="text-xs text-white/60">- Areas for improvement</p>
          <p className="text-xs text-white/60">- Next steps</p>
        </div>
      ),
    },
    {
      icon: Download,
      title: 'Downloadable Resources',
      mockUI: (
        <div className="text-center">
          <Button variant="secondary" size="sm" icon={<Download size={14} />}>
            Download Notes
          </Button>
          <p className="text-xs text-white/70 mt-2">PDF, Markdown, and more</p>
        </div>
      ),
    },
    {
      icon: MessageSquare,
      title: 'Interactive Q&A',
      mockUI: (
        <div className="space-y-2 text-left w-full">
          <div className="text-xs p-2 rounded-lg bg-blue-500 text-white self-end max-w-[80%]">
            What is the powerhouse of the cell?
          </div>
          <div className="text-xs p-2 rounded-lg bg-white/20 text-white self-start max-w-[80%]">
            The mitochondria is the powerhouse of the cell.
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <MagicContainer>
            <div className="p-6 h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
              </div>
              <div className={`rounded-xl p-4 h-40 flex items-center justify-center ${isDark ? 'bg-gray-800/50' : 'bg-gray-900/80'}`}>
                {feature.mockUI}
              </div>
            </div>
          </MagicContainer>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturesMockUI;
