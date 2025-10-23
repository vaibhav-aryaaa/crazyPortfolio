'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface WelcomeModalProps {
  trigger?: React.ReactNode;
}

export default function WelcomeModal({ trigger }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const defaultTrigger = (
    <Button
      variant="ghost"
      className="h-auto w-auto cursor-pointer rounded-2xl bg-white/30 p-3 shadow-lg backdrop-blur-lg hover:bg-white/60"
      onClick={() => setIsOpen(true)}
    >
      <Image
        src="/logo-vaibhav.svg"
        width={100}
        height={100}
        alt="Logo"
        className="w-6 md:w-8"
      />
      <span className="sr-only">About Vaibhav</span>
    </Button>
  );

  const handleContactMe = () => {
    setIsOpen(false);
    window.location.href = '/chat?query=How%20can%20I%20contact%20you%3F';
  };

  return (
    <>
      {trigger ? (
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
      ) : (
        defaultTrigger
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white dark:bg-zinc-900 z-50 max-h-[85vh] overflow-auto rounded-3xl border-none p-0 shadow-2xl sm:max-w-[90vw] md:max-w-[800px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-full flex-col"
          >
            {/* Header */}
            <DialogHeader className="relative flex flex-row items-start justify-between px-6 pt-6 pb-4">
              <div>
                <DialogTitle className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                  Crazy Portfolio
                </DialogTitle>
                <DialogDescription className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
                  Your personalized portfolio experience.
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black p-2 text-white hover:bg-black/80"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogHeader>

            {/* Content */}
            <div className="space-y-6 px-6 py-4">
              <section className="space-y-6 rounded-2xl bg-zinc-100 dark:bg-zinc-800 p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                    What's so special????
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    So basically this <strong>crazy Portfolio</strong>
                    is a simple accessible one.<br />
                    
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                    Why ???
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Traditional portfolios can be limiting.<br />
                    They can't adapt to every visitor’s specific needs.<br />
                    My portfolio becomes <strong>exactly what you're interested in knowing about me and my work</strong>.
                  </p>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center gap-4 px-6 pb-6">
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] rounded-full px-5 py-3 text-base transition-colors duration-200"
              >
                Start Chatting
              </Button>

              <div
                className="cursor-pointer text-center text-sm text-muted-foreground hover:underline"
                onClick={handleContactMe}
              >
                If you love it, please share it! Feedback is always welcome.{' '}
                <span className="text-blue-500">Contact me.</span>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}