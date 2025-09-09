'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme, useLogo } from '@/contexts/ThemeContext';
import GlassCard from '@/components/ui/GlassCard';

const PrivacyPage: React.FC = () => {
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
          <GlassCard className="p-8">
            <h1 className="text-4xl font-bold mb-4 text-gradient">
              Privacy Policy
            </h1>
            <p
              className={`text-lg leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Your privacy is important to us. It is Tuitionly's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
};

export default PrivacyPage;
