'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Whiteboard from './ui/Whiteboard';

interface ChatMessage {
  sender: 'tutor' | 'user';
  text: string;
  image?: string;
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
    name: 'Math',
    topic: 'Solving Quadratic Equations',
    tutor: 'Math Tutorly',
    content: {
      type: 'whiteboard',
    },
    chat: [
      { sender: 'tutor', text: "Can you help me out with this?", image: '/image.png' },
      { sender: 'user', text: 'Okay, where do we start?' },
      { sender: 'tutor', text: 'First, we need to find the discriminant.' },
    ],
  },
  {
    name: 'Science',
    topic: 'Chemical Structure of H2O',
    tutor: 'Science Tutorly',
    content: {
      type: 'whiteboard',
    },
    chat: [
      { sender: 'tutor', text: "Welcome to our science session! Today we're looking at H2O." },
      { sender: 'user', text: 'What are those lines between the atoms?' },
      { sender: 'tutor', text: 'Those represent covalent bonds.' },
    ],
  },
  {
    name: 'History',
    topic: 'The Renaissance Period',
    tutor: 'History Tutorly',
    content: {
      type: 'text',
      title: 'Key Renaissance Figures',
      points: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Donatello'],
    },
    chat: [
      { sender: 'tutor', text: 'The Renaissance was a pivotal period in history. Any questions?' },
      { sender: 'user', text: 'Who was the most famous artist?' },
      { sender: 'tutor', text: 'That is subjective, but Leonardo da Vinci is a strong candidate.' },
    ],
  },
];

const SessionContent = () => {
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubjectIndex((prevIndex) => (prevIndex + 1) % subjects.length);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const currentSubject = subjects[currentSubjectIndex];

  const renderContent = () => {
    const { content, name } = currentSubject;
    switch (content.type) {
      case 'image':
        return <Image src={content.src} alt={content.alt} layout="fill" objectFit="contain" />;
      case 'whiteboard':
        return <Whiteboard subject={name as 'Math' | 'Science' | 'History'} />;
      case 'text':
        return (
          <div className="text-white p-4 w-full h-full flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">{content.title}</h3>
            <ul className="list-disc list-inside text-lg">
              {content.points.map((point, index) => (
                <li key={index} className="mb-2">{point}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default SessionContent;
