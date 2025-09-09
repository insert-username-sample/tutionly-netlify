'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Sun, User, Settings, Bell } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme, useLogo } from '@/contexts/ThemeContext';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '@/lib/firebase';
import { Auth } from 'firebase/auth';

const ProfilePage: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { logoSrc, logoAlt } = useLogo();
  const auth = getAuth();
  const [user] = useAuthState(auth as Auth);

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
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-full bg-gradient-primary flex-shrink-0 flex items-center justify-center">
                <User size={48} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user?.displayName || 'Guest'}</h1>
                <p className="text-lg text-gray-400">{user?.email || ''}</p>
              </div>
            </div>
          </GlassCard>

          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-8 flex flex-col items-center">
              <User size={32} className="mb-4 text-blue-400" />
              <h2 className="text-xl font-bold">Profile</h2>
              <p className="text-gray-400 text-center">Manage your personal information</p>
            </GlassCard>
            <GlassCard className="p-8 flex flex-col items-center">
              <Bell size={32} className="mb-4 text-purple-400" />
              <h2 className="text-xl font-bold">Notifications</h2>
              <p className="text-gray-400 text-center">Customize your notification settings</p>
            </GlassCard>
            <GlassCard className="p-8 flex flex-col items-center">
              <Settings size={32} className="mb-4 text-green-400" />
              <h2 className="text-xl font-bold">Settings</h2>
              <p className="text-gray-400 text-center">Adjust your account settings</p>
            </GlassCard>
          </div>

          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-gradient">
              Account Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-400">Full Name</label>
                <p className="text-lg">{user?.displayName || 'Guest'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Email Address</label>
                <p className="text-lg">{user?.email || ''}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Phone Number</label>
                <p className="text-lg">(123) 456-7890</p>
              </div>
              <div className="pt-4">
                <Button variant="secondary">Edit Profile</Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
};

export default ProfilePage;
