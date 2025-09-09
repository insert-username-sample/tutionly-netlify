'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, User, Camera } from 'lucide-react';
import Whiteboard from './ui/Whiteboard';
import { useTheme } from '@/contexts/ThemeContext';
import Button from './ui/Button';

interface ChatMessage {
  sender: 'tutor' | 'user';
  text: string;
  image?: string;
  attachment?: 'whiteboard';
}

interface ImageContent {
  type: 'image';
  src: string;
  alt: string;
}

interface WhiteboardContent {
  type: 'whiteboard';
}

interface TextContent {
  type: 'text';
  title: string;
  points: string[];
}

type SubjectContent = ImageContent | WhiteboardContent | TextContent;

interface Subject {
  name: string;
  topic: string;
  tutor: string;
  content: SubjectContent;
  chat: ChatMessage[];
}

const subjects: Subject[] = [
  {
    name: 'Science',
    topic: 'Chemical Structure of H2O',
    tutor: 'Science Tutorly',
    content: {
        type: 'text',
        title: 'Notes on H2O',
        points: ['Two hydrogen atoms, one oxygen atom.', 'Covalent bonds hold the atoms together.', 'The molecule has a bent shape.'],
    },
    chat: [
      { sender: 'user', text: 'What do the bonds in an H2O molecule look like?' },
      { sender: 'tutor', text: "Great question! Here's a simple diagram of the covalent bonds.", attachment: 'whiteboard' },
    ],
  },
  {
    name: 'History',
    topic: 'The American Revolution',
    tutor: 'History Tutorly',
    content: {
      type: 'text',
      title: 'Key Events of the American Revolution',
      points: ['Boston Tea Party', 'Declaration of Independence', 'Battle of Yorktown'],
    },
    chat: [
      { sender: 'tutor', text: "Welcome! I'm History Tutorly. Let's dive into the American Revolution." },
      { sender: 'user', text: 'What was the main cause of the revolution?' },
      { sender: 'tutor', text: 'The primary cause was colonial opposition to British attempts to assert greater control over the colonies.' },
    ],
  },
  {
    name: 'Economics',
    topic: 'Supply and Demand',
    tutor: 'Economics Tutorly',
    content: {
      type: 'text',
      title: 'Core Concepts of Supply and Demand',
      points: ['Law of Demand', 'Law of Supply', 'Market Equilibrium'],
    },
    chat: [
      { sender: 'tutor', text: "Welcome! Let's explore the fundamentals of supply and demand." },
      { sender: 'user', text: 'What happens when demand exceeds supply?' },
      { sender: 'tutor', text: 'That leads to a shortage, which typically causes prices to rise.' },
    ],
  },
];

