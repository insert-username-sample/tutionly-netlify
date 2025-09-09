'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

const ProfileDropDown: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`absolute top-12 right-0 w-48 rounded-xl shadow-lg ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border`}
    >
      <div className="p-4">
        <Link href="/profile" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700">
          <User size={16} />
          Profile
        </Link>
        <Link href="/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700">
          <Settings size={16} />
          Settings
        </Link>
        <div className="h-px my-2 bg-gray-700" />
        <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 w-full text-left">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileDropDown;
