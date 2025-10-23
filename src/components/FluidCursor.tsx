'use client';
import { useEffect } from 'react';
import fluidCursor from '@/hooks/use-FluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
      <canvas id="fluid" className="fixed top-0 left-0 w-full h-full z-50 pointer-events-none" />
    </div>
  );
};

export default FluidCursor;