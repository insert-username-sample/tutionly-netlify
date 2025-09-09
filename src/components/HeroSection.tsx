'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Button from '@/components/ui/Button';
import FloatingElement from '@/components/ui/FloatingElement';
import { useTheme } from '@/contexts/ThemeContext';
import LiveSessionMockUI from '@/components/LiveSessionMockUI';
interface HeroSectionProps {
  onTryDemo?: () => void;
  onJoinWaitlist?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onTryDemo,
  onJoinWaitlist,
}) => {
  const { isDark } = useTheme();

  return (
    <section className="relative flex items-center overflow-hidden py-32 lg:py-40">
      {/* Background Container */}
      <div className="absolute inset-0 z-0">
        {!isDark ? (
          <div className="min-h-screen w-full bg-[#f0f0f0] relative">
            <div
              className="absolute inset-0 z-0"
              style={{
                background: "linear-gradient(120deg, #d5c5ff 0%, #a7f3d0 50%, #f0f0f0 100%)"
              }}
            />
            <div className="absolute inset-0 overflow-hidden backdrop-blur-[0.5px]">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [-12, 12, -12],
                    x: [-10, 10, -10],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="min-h-screen w-full bg-[#0a0a0a] relative">
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
                  radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
                  radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
                  radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%),
                  linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)
                `,
              }}
            />
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-blue-500/30 rounded-full blur-sm"
                  style={{
                    left: `${25 + Math.random() * 50}%`,
                    top: `${25 + Math.random() * 50}%`,
                  }}
                  animate={{
                    y: [-8, 8, -8],
                    x: [-6, 6, -6],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Animated background elements */}
      <FloatingElement size="lg" position="top-left" delay={0} opacity={isDark ? 0.1 : 0.2} color={isDark ? 'white' : 'blue'} />
      <FloatingElement size="md" position="top-right" delay={1} opacity={isDark ? 0.08 : 0.15} color={isDark ? 'white' : 'purple'} />
      <FloatingElement size="xl" position="bottom-left" delay={2} opacity={isDark ? 0.06 : 0.1} color={isDark ? 'white' : 'green'} />
      <FloatingElement size="sm" position="bottom-right" delay={0.5} opacity={isDark ? 0.12 : 0.25} color={isDark ? 'white' : 'pink'} />
      
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-5 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold leading-tight mb-6" style={{
                color: isDark ? 'var(--dark-text-primary)' : 'var(--light-text-primary)'
              }}>
                Because Every Student{' '}
                <span className="text-gradient">
                  Learns Differently.
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl leading-relaxed max-w-xl mb-8 font-body" style={{
                color: isDark ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'
              }}>
                Tuitionly adapts to your unique learning style - memory type, pace, and preferences - 
                so you can study smarter, not harder.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <Button
                    variant="primary"
                    size="md"
                    onClick={onTryDemo}
                    icon={<Play size={20} />}
                    className={`shadow-xl transition-all duration-300 ${
                      isDark
                        ? 'hover:shadow-2xl'
                        : 'hover:shadow-blue-200/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600'
                    }`}
                  >
                    <span className={`${!isDark ? 'group-hover:text-white' : ''} transition-colors duration-300`}>
                      Try the Demo
                    </span>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={onJoinWaitlist}
                    className={`transition-all duration-300 ${
                      isDark
                        ? 'hover:bg-gray-700 hover:shadow-xl'
                        : 'hover:bg-white hover:shadow-lg hover:border-blue-200 group-hover:text-blue-600'
                    } ${
                      !isDark ? 'group-hover:shadow-blue-200/25' : ''
                    }`}
                  >
                    <span className={`${!isDark ? 'group-hover:text-blue-600' : ''} transition-colors duration-300`}>
                      Join the Waitlist
                    </span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Combined Mock UI */}
          <div className="lg:col-span-7 justify-self-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-[120%] h-[650px]"
            >
              <LiveSessionMockUI />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
