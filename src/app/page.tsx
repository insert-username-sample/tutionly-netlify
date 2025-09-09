'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import BackgroundWrapper from '@/components/ui/BackgroundWrapper';
import Divider from '@/components/ui/Divider';

export default function HomePage() {
  const { isDark } = useTheme();
  
  const handleTryDemo = () => {
    // Navigate to demo page
    window.location.href = '/demo';
  };

  const handleJoinWaitlist = () => {
    // Open waitlist modal or navigate to waitlist page
    window.location.href = '/waitlist';
  };

  return (
    <main 
      className="min-h-screen transition-all duration-300" 
      style={{ 
        backgroundColor: isDark ? 'var(--dark-bg)' : 'var(--light-bg)'
      }}
    >
      <Navigation />
      <HeroSection 
        onTryDemo={handleTryDemo}
        onJoinWaitlist={handleJoinWaitlist}
      />
      <BackgroundWrapper>
        <HowItWorks />
        <Divider />
        <Features />
      </BackgroundWrapper>
      <Footer />
    </main>
  );
}
