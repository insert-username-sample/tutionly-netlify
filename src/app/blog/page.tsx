'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme, useLogo } from '@/contexts/ThemeContext';
import GlassCard from '@/components/ui/GlassCard';

const BlogPage: React.FC = () => {
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
              Revolutionizing the Indian EdTech Space
            </h1>
            <p className="text-lg text-gray-400">
              How Tutorly is personalizing education for every student.
            </p>
          </GlassCard>

          <GlassCard className="p-8">
            <div
              className={`text-lg leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              <p>
                The Indian education landscape is undergoing a seismic shift.
                For decades, the one-size-fits-all approach has been the norm,
                leaving countless students struggling to keep up. At Tutorly,
                we believe that every student is unique, with their own
                learning style, pace, and preferences. That's why we're on a
                mission to revolutionize the Indian EdTech space with a new
                approach to personalized learning.
              </p>
              <br />
              <p>
                Our platform is built on the core principle that education
                should adapt to the student, not the other way around. We
                leverage the power of AI to create a truly personalized
                learning experience that caters to each student's individual
                needs. Whether it's understanding a complex scientific concept
                or mastering a difficult mathematical formula, Tutorly is
                there to provide the right support at the right time.
              </p>
              <br />
              <h2 className="text-2xl font-bold mb-4 text-gradient">
                Understanding the Unique Learner
              </h2>
              <p>
                At the heart of Tutorly's approach is a deep understanding of
                the unique learner. We recognize that students have different
                memory types, learning paces, and preferences. Some students
                are visual learners who grasp concepts best through diagrams
                and charts, while others are auditory learners who benefit from
                spoken explanations. Still others are kinesthetic learners who
                learn best by doing.
              </p>
              <br />
              <p>
                Tutorly's AI-powered platform is designed to identify and adapt
                to these individual learning styles. Through a series of
                interactive quizzes and assessments, we create a detailed
                profile of each student's learning preferences. This allows us
                to tailor our content and teaching methods to match their
                needs, ensuring that they receive the most effective and
                engaging learning experience possible.
              </p>
              <br />
              <h2 className="text-2xl font-bold mb-4 text-gradient">
                The Power of Personalized Learning
              </h2>
              <p>
                Personalized learning is not just about catering to different
                learning styles. It's about creating a dynamic and adaptive
                learning environment that grows with the student. Tutorly's
                platform uses a milestone-based approach to track each
                student's progress and identify areas where they need
                additional support.
              </p>
              <br />
              <p>
                Our AI-powered analytics provide students with personalized
                insights into their performance, helping them to understand
                their strengths and weaknesses. This data-driven approach
                allows us to create a customized learning path for each
                student, ensuring that they are always challenged but never
                overwhelmed.
              </p>
              <br />
              <h2 className="text-2xl font-bold mb-4 text-gradient">
                Preparing for the Future
              </h2>
              <p>
                Our ultimate goal is to empower students to achieve their
                career goals, whether that's acing their board exams or
                cracking the IIT JEE. We believe that by providing a truly
                personalized learning experience, we can help students to
                unlock their full potential and succeed in an increasingly
                competitive world.
              </p>
              <br />
              <p>
                The Indian EdTech space is ripe for disruption, and we're
                excited to be at the forefront of this revolution. With our
                innovative approach to personalized learning, we're confident
                that we can make a real difference in the lives of students
                across the country.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
};

export default BlogPage;
