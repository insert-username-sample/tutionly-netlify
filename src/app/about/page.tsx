'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Sun, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme, useLogo } from '@/contexts/ThemeContext';
import GlassCard from '@/components/ui/GlassCard';

const AboutPage: React.FC = () => {
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
            <Image src={logoSrc} alt={logoAlt} width={140} height={40} />
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
              About Tutorly
            </h1>
            <p
              className={`text-xl leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Tutorly is an AI-powered tutoring platform for K-12 students. It
              personalizes learning by adapting to each student’s pace,
              subject, and style. From live sessions to doubt-solving, Tutorly
              makes quality education simple, affordable, and accessible.
            </p>
          </GlassCard>

          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-gradient">
                Our Mission
              </h2>
              <p
                className={`text-lg leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Tutorly was created by Manas Khobrekar as a solution to provide a
                personal tutor without the heavy financial burden of a real
                tutor. It's available 24/7, understands student psychology,
                learning patterns, and memory type.
              </p>
            </GlassCard>
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-gradient">
                <Eye className="inline-block mr-2" />
                Our Vision
              </h2>
              <p
                className={`text-lg leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Through quiz-based milestone learning, we help students achieve
                their career goals—whether it be boards or to crack IIT JEE
                (coming soon)—with personalized insights using analytics and a
                dashboard to help the student better align and improve
                themselves.
              </p>
            </GlassCard>
          </div>

          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-gradient text-center">
              About the Founder
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 text-center">
                <Image
                  src="/founder.jpeg"
                  alt="Manas Khobrekar"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-xl font-bold mt-4">Manas Khobrekar</h3>
              </div>
              <div className="md:w-2/3">
                <p
                  className={`text-lg leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  I'm a Tech Enthusiast from India. I am passionate about Virtual
                  Reality (AR/XR/Spatial Computing included) and AI. My
                  fascination with VR began as a curious exploration, captivated
                  by its endless possibilities to immerse oneself in a reality
                  created by humankind. AI is something I believe could be our
                  Cosmic Offspring to the Universe.
                </p>
                <p
                  className={`text-lg leading-relaxed mt-4 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  As a content strategist, I strive to bridge the gap between technical
                  concepts and engaging narratives, crafting articles that inform
                  and inspire. The intersection of technology and creativity is
                  where I thrive, and I love sharing this enthusiasm through my
                  work.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-gradient text-center">
              Beliefs and Perspectives
            </h2>
            <p
              className={`text-lg leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Art, in all its forms, resonates deeply with me. I believe that
              art and technology are intertwined, each enhancing the other, and
              I aim to explore this relationship in my writing.
            </p>
            <p
              className={`text-lg leading-relaxed mt-4 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Excited by the bright future of these fields, I'm eager to
              continue learning and sharing my insights on the internet (via my
              blog and upcoming YouTube channel), contributing my voice to the
              conversation and inspiring others to embrace the magic of what is
              possible.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
};

export default AboutPage;
