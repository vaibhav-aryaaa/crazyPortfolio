// src/components/chat/HelperBoost.tsx
'use client';

import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp,
  CircleEllipsis,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
} from 'lucide-react';
import { useState } from 'react';

// The props have changed. We now pass a function to set the view.
interface HelperBoostProps {
  setView: (view: 'Me' | 'Projects' | 'Skills' | 'Fun' | 'Contact' | 'More') => void;
}

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
];

export default function HelperBoost({ setView }: HelperBoostProps) {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-center">
        <button
          onClick={toggleVisibility}
          className="flex items-center gap-1 px-3 py-1 text-xs text-gray-500 transition-colors hover:text-gray-700"
        >
          {isVisible ? (
            <>
              <ChevronDown size={14} />
              Hide quick options
            </>
          ) : (
            <>
              <ChevronUp size={14} />
              Show quick options
            </>
          )}
        </button>
      </div>

      {isVisible && (
        <div className="w-full">
          <div
            className="flex w-full flex-wrap gap-1 md:gap-3"
            style={{ justifyContent: 'safe center' }}
          >
            {questionConfig.map(({ key, color, icon: Icon }) => (
              <motion.button
                key={key}
                // The onClick now calls setView directly with the key
                onClick={() => setView(key as any)}
                className="h-auto min-w-[100px] flex-shrink-0 cursor-pointer rounded-2xl border border-white/20 bg-black/5 p-3 backdrop-blur-lg transition-colors hover:bg-black/10 active:scale-95 dark:bg-white/5 dark:hover:bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-200">
                  <Icon size={18} strokeWidth={2} color={color} />
                  <span className="text-sm font-medium">{key}</span>
                </div>
              </motion.button>
            ))}
             {/* <motion.button
                onClick={() => alert("More button clicked!")} // Or open a drawer
                className="h-auto cursor-pointer rounded-2xl border border-white/20 bg-black/5 p-3 backdrop-blur-lg transition-colors hover:bg-black/10 active:scale-95 dark:bg-white/5 dark:hover:bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
             >
                <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-200">
                    <CircleEllipsis className="h-[20px] w-[18px]" strokeWidth={2} />
                </div>
             </motion.button> */}
          </div>
        </div>
      )}
    </div>
  );
}