const LiveSessionMockUI = () => {
  const { isDark } = useTheme();
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<'user' | 'tutor' | 'none'>('none');

  useEffect(() => {
    const speakerInterval = setInterval(() => {
      setActiveSpeaker('tutor');
      setTimeout(() => {
        setActiveSpeaker('none');
      }, 2000);
    }, 7000);
    return () => clearInterval(speakerInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubjectIndex((prevIndex) => (prevIndex + 1) % subjects.length);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleNextSubject = () => {
    setCurrentSubjectIndex((prevIndex) => (prevIndex + 1) % subjects.length);
  };

  const currentSubject = subjects[currentSubjectIndex];

  const renderContent = () => {
    if (!currentSubject) {
      return null;
    }
    const { content, name } = currentSubject;
    const isHistory = name === 'History';
    const isEconomics = name === 'Economics';
    const containerClass = isHistory || isEconomics ? (isDark ? "bg-gray-800" : "bg-gray-200") : "bg-gradient-to-br from-blue-500 to-purple-600";
    
    switch (content.type) {
      case 'image':
        return <div className={`${containerClass} w-full h-full`}><Image src={content.src} alt={content.alt} layout="fill" objectFit="contain" /></div>;
      case 'text':
        return (
          <div className={`${containerClass} ${(isHistory || isEconomics) && !isDark ? 'text-black' : 'text-white'} p-4 w-full h-full flex flex-col justify-center items-center`}>
            <h3 className="text-2xl font-bold mb-4">{content.title}</h3>
            <div className="w-full text-center">
              <ul className="list-disc list-inside text-lg inline-block text-left">
                {content.points.map((point, index) => (
                  <li key={index} className="mb-2">{point}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      default:
        return (
            <div className="flex flex-col items-center justify-center h-full text-white">
                <div className="p-4 bg-white/10 rounded-full mb-4">
                    <User size={40} />
                </div>
                <p className="text-lg">Join Live Class</p>
            </div>
        );
    }
  };

  return (
    <div className={`flex w-full h-full gap-4 p-4 rounded-2xl ${isDark ? 'bg-gray-900/30' : 'bg-white/30'} backdrop-blur-xl`}>
      {/* Left Side: Live Session */}
      <div className="flex-grow flex flex-col rounded-2xl overflow-hidden">
        <div className="relative flex-grow min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentSubject && (
            <motion.div
              key={currentSubject.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              {renderContent()}
            </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute top-4 left-4 bg-gray-700/50 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            CONNECTED
          </div>
        </div>
        <div className={`${isDark ? 'bg-gray-800/50' : 'bg-gray-200/50'} p-4 flex justify-between items-center`}>
          <div className="flex items-center">
                <span className={`${isDark ? 'text-white' : 'text-black'}`}>{currentSubject?.tutor}</span>
                <div className="flex items-end h-4 ml-2 space-x-1">
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 rounded-full bg-blue-500"
                            animate={{ height: activeSpeaker === 'tutor' ? ['4px', '12px', '6px', '4px'] : '2px' }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                        />
                    ))}
                </div>
            </div>
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => setIsMuted(!isMuted)} className={`${isDark ? 'text-white' : 'text-black'}`}>
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <span className={`${isDark ? 'text-white' : 'text-black'}`}>Mic On</span>
          </div>
        </div>
        <div className={`${isDark ? 'bg-gray-800/50' : 'bg-gray-200/50'} border-t ${isDark ? 'border-gray-700/50' : 'border-gray-300/50'} px-4 py-3 flex justify-center items-center`}>
            <Button variant="secondary" size="sm" onClick={() => {}} className="border-gray-500">
                Leave Session
            </Button>
            <Button variant="primary" size="sm" onClick={handleNextSubject} className="ml-4 bg-gradient-to-r from-blue-500 to-purple-600">
                Change Tutorly
            </Button>
        </div>
      </div>

      {/* Right Side: Live Chat */}
      <div className={`w-1/3 rounded-2xl flex flex-col p-4 ${isDark ? 'bg-gray-800/50' : 'bg-gray-200/50'}`}>
        <h3 className={`${isDark ? 'text-white' : 'text-black'} text-lg font-bold mb-4`}>Live Chat</h3>
        <div className="flex-grow space-y-4 overflow-y-auto pr-2">
          {currentSubject?.chat.map((message, index) => (
            <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
              {message.sender === 'tutor' && (
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {currentSubject.name.charAt(0)}
                </div>
              )}
              <div className={`max-w-xs text-sm p-3 rounded-xl ${message.sender === 'tutor' ? (isDark ? 'bg-gray-700' : 'bg-gray-300') : 'bg-blue-600'} ${isDark ? 'text-white' : 'text-black'}`}>
                <p className="font-bold">{message.sender === 'tutor' ? currentSubject.tutor : 'You'}</p>
                <p>{message.text}</p>
                {message.image && <Image src={message.image} alt="chat image" width={200} height={150} className="rounded-md mt-2" />}
                {message.attachment === 'whiteboard' && (
                  <div className="mt-2 p-2 border rounded-lg">
                    <Whiteboard subject="Science" isAttachment={true} />
                  </div>
                )}
                <p className="text-xs opacity-70 mt-1">{message.attachment === 'whiteboard' ? 'Used Whiteboard:' : 'Just now'}</p>
              </div>
              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white flex-shrink-0">
                  <User size={18} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={`mt-4 relative flex items-center rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}>
          <input type="text" placeholder="Type your question..." className={`w-full bg-transparent ${isDark ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-500'} text-sm p-3 focus:outline-none`} />
          <div className="flex items-center gap-2 pr-2">
            <button className="text-white text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1.5 rounded-lg">Send</button>
            <button className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
              <Camera size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionMockUI;
