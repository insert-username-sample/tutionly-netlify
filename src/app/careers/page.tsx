'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme, useLogo } from '@/contexts/ThemeContext';
import GlassCard from '@/components/ui/GlassCard';

const CareersPage: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { logoSrc, logoAlt } = useLogo();

  return (
    <main
      className="min-h-screen transition-all duration-300"
      style={{
        backgroundColor: isDark ? 'var(--dark-bg)' : 'var(--light-bg)',
      }}
    >
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-6 xl:px-0 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft
              size={24}
              className={`transition-colors ${
                isDark
                  ? 'text-gray-400 group-hover:text-white'
                  : 'text-gray-600 group-hover:text-gray-900'
              }`}
            />
            <span
              className={`font-semibold ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Back to Home
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Image src={logoSrc} alt={logoAlt} width={160} height={40} />
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isDark
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  : 'bg-white hover:bg-gray-50 text-gray-600 shadow-lg'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 xl:px-0 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <GlassCard className="p-8 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gradient">
              Join Our Team
            </h1>
            <p
              className={`text-xl leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              We're looking for passionate individuals to help us revolutionize education.
            </p>
          </GlassCard>

          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-gradient">
              Open Positions
            </h2>
            <p
              className={`text-lg leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              We are not currently hiring for any open positions. Please check back later for updates.
            </p>
          </GlassCard>

          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-gradient">
              Meet the Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Image
                  src="/path/to/team-member-1.jpg"
                  alt="Team Member 1"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  CEO & Co-Founder
                </p>
              </div>
              <div className="text-center">
                <Image
                  src="/path/to/team-member-2.jpg"
                  alt="Team Member 2"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold">Jane Smith</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  CTO & Co-Founder
                </p>
              </div>
              <div className="text-center">
                <Image
                  src="/path/to/team-member-3.jpg"
                  alt="Team Member 3"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold">Peter Jones</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Lead Developer
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
};

export default CareersPage;
