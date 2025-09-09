'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import FeaturesMockUI from './FeaturesMockUI';

const Features: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: isDark ? 'var(--dark-text-primary)' : 'var(--light-text-primary)' }}>
            Everything You Need to Succeed
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: isDark ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)' }}>
            Tuitionly is packed with powerful features designed to help you learn smarter, not harder.
          </p>
        </motion.div>

        <FeaturesMockUI />
      </div>
    </section>
  );
};

export default Features;
