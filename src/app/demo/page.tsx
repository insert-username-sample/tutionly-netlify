'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, MessageSquare, BookOpen, Calculator, PenTool, Upload, FileText, Mic, MicOff, PhoneOff, Users, Moon, Sun, Download, FileDown, NotebookPen, Camera } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import CustomSelect from '@/components/ui/CustomSelect';
import { useTheme, useLogo } from '@/contexts/ThemeContext';
import { TUTOR_PERSONALITIES, getTutorBySubject, getTopicsForSubject } from '@/lib/tutor-personalities';
import { getVapi } from '@/lib/vapi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '@/lib/firebase';
import { Auth } from 'firebase/auth';

const generateSessionNotes = (
  selectedSubject: string,
  selectedTopic: string,
  messages: Array<{id: string, sender: 'user' | 'ai', content: string, timestamp: string}>
) => {
  const tutor = getTutorBySubject(selectedSubject);
  const sessionDate = new Date().toLocaleDateString();
  const sessionTime = new Date().toLocaleTimeString();
  const sessionDuration = Math.floor(Math.random() * 30) + 10; // Mock session duration

  let notes = `# ${tutor.name} - Comprehensive Session Report\n`;
  notes += `**Date:** ${sessionDate}\n`;
  notes += `**Time:** ${sessionTime}\n`;
  notes += `**Duration:** ${sessionDuration} minutes\n`;
  notes += `**Subject:** ${tutor.subject.charAt(0).toUpperCase() + tutor.subject.slice(1)}\n`;
  notes += `**Topic:** ${selectedTopic || tutor.defaultTopic}\n`;
  notes += `**Tutor:** ${tutor.name} (${tutor.subject} Specialist)\n\n`;

  notes += `## 📊 Session Overview\n`;
  notes += `This interactive tutoring session with ${tutor.name} focused on ${selectedTopic || tutor.defaultTopic}.\n`;
  notes += `The session combined text-based learning activities, problem-solving exercises,\n`;
  notes += `and personalized AI tutoring to enhance understanding of ${tutor.subject} concepts.\n\n`;

  notes += `## 🎯 Learning Objectives\n`;
  notes += `- Understand and apply concepts from ${selectedTopic || tutor.defaultTopic}\n`;
  notes += `- Practice problem-solving techniques using AI-guided assistance\n`;
  notes += `- Receive personalized feedback on learning approaches\n`;
  notes += `- Build confidence through interactive learning experiences\n\n`;

  if (messages.length > 0) {
    notes += `## 💬 Discussion Summary\n`;
    const userMessages = messages.filter(m => m.sender === 'user');
    const aiMessages = messages.filter(m => m.sender === 'ai');

    notes += `**Questions Asked:** ${userMessages.length}\n`;
    notes += `**AI Responses:** ${aiMessages.length}\n\n`;

    notes += `### Key Discussion Points:\n`;
    messages.slice(-5).forEach((message, index) => {
      if (message.sender === 'user') {
        notes += `**Student Question (Q${index + 1}):** ${message.content}\n`;
      } else {
        notes += `**${tutor.name} Response:** ${message.content.slice(0, 100)}...\n`;
      }
    });
    notes += `\n`;

    notes += `### Communication Analysis:\n`;
    notes += `- Short, concise questions show focused learning approach\n`;
    notes += `- AI responses provided clear, structured explanations\n`;
    notes += `- Interactive back-and-forth conversation maintained engagement\n`;
    notes += `- Topic remained focused on ${selectedTopic || tutor.defaultTopic}\n\n`;
  }

  notes += `## 📚 Key Concepts Covered\n`;
  notes += `- Theoretical foundation of ${selectedTopic || tutor.defaultTopic}\n`;
  notes += `- Practical application and examples\n`;
  notes += `- Common problem-solving approaches\n`;
  notes += `- Verification and understanding checks\n\n`;

  notes += `## 📈 Learning Progress\n`;
  notes += `### Strengths Demonstrated:\n`;
  notes += `- Consistent engagement with learning material\n`;
  notes += `- Courage to ask questions when concepts are unclear\n`;
  notes += `- Willingness to explore different solution approaches\n`;
  notes += `- Good understanding of foundational concepts\n\n`;

  notes += `### Areas for Development:\n`;
  notes += `- ${tutor.subject === 'math' ? 'Mathematical: More practice with numerical calculations' : 'Conceptual: Deeper exploration of theoretical applications'}\n`;
  notes += `- Problem-solving efficiency can be improved\n`;
  notes += `- Practice with ${tutor.subject === 'math' ? 'algebraic manipulation' : 'conceptual connections'}\n\n`;

  notes += `## 🎓 Recommended Next Steps\n`;
  notes += `### Immediate Actions (This Week):\n`;
  notes += `1. Review all concepts discussed in today's session\n`;
  notes += `2. Complete 5-10 practice problems on ${selectedTopic || tutor.defaultTopic}\n`;
  notes += `3. Identify 2-3 specific questions for the next session\n`;
  notes += `4. Review practice problem solutions independently\n\n`;

  notes += `### Medium-Term Goals (Next 2 Weeks):\n`;
  notes += `1. Master all problem types covered in ${tutor.subject}\n`;
  notes += `2. Develop personal problem-solving strategies\n`;
  notes += `3. Build confidence in explaining solutions\n`;
  notes += `4. Apply concepts to real-world scenarios\n\n`;

  notes += `### Study Techniques Recommendations:\n`;
  notes += `- Use spaced repetition for better retention\n`;
  notes += `- Create visual mind maps of ${tutor.subject} connections\n`;
  notes += `- Practice explaining concepts to others (rubber duck debugging)\n`;
  notes += `- Maintain consistent daily learning schedule\n\n`;

  notes += `## 📊 Session Metrics\n`;
  notes += `- Total Messages: ${messages.length}\n`;
  notes += `- Questions Answered: ${messages.filter(m => m.sender === 'ai').length}\n`;
  notes += `- Learning Pace: ${sessionDuration > 20 ? 'Focused and thorough' : 'Effective and efficient'}\n`;
  notes += `- Topic Coverage: 95% of planned objectives addressed\n\n`;

  notes += `## ✍️ Personal Reflection\n`;
  notes += `This session provided valuable learning opportunities and demonstrated\n`;
  notes += `strong engagement with ${tutor.subject} material. The student shows curiosity\n`;
  notes += `and willingness to explore difficult concepts. Continued practice with\n`;
  notes += `the recommended exercises will build upon today's foundation.\n\n`;

  notes += `---\n`;
  notes += `*📝 Session Notes Generated by Tuitionly AI Learning Platform*\n`;
  notes += `*🎯 Focused on: ${selectedTopic || tutor.defaultTopic}*\n`;
  notes += `*👨‍🏫 Tutor: ${tutor.name}*\n`;
  notes += `*⏱️  Generated: ${new Date().toLocaleString()}*\n`;
  notes += `*AI-Powered Learning personalization activated*\n`;

  return notes;
};

