'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '@/lib/firebase';
import { Auth } from 'firebase/auth';
import { ArrowLeft, Check, ChevronRight, Moon, Sun, Users, BookOpen, MessageSquare, Star, Heart, Crown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme, useLogo } from '@/contexts/ThemeContext';

interface WaitlistFormData {
  name: string;
  email: string;
  phone?: string;
  role: string;
  primaryUse: string;
  willingnessToPay: string;
  preferredTutorFormat: string;
  learningStyle: string;
  biggestFrustration: string;
  joinWaitlistPerks: string;
  submittedAt: Date;
}

const questions = [
  {
    id: 'name',
    title: "What's your name?",
    type: 'short_answer' as const,
    placeholder: 'Enter your name',
    required: true,
    icon: Users,
  },
  {
    id: 'phone',
    title: "What's your phone number? (Optional)",
    type: 'short_answer' as const,
    placeholder: 'Enter your phone number',
    required: false,
    icon: Users,
  },
  {
    id: 'role',
    title: 'What best describes your role?',
    type: 'multiple_choice' as const,
    options: [
      'Parent of a K-12 student',
      'Student (K-12)',
      'Educator',
      'Other'
    ],
    required: true,
    icon: Users
  },
  {
    id: 'primaryUse',
    title: 'What will be your primary use of Tutorly?',
    type: 'multiple_choice' as const,
    options: [
      'One-on-one personal tutoring',
      'Subject-wise tutor (Math, Science, etc.)',
      'Full multi-subject coaching',
      'Doubt-solving only'
    ],
    required: true,
    icon: BookOpen
  },
  {
    id: 'willingnessToPay',
    title: 'What price range would you be willing to pay per month?',
    type: 'multiple_choice' as const,
    options: [
      '₹799',
      '₹999',
      '₹1,499',
      '₹1,999+'
    ],
    required: true,
    icon: Crown
  },
  {
    id: 'preferredTutorFormat',
    title: "What's your preferred tutor format?",
    type: 'multiple_choice' as const,
    options: [
      'One tutor for all subjects/grades',
      'Separate tutor for each subject/grade',
      'Not sure yet'
    ],
    required: true,
    icon: Check
  },
  {
    id: 'learningStyle',
    title: "What's your most important learning style?",
    type: 'multiple_choice' as const,
    options: [
      'Visual (charts, diagrams)',
      'Audio (spoken explanations)',
      'Interactive (quizzes, practice)',
      'Mixed / all of the above'
    ],
    required: true,
    icon: Star
  },
  {
    id: 'biggestFrustration',
    title: "What's your biggest frustration with current tuition options?",
    type: 'short_answer' as const,
    placeholder: 'Share your thoughts... (optional)',
    required: false,
    icon: MessageSquare
  },
  {
    id: 'joinWaitlistPerks',
    title: 'Tell us why you want to join the waitlist!',
    type: 'multiple_choice' as const,
    options: [
      'Excited for early access + discounts',
      'Just want updates'
    ],
    required: true,
    icon: Heart
  }
];

const WaitlistPage: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { logoSrc, logoAlt } = useLogo();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<WaitlistFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const auth = getAuth();
  const [user] = useAuthState(auth as Auth);

  useEffect(() => {
    if (user) {
      setAnswers(prev => ({ ...prev, name: user.displayName || '', email: user.email || '' }));
    }
  }, [user]);

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: answer
    }));

    // Auto-advance for required questions
    if (currentQ.required) {
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        }
      }, 500);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: answers.name,
          email: answers.email,
          phone: answers.phone || '',
          role: answers.role,
          primaryUse: answers.primaryUse,
          willingnessToPay: answers.willingnessToPay,
          preferredTutorFormat: answers.preferredTutorFormat,
          learningStyle: answers.learningStyle,
          biggestFrustration: answers.biggestFrustration || '',
          joinWaitlistPerks: answers.joinWaitlistPerks,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('There was an error joining the waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      alert('There was an error joining the waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (!currentQ.required) return true;
    return !!answers[currentQ.id as keyof WaitlistFormData];
  };


  if (isSubmitted) {
    return (
      <div className={`min-h-screen transition-all duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 xl:px-0 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <ArrowLeft size={24} className={`transition-colors ${isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`} />
              <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Back to Home</span>
            </Link>
            <button onClick={toggleTheme} className={`p-2 rounded-xl transition-all duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-600 shadow-lg'}`}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Success Message */}
        <div className="max-w-3xl mx-auto px-6 xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${isDark ? 'bg-green-500' : 'bg-green-500'}`}
            >
              <Check size={32} className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-4 text-gradient">Thanks for joining!</h1>
            <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We'll let you know when you're selected for early access.
            </p>
            <Link href="/">
              <button className="bg-gradient-primary hover:opacity-90 transition-opacity text-white px-8 py-4 rounded-xl font-semibold text-lg">
                Back to Home
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 xl:px-0 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft size={24} className={`transition-colors ${isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`} />
            <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Back to Home</span>
          </Link>

          <div className="flex items-center gap-4">
            <Image src={logoSrc} alt={logoAlt} width={32} height={32} className="h-8 w-auto" />
            <button onClick={toggleTheme} className={`p-2 rounded-xl transition-all duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-600 shadow-lg'}`}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto px-6 xl:px-0 mb-8">
        <div className={`h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
          <motion.div
            className="h-full bg-gradient-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className={`text-center mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto px-6 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={currentQuestion}
          className="text-center"
        >
          {/* Intro Text */}
          {currentQuestion === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-center mb-12 ${isDark ? 'text-gray-200' : 'text-gray-600'}`}
            >
              <h1 className="text-3xl font-bold mb-4 text-gradient">Join Tutorly's Waitlist</h1>
              <p className="text-xl">
                Thanks for joining Tutorly's journey! Let us know your preferences—it'll only take a minute.
              </p>
            </motion.div>
          )}

          {/* Question */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${isDark ? 'bg-gray-800' : 'bg-white shadow-lg'}`}
            >
              <currentQ.icon size={32} className="text-blue-500" />
            </motion.div>

            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {currentQ.title}
            </h2>

            <AnimatePresence mode="wait">
              {currentQ.type === 'multiple_choice' ? (
                <motion.div
                  key={`options-${currentQuestion}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid gap-4 max-w-2xl mx-auto"
                >
                  {currentQ.options.map((option, index) => (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(option)}
                      className={`p-6 rounded-xl text-left transition-all duration-300 ${
                        answers[currentQ.id as keyof WaitlistFormData] === option
                          ? 'bg-gradient-primary text-white shadow-lg scale-105'
                          : isDark
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                          : 'bg-white hover:bg-gray-50 text-gray-900 shadow-sm'
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={`textarea-${currentQuestion}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-2xl mx-auto"
                >
                  <textarea
                    value={(answers[currentQ.id as keyof WaitlistFormData] as string) || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder={currentQ.placeholder}
                    className={`w-full p-6 rounded-xl resize-none ${
                      isDark
                        ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700'
                        : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300 shadow-sm'
                    } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    rows={4}
                  />
                  {!currentQ.required && (
                    <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Optional - you can skip this question
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentQuestion === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : isDark
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Previous
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  canProceed()
                    ? 'bg-gradient-primary hover:opacity-90 text-white'
                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  canProceed() && !isSubmitting
                    ? 'bg-gradient-primary hover:opacity-90 text-white'
                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WaitlistPage;
