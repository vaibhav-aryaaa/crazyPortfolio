// src/components/chat/chat.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

// --- IMPORTS FOR THE INFO BUTTON ---
import WelcomeModal from '@/components/welcome-modal';
import { Info } from 'lucide-react';

import ChatBottombar from '@/components/chat/chat-bottombar';
import ChatLanding from '@/components/chat/chat-landing';
import HelperBoost from './HelperBoost';

import Skills from '@/components/skills';
import { Contact } from '@/components/contact';
import Projects from '@/components/projects/AllProjects';
import Presentation from '@/components/presentation';
import Crazy from '@/components/crazy';
import { ChatMessage } from './chatmessage';

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  if (!hasMounted) return null;
  return <>{children}</>;
};

interface AvatarProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isTalking: boolean;
}

const Avatar = dynamic<AvatarProps>(
  () =>
    Promise.resolve(({ videoRef, isTalking }) => {
      useEffect(() => {
        if (videoRef.current) {
          if (isTalking) {
            videoRef.current.play().catch(e => console.error("Video play error", e));
          } else {
            videoRef.current.pause();
          }
        }
      }, [isTalking, videoRef]);

      const isIOS = () => {
        if (typeof window === 'undefined') return false;
        const ua = navigator.userAgent;
        const platform = navigator.platform;
        return /iPad|iPhone|iPod/.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      };

      return (
        <div className="flex items-center justify-center rounded-full transition-all duration-300 h-28 w-28">
          <div className="relative cursor-pointer" onClick={() => (window.location.href = '/')}>
            {isIOS() ? (
              <img src="/landing-memojis.png" alt="iOS avatar" className="h-full w-full scale-[1.8] object-contain" />
            ) : (
              <video ref={videoRef} className="h-full w-full scale-[1.8] object-contain" muted playsInline loop>
                <source src="/final_memojis.webm" type="video/webm" />
                <source src="/final_memojis_ios.mp4" type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      );
    }),
  { ssr: false }
);

const MOTION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

const views = {
  Skills: <Skills />,
  Contact: <Contact />,
  Projects: <Projects />,
  Me: <Presentation />,
  Fun: <Crazy />,
};

type ViewKey = keyof typeof views | 'landing' | 'chat';

const ChatPage = () => {
  const [activeView, setActiveView] = useState<ViewKey>('landing');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query');
  const initialView = searchParams.get('view');
  const [autoSubmitted, setAutoSubmitted] = useState(false);

  const { messages, input, handleInputChange, handleSubmit: originalHandleSubmit, isLoading, append } = useChat({
      api: '/api/chat',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    originalHandleSubmit(e);
    setActiveView('chat');
  };
  
  const submitQuery = useCallback((query: string) => {
    if (!query.trim()) return;
    append({ role: 'user', content: query });
    setActiveView('chat');
  }, [append]);

  useEffect(() => {
    if (autoSubmitted) return;

    if (initialQuery) {
      setAutoSubmitted(true);
      submitQuery(initialQuery);
    } else if (initialView) {
      setAutoSubmitted(true);
      setActiveView(initialView as ViewKey);
    }
  }, [initialQuery, initialView, autoSubmitted, submitQuery]);

  const renderView = () => {
    switch(activeView) {
      case 'landing':
        return <ChatLanding submitQuery={(query) => {
          if (query.toLowerCase().includes('skills')) setActiveView('Skills');
          if (query.toLowerCase().includes('contact')) setActiveView('Contact');
          if (query.toLowerCase().includes('projects')) setActiveView('Projects');
        }} />;
      
      case 'chat':
        return (
          <div className="space-y-4 pb-4">
            {messages.map((m, index) => (
              <ChatMessage key={index} message={m} />
            ))}
             {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === 'user' && (
              <ChatMessage
                message={{
                  id: 'loading',
                  role: 'assistant',
                  content: '...',
                }}
              />
            )}
          </div>
        );

      default:
        return views[activeView];
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* --- ADDING THE INFO BUTTON BACK HERE --- */}
      <div className="absolute top-6 right-6 z-50">
        <WelcomeModal
          trigger={
            <div className="hover:bg-accent bg-background transition-colors duration-200 ease-in-out cursor-pointer rounded-full p-2 shadow-md dark:bg-neutral-800 dark:hover:bg-neutral-700">
              <Info className="text-accent-foreground h-5 w-5" />
            </div>
          }
        />
      </div>

       <div className="fixed top-0 right-0 left-0 z-10" style={{ pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)' }}>
          <div className="py-6">
              <div className="flex justify-center" style={{ pointerEvents: 'auto' }}>
                  <ClientOnly>
                    <Avatar videoRef={videoRef} isTalking={isLoading} />
                  </ClientOnly>
              </div>
          </div>
       </div>

      <div className="container mx-auto flex h-full max-w-3xl flex-col">
        <div className="flex-1 overflow-y-auto px-2 pt-[180px]">
          <motion.div key={activeView} {...MOTION_CONFIG}>
            {renderView()}
          </motion.div>
        </div>

        <div className="sticky bottom-0 bg-transparent px-2 pt-3 md:px-0 md:pb-4">
          <div className="relative flex flex-col items-center gap-3">
            <HelperBoost setView={setActiveView} submitQuery={submitQuery} />
            <ChatBottombar
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={() => {}}
              isToolInProgress={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;