const DemoPage: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { logoSrc, logoAlt } = useLogo();
  const auth = getAuth();
  useAuthState(auth as Auth);
  const vapi = getVapi();
  const [isDemoStarted, setIsDemoStarted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [userAudioLevels, setUserAudioLevels] = useState([4, 4, 4, 4, 4]);
  const [aiAudioLevels, setAiAudioLevels] = useState([4, 4, 4, 4, 4]);
  const [messages, setMessages] = useState<Array<{id: string, sender: 'user' | 'ai', content: string, timestamp: string}>>([]);
  const [activeTab, setActiveTab] = useState<'live' | 'homework'>('live');
  const [selectedSubject, setSelectedSubject] = useState('science');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [homeworkImage, setHomeworkImage] = useState<File | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasSentInitialTopic = useRef<boolean>(false);
  
  // Initialize default topic for selected subject
  useEffect(() => {
    if (!selectedTopic) {
      const topics = getTopicsForSubject(selectedSubject);
      setSelectedTopic(topics[0] || '');
    }
  }, [selectedSubject, selectedTopic]);

  // Send initial topic message when connecting
  useEffect(() => {
    if (isConnected && selectedTopic && !hasSentInitialTopic.current) {
      hasSentInitialTopic.current = true;
      // Send topic context to AI after 2-second buffer to prevent first word cutoff
      setTimeout(() => {
        vapi.send({
          type: 'add-message',
          message: {
            role: 'system',
            content: `I'm here to study about ${selectedTopic}. Please help me learn about this topic and provide explanations, examples, and practice questions related to ${selectedTopic}.`,
          },
        });
      }, 2000); // 2-second delay to prevent first word cutoff
    } else if (!isConnected) {
      hasSentInitialTopic.current = false; // Reset when disconnecting
    }
  }, [isConnected, selectedTopic, vapi]);
  
  // Whiteboard state
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTool, setDrawingTool] = useState<'pen' | 'calculator'>('pen');
  const [drawings, setDrawings] = useState<Array<{x: number, y: number, type: 'start' | 'draw'}>>([]);

  // Audio functions for satisfying join sounds
  const playJoinSound = () => {
    try {
      const audioContext = new (window.AudioContext || ((window as unknown) as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Create a pleasant ascending tone (user joining)
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime); // Start at 400Hz
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1); // Rise to 600Hz
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2); // Peak at 800Hz

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn('Could not play join sound:', error);
    }
  };

  // Scroll to bottom when new messages arrive, but only if user is already near the bottom
  useEffect(() => {
    const chatContainer = chatEndRef.current?.parentElement;
    if (chatContainer) {
      const { scrollHeight, scrollTop, clientHeight } = chatContainer;
      const isScrolledToBottom = scrollHeight - scrollTop <= clientHeight + 100; // 100px threshold
      if (isScrolledToBottom) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'user' as const,
      content: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);

    // Send to VAPI only if connected, otherwise simulate AI response
    try {
      if (isConnected) {
        // Send the selected topic to the assistant for context
        vapi.send({
          type: 'add-message',
          message: {
            role: 'system',
            content: `The user has selected the topic: ${selectedTopic}. ${chatInput}`
          }
        });
      } else {
        // Simulate AI response for text-only mode
        setTimeout(() => {
          const aiMessage = {
            id: Date.now().toString() + '-ai',
            sender: 'ai' as const,
            content: `That's a great question about ${selectedTopic}! I'll help you with that concepts. Could you tell me more details?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, aiMessage]);
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }

    setChatInput('');
  };

  const handleChatKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (drawingTool !== 'pen') return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDrawings(prev => [...prev, { x, y, type: 'start' }]);
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || drawingTool !== 'pen') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDrawings(prev => [...prev, { x, y, type: 'draw' }]);
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  
  const clearCanvas = () => {
    setDrawings([]);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  
  const submitToTutorly = () => {
    // Simulate sending drawing to AI for analysis
    const tutorName = getTutorBySubject(selectedSubject).name;
    alert(`Drawing submitted to ${tutorName} for analysis!`);
  };

  // Render drawings on canvas
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = isDark ? '#60A5FA' : '#3B82F6';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    let currentPath = false;
    drawings.forEach(point => {
      if (point.type === 'start') {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        currentPath = true;
      } else if (point.type === 'draw' && currentPath) {
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
    });
  }, [drawings, isDark]);

  // VAPI Integration
  useEffect(() => {
    const handleCallStart = () => {
      console.log('VAPI Call Started');
      setIsConnected(true);
      setIsConnecting(false);
      setIsMicOn(true);
    };

    const handleCallEnd = () => {
      console.log('VAPI Call Ended');
      setIsConnected(false);
      setIsMicOn(false);
      setIsUserSpeaking(false);
      setIsAISpeaking(false);
    };

    const handleSpeechStart = () => {
      console.log('User speech started');
      setIsUserSpeaking(true);
      const levels = Array.from({ length: 5 }, () => Math.random() * 60 + 20);
      setUserAudioLevels(levels);
    };

    const handleSpeechEnd = () => {
      console.log('User speech ended');
      setIsUserSpeaking(false);
      setUserAudioLevels([4, 4, 4, 4, 4]);
    };

    const handleVolumeLevel = (volume: number) => {
      console.log('User volume level:', volume);
      if (volume > 0.1) {
        setIsUserSpeaking(true);
        const newLevels = Array(5).fill(0).map(() => Math.random() * volume * 200);
        setUserAudioLevels(newLevels);
      } else {
        setIsUserSpeaking(false);
      }
    };

    const handleMessage = (message: Record<string, unknown>) => {
      console.log('VAPI Message:', message);
      if (message.type === 'conversation-update') {
        const conversation = message.conversation as Array<{ role: string; message?: string; content?: string }>;
        const lastMessage = conversation[conversation.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
          const content = lastMessage.message || lastMessage.content || '';
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: 'ai',
            content: content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);

          setIsAISpeaking(true);
          const duration = content.length * 50;
          const animateAI = () => {
            const levels = Array.from({ length: 5 }, () => Math.random() * 40 + 15);
            setAiAudioLevels(levels);
          };
          const aiInterval = setInterval(animateAI, 150);

          setTimeout(() => {
            clearInterval(aiInterval);
            setIsAISpeaking(false);
            setAiAudioLevels([4, 4, 4, 4, 4]);
          }, duration);
        }
      }
    };

    const handleError = (error: Error) => {
      console.warn('VAPI Error (handled):', error?.message || error);
      if (error?.message?.includes('critical') || error?.message?.includes('auth')) {
        setIsConnecting(false);
        setIsConnected(false);
      }
    };

    vapi.setCallbacks({
      onCallStart: handleCallStart,
      onCallEnd: handleCallEnd,
      onSpeechStart: handleSpeechStart,
      onSpeechEnd: handleSpeechEnd,
      onVolumeLevel: handleVolumeLevel,
      onMessage: handleMessage,
      onError: handleError,
    });

    return () => {
      vapi.stop();
    };
  }, [vapi]);

  const handleDisconnect = useCallback(() => {
    vapi.stop();
    setIsConnected(false);
    setIsMicOn(false);
    
    // Generate session notes
    const notes = generateSessionNotes(selectedSubject, selectedTopic, messages);
    setSessionNotes(notes);
    setShowNotes(true);
  }, [selectedSubject, selectedTopic, messages, vapi]);

  const handleConnectionToggle = useCallback(async () => {
    if (isConnected) {
      handleDisconnect();
    } else {
      setIsConnecting(true);
      try {
        const assistantIds: Record<string, string> = {
          math: 'f6ee185a-5dc0-4721-94a4-eba68acf525d',
          science: '9ad04ac3-2f32-4df1-a1ce-97925446bbd4',
          english: 'dddfa691-fbf2-46a6-b9e1-0dc1673718bb',
          history: '2ad69ce7-de9a-4ebb-90a4-f82bed3d2eea',
          coding: '4a8effac-25ed-4e46-8f2e-6d93c83b0a4f',
          'social science': '70e30427-dad5-4f04-98db-51ad374375ed',
          economics: '6b634bc3-7db2-4222-9183-77fa6d67f58e',
        };

        const assistantId = assistantIds[selectedSubject];

        // Start the VAPI call with the assistant ID
        const result = await vapi.start({ assistantId });

        // Send the selected topic to the assistant
        vapi.send({
          type: 'add-message',
          message: {
            role: 'system',
            content: `The user has selected the topic: ${selectedTopic}`,
          },
        });
        
        if (result.demo) {
          console.log('Running in demo mode due to connection issues');
        }
        if (!result.success) {
          throw new Error(`Failed to connect to assistant`);
        }
      } catch (error) {
        console.warn('Connection failed (gracefully handled):', error);
        setIsConnecting(false);
        
        // Only show alert for critical errors
        if (error instanceof Error && error.message.includes('critical')) {
          let errorMessage = `Failed to connect to the assistant.`;
          if (error.message.includes('microphone')) {
            errorMessage += ' Please allow microphone access and try again.';
          } else if (error.message.includes('network')) {
            errorMessage += ' Please check your internet connection.';
          } else {
            errorMessage += ` Error: ${error.message}`;
          }
          alert(errorMessage);
        }
      }
    }
  }, [isConnected, handleDisconnect, selectedSubject, selectedTopic, vapi]);

  // Effect to handle changing the tutor
  useEffect(() => {
    if (isConnected) {
      handleDisconnect();
      setTimeout(() => {
        handleConnectionToggle();
      }, 1000); // Wait a second before reconnecting
    }
  }, [selectedSubject, isConnected, handleDisconnect, handleConnectionToggle]);

  const handleMicToggle = () => {
    if (!isConnected) return;
    
    const newMicState = !isMicOn;
    setIsMicOn(newMicState);
    
    // Toggle mute in VAPI (note: VAPI mute is opposite of mic on)
    vapi.setMuted(!newMicState);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // Handle audio output muting - this would control speaker output
    // VAPI doesn't have built-in speaker mute, so this is local to the UI
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setHomeworkImage(file);
    }
  };

  const downloadNotes = () => {
    const blob = new Blob([sessionNotes], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tuitionly-session-notes-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const closeNotes = () => {
    setShowNotes(false);
    setSessionNotes('');
  };

  const handleCameraOpen = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleCameraClose = () => {
    setShowCamera(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageUrl = canvasRef.current.toDataURL('image/png');
        
        const newMessage = {
          id: Date.now().toString(),
          sender: 'user' as const,
          content: imageUrl,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, newMessage]);
        handleCameraClose();
      }
    }
  };


  if (!isDemoStarted) {
    return (
      <main
        className="min-h-screen transition-all duration-300 flex items-center justify-center"
        style={{
          backgroundColor: isDark ? 'var(--dark-bg)' : 'var(--light-bg)'
        }}
      >
        <GlassCard className="p-8 max-w-2xl w-full">
          <h2 className={`text-3xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Choose Your AI Tutor
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Subject Selector */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Subject
              </label>
              <CustomSelect
                value={selectedSubject}
                onChange={(value) => {
                  setSelectedSubject(value);
                  setSelectedTopic(''); // Reset topic when subject changes
                }}
                options={Object.entries(TUTOR_PERSONALITIES).map(([key, tutor]) => ({
                  value: key,
                  label: tutor.name,
                }))}
                isDark={isDark}
              />
            </div>

            {/* Topic Selector */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Topic
              </label>
              <CustomSelect
                value={selectedTopic}
                onChange={setSelectedTopic}
                options={getTopicsForSubject(selectedSubject).map((topic) => ({
                  value: topic,
                  label: topic,
                }))}
                isDark={isDark}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="primary" size="lg" onClick={() => setIsDemoStarted(true)}>
              Start Demo
            </Button>
          </div>
        </GlassCard>
      </main>
    );
  }

  return (
    <main 
      className="min-h-screen transition-all duration-300" 
      style={{ 
        backgroundColor: isDark ? 'var(--dark-bg)' : 'var(--light-bg)'
      }}
    >
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-6 xl:px-0 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft size={24} className={`transition-colors ${
              isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'
            }`} />
            <span className={`font-semibold ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Back to Home
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={240}
              height={60}
            />
            <h1 className="text-2xl font-bold text-gradient">
              Interactive Demo
            </h1>
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

      <div className="max-w-7xl mx-auto px-6 xl:px-0 pb-12">
        {/* Demo Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className={`flex p-2 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
            <button
              onClick={() => setActiveTab('live')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'live'
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : isDark 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Live Tutoring
            </button>
            <button
              onClick={() => setActiveTab('homework')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'homework'
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : isDark 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Homework Help
            </button>
          </div>
        </div>

        {/* Live Tutoring Demo */}
        {activeTab === 'live' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Main Video and Chat Container */}
              <div className="lg:col-span-3">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <GlassCard className="overflow-hidden h-full flex flex-col">
                      <div className="aspect-video bg-gradient-primary relative rounded-t-2xl">
                        {/* Interactive Connection Status */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {isConnecting ? (
                            <motion.div
                              className="flex flex-col items-center gap-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <motion.div
                                className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              <p className="text-white font-medium">Connecting to {getTutorBySubject(selectedSubject).name}...</p>
                            </motion.div>
                          ) : isConnected ? (
                            <motion.div
                              className="flex items-center gap-6"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              {/* Voice Animations - User and AI */}
                              <div className="flex items-center gap-6">
                                {/* User Voice Animation */}
                                <div className="flex flex-col items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    {userAudioLevels.map((level, i) => (
                                      <motion.div
                                        key={`user-${i}`}
                                        className={`w-1 rounded-full ${
                                          isUserSpeaking ? 'bg-blue-400' : 'bg-white/40'
                                        }`}
                                        style={{
                                          height: `${level}px`,
                                          minHeight: '4px',
                                          maxHeight: '20px'
                                        }}
                                        animate={{
                                          height: isUserSpeaking ? `${level}px` : '4px',
                                          opacity: isUserSpeaking ? 1 : 0.4
                                        }}
                                        transition={{
                                          duration: 0.1,
                                          ease: "easeInOut"
                                        }}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-white/80">You</span>
                                </div>

                                {/* Tutorly Voice Animation */}
                                <div className="flex flex-col items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    {aiAudioLevels.map((level, i) => (
                                      <motion.div
                                        key={`tutorly-${i}`}
                                        className={`w-1 rounded-full ${
                                          isAISpeaking ? 'bg-green-400' : 'bg-white/40'
                                        }`}
                                        style={{
                                          height: `${level}px`,
                                          minHeight: '4px',
                                          maxHeight: '20px'
                                        }}
                                        animate={{
                                          height: isAISpeaking ? `${level}px` : '4px',
                                          opacity: isAISpeaking ? 1 : 0.4
                                        }}
                                        transition={{
                                          duration: 0.1,
                                          ease: "easeInOut"
                                        }}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-white/80">Tutorly</span>
                                </div>
                              </div>
                              
                              {/* Connection Status */}
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-white font-medium">Connected</span>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              className="flex flex-col items-center gap-4 cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              onClick={() => {
                                // Play join sound when user joins
                                playJoinSound();
                                handleConnectionToggle();
                              }}
                            >
                              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
                                <Users size={32} className="text-white" />
                              </div>
                              <p className="text-white font-medium">Join Live Class</p>
                            </motion.div>
                          )}
                        </div>
                        
                        {/* Connection Status Overlay */}
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          {isConnected ? (
                            <>
                              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-white text-sm font-medium">CONNECTED</span>
                            </>
                          ) : isConnecting ? (
                            <>
                              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                              <span className="text-white text-sm font-medium">CONNECTING</span>
                            </>
                          ) : (
                            <>
                              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                              <span className="text-white text-sm font-medium">DISCONNECTED</span>
                            </>
                          )}
                        </div>
                        
                        {/* Tutor Info */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <BookOpen size={20} className="text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">{getTutorBySubject(selectedSubject).name}</p>
                            <p className="text-white/80 text-sm">{selectedTopic || getTutorBySubject(selectedSubject).defaultTopic}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Video Controls */}
                      <div className={`p-4 flex items-center justify-between ${
                        isDark ? 'bg-gray-800' : 'bg-gray-50'
                      }`}>
                        <div className="flex items-center gap-4">
                          {!isConnected ? (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={handleConnectionToggle}
                              disabled={isConnecting}
                            >
                              {isConnecting ? 'Connecting...' : 'Join Class'}
                            </Button>
                          ) : (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={handleDisconnect}
                              className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                              icon={<PhoneOff size={16} />}
                            >
                              End Session
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleMuteToggle}
                            icon={isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            className={isMuted ? 'text-red-500' : ''}
                          >
                            {isMuted ? 'Unmute' : 'Mute'}
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleMicToggle}
                          icon={isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
                          className={`transition-all duration-300 ${
                            isMicOn 
                              ? 'text-white bg-green-500 border-green-500' 
                              : 'text-gray-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                          } border`}
                            disabled={false}
                        >
                          <span>{isMicOn ? 'Mic On' : 'Mic Off'}</span>
                        </Button>
                      </div>
                      <div className="p-4 flex items-center justify-center gap-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleDisconnect}
                        >
                          Leave Session
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setIsDemoStarted(false)}
                        >
                          Change Subject
                        </Button>
                      </div>
                    </GlassCard>
                  </div>

                  {/* Chat Sidebar */}
                  <div className="lg:col-span-1 flex flex-col">
                    <GlassCard className="flex-grow flex flex-col h-full">
                      <div className={`p-4 border-b ${
                        isDark ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <h3 className={`font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          Live Chat
                        </h3>
                      </div>
                      
                      <div className="flex-1 p-4 overflow-y-auto">
                        {/* Chat messages */}
                        <div className="space-y-3">
                            {messages.length === 0 ? (
                              // Default welcome message when no real conversation
                              <div className="flex gap-3">
                                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-sm font-semibold">{getTutorBySubject(selectedSubject).name.charAt(0)}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                        <p className={`text-sm break-words ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          <strong>{getTutorBySubject(selectedSubject).name}:</strong> Hello! I'm {getTutorBySubject(selectedSubject).name}, your AI {selectedSubject} tutor. Click "Join Class" above to start a voice conversation, or type your questions here about {selectedTopic || getTutorBySubject(selectedSubject).defaultTopic}!
                        </p>
                                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Just now
                                  </span>
                                </div>
                              </div>
                            ) : (
                              // Real conversation messages
                              messages.map((message) => (
                                <div key={message.id} className="flex gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    message.sender === 'ai' ? 'bg-gradient-primary' : 'bg-blue-500'
                                  }`}>
                                    <span className="text-white text-sm font-semibold">
                                      {message.sender === 'ai' ? getTutorBySubject(selectedSubject).name.charAt(0) : 'Y'}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className={`text-sm break-words ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                      <strong>{message.sender === 'ai' ? getTutorBySubject(selectedSubject).name : 'You'}:</strong>
                                      {message.content.startsWith('data:image') ? (
                                        <Image src={message.content} alt="Captured" width={200} height={150} className="mt-2 rounded-lg" />
                                      ) : (
                                        ` ${message.content}`
                                      )}
                                    </div>
                                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                      {message.timestamp}
                                    </span>
                                  </div>
                                </div>
                              ))
                            )}
                          <div ref={chatEndRef} />
                        </div>
                      </div>
                      
                      <div className={`p-4 border-t ${
                        isDark ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyPress={handleChatKeyPress}
                            placeholder="Type your question..."
                            className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                              isDark 
                                ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                                : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                            } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            disabled={false}
                          />
                          <Button
                            variant="primary"
                            size="sm"
                            icon={<MessageSquare size={16} />}
                            onClick={sendMessage}
                            disabled={!chatInput.trim()}
                          >
                            Send
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<Camera size={16} />}
                            onClick={handleCameraOpen}
                            disabled={!isConnected}
                          >
                            {''}
                          </Button>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </div>

              {/* Interactive Whiteboard */}
              <div className="lg:col-span-3">
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-semibold text-lg ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Interactive Whiteboard
                    </h3>
                    <div className="flex gap-2">
                      <Button 
                        variant={drawingTool === 'pen' ? 'primary' : 'ghost'} 
                        size="sm" 
                        icon={<PenTool size={16} />}
                        onClick={() => setDrawingTool('pen')}
                      >
                        Draw
                      </Button>
                      <Button 
                        variant={drawingTool === 'calculator' ? 'primary' : 'ghost'} 
                        size="sm" 
                        icon={<Calculator size={16} />}
                        onClick={() => setDrawingTool('calculator')}
                      >
                        Calculator
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearCanvas}
                        className="text-red-500 hover:text-red-600"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                  
                  <div className={`relative h-64 rounded-xl border-2 ${
                    isDark ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-white'
                  } overflow-hidden`}>
                    <canvas
                      ref={canvasRef}
                      width={800}
                      height={256}
                      className={`absolute inset-0 w-full h-full cursor-${
                        drawingTool === 'pen' ? 'crosshair' : 'pointer'
                      }`}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                    
                    {drawings.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                          <PenTool size={48} className={`mx-auto mb-4 ${
                            isDark ? 'text-gray-500' : 'text-gray-400'
                          }`} />
                          <p className={`${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {drawingTool === 'pen' 
                              ? 'Click and drag to draw. Share your work with Math Tutorly!' 
                              : 'Calculator mode - Click to add math expressions'
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {drawings.length > 0 && (
                    <div className="mt-4 flex gap-2 justify-center">
                      <Button variant="primary" onClick={submitToTutorly}>
                        Ask {getTutorBySubject(selectedSubject).name.split(' ')[0]} Tutorly to Help
                      </Button>
                      <Button variant="secondary">
                        Save Drawing
                      </Button>
                    </div>
                  )}
                </GlassCard>
              </div>
            </div>
          </motion.div>
        )}

        {/* Homework Help Demo */}
        {activeTab === 'homework' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <GlassCard className="p-8">
              <div className="text-center mb-8">
                <h2 className={`text-3xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  AI Homework Assistant
                </h2>
                <p className={`text-lg ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Upload your homework and get instant step-by-step solutions
                </p>
              </div>

              {/* Upload Area */}
              <div className={`border-2 border-dashed rounded-2xl p-8 text-center mb-6 transition-colors ${
                isDark 
                  ? 'border-gray-600 hover:border-gray-500 bg-gray-800/30' 
                  : 'border-gray-300 hover:border-gray-400 bg-gray-50'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="homework-upload"
                />
                <label htmlFor="homework-upload" className="cursor-pointer">
                  <Upload size={48} className={`mx-auto mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <p className={`text-lg font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {homeworkImage ? homeworkImage.name : 'Upload your homework'}
                  </p>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Support for images, PDFs, and handwritten notes
                  </p>
                </label>
              </div>

              {/* Sample Solution */}
              {homeworkImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className={`p-6 rounded-xl ${
                    isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
                  }`}>
                    <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      <FileText size={20} />
                      AI Analysis Results
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className={`font-medium mb-2 ${
                          isDark ? 'text-green-400' : 'text-green-600'
                        }`}>
                          Problem Identified:
                        </h4>
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Quadratic equation: x² - 5x + 6 = 0
                        </p>
                      </div>
                      
                      <div>
                        <h4 className={`font-medium mb-2 ${
                          isDark ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          Step-by-Step Solution:
                        </h4>
                        <ol className={`list-decimal list-inside space-y-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          <li>Identify coefficients: a = 1, b = -5, c = 6</li>
                          <li>Use factoring method: (x - 2)(x - 3) = 0</li>
                          <li>Solve for x: x = 2 or x = 3</li>
                          <li>Verify solutions by substitution</li>
                        </ol>
                      </div>
                      
                      <div className="flex gap-4 pt-4">
                        <Button variant="primary" size="sm">
                          Get Detailed Explanation
                        </Button>
                        <Button variant="secondary" size="sm">
                          Practice Similar Problems
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        )}

        {/* Camera Modal */}
        {showCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCameraClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`max-w-4xl w-full rounded-2xl overflow-hidden ${
                isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
              } shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <video ref={videoRef} autoPlay className="w-full rounded-lg" />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              <div className="p-6 flex justify-center">
                <Button variant="primary" size="lg" onClick={handleCapture}>
                  Capture
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Session Notes Modal */}
        {showNotes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeNotes}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden ${
                isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
              } shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`p-6 border-b ${
                isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <NotebookPen size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        Session Notes Generated
                      </h3>
                      <p className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Your learning session with {getTutorBySubject(selectedSubject).name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={downloadNotes}
                      icon={<Download size={16} />}
                    >
                      Download Notes
                    </Button>
                    <button
                      onClick={closeNotes}
                      className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className={`prose max-w-none ${
                  isDark ? 'prose-invert' : ''
                }`}>
                  <div className={`whitespace-pre-wrap font-mono text-sm leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {sessionNotes}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className={`p-6 border-t ${
                isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileDown size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                    <span className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Notes will be saved as Markdown format
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={closeNotes}
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={downloadNotes}
                      icon={<Download size={16} />}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default DemoPage;
