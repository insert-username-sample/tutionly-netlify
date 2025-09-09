'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLogo, useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import Button from './ui/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '@/lib/firebase';
import { signOut, Auth } from 'firebase/auth';
import { User as UserIcon, Menu, X } from 'lucide-react';
import ProfileDropDown from './ui/ProfileDropDown';

const Navigation: React.FC = () => {
  const { logoSrc, logoAlt } = useLogo();
  const { isDark } = useTheme();
  const auth = getAuth();
  const [user] = useAuthState(auth as Auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut(auth as Auth);
  };

  const navVariants = {
    top: {
      backgroundColor: 'rgba(0,0,0,0)',
      width: '90vw',
      maxWidth: '1400px',
      top: 0,
      borderRadius: 0,
      borderBottomWidth: '1px',
      borderColor: 'transparent',
      boxShadow: 'none',
      overflow: 'visible',
    },
    scrolled: {
      backgroundColor: isDark ? 'rgba(17, 24, 39, 0.4)' : 'rgba(255, 255, 255, 0.4)',
      width: '90vw',
      maxWidth: '1400px',
      top: '16px',
      borderRadius: '9999px',
      borderBottomWidth: '1px',
      borderColor: isDark ? 'rgba(55, 65, 81, 0.5)' : 'rgba(255, 255, 255, 0.3)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
    },
  };

  return (
    <motion.nav
      initial="top"
      animate={isScrolled ? 'scrolled' : 'top'}
      variants={navVariants}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={`fixed left-1/2 transform -translate-x-1/2 z-50 ${isScrolled ? 'backdrop-blur-2xl' : ''}`}
    >
      <div className="w-full mx-auto flex items-center justify-between px-6 md:px-12 py-3">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={240}
            height={60}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Navigation Items */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors duration-300 hover:text-gradient whitespace-nowrap"
                style={{
                  color: isDark ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="ml-4">
              <ThemeToggle />
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-600'
                  } shadow-sm`}
                  aria-label="Toggle profile menu"
                >
                  <UserIcon size={16} />
                </button>
                {isProfileOpen && <ProfileDropDown />}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/sign-in">
                  <Button variant="primary" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="secondary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full shadow-lg py-4 rounded-b-2xl"
          style={{
            backgroundColor: isDark ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex flex-col items-center gap-6 px-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-lg font-medium transition-colors duration-300 hover:text-gradient"
                style={{
                  color: isDark ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-700 my-2" />
            {user ? (
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 text-lg font-medium"
                style={{
                  color: isDark ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
                }}
              >
                Sign Out
              </button>
            ) : (
              <div className="flex flex-col items-center gap-4 w-full">
                <Link href="/sign-in" className="w-full">
                  <Button variant="primary" size="md" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up" className="w-full">
                  <Button variant="secondary" size="md" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
