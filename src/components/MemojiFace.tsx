// components/MemojiFace.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function MemojiFace() {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 10; // adjust sensitivity
      const y = ((e.clientY / innerHeight) - 0.5) * 10;
      setEyePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-64 h-64 mx-auto">
      <Image
        src="/landing-memojis.png"
        alt="Memoji"
        fill
        className="object-contain"
        priority
      />
      {/* Left Eye */}
      <div
        className="absolute left-[78px] top-[90px] w-[18px] h-[18px] bg-black rounded-full"
        style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
      />
      {/* Right Eye */}
      <div
        className="absolute left-[132px] top-[90px] w-[18px] h-[18px] bg-black rounded-full"
        style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
      />
    </div>
  );
}