import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = ['Trade', 'Swap', 'Share'];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [showCaption, setShowCaption] = useState(false);
  const [cycleComplete, setCycleComplete] = useState(false);

  useEffect(() => {
    const cyclingInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev === WORDS.length - 1) {
          clearInterval(cyclingInterval);
          setCycleComplete(true);
          setTimeout(() => setShowCaption(true), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(cyclingInterval);
  }, []);

  
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="text-center">
        {!cycleComplete ? (
          <div className="h-32 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center"
              >
                <span className="text-7xl md:text-9xl font-black text-red-500 tracking-tight">XF</span>
                <span className="text-7xl md:text-9xl font-black text-white tracking-tight ml-4">{WORDS[index]}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="h-32 flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-7xl md:text-9xl font-black tracking-tight"
            >
              <span className="text-red-500">XF</span>
              <span className="text-white">Terminal</span>
              <span className="text-red-500">.</span>
            </motion.h1>
          </div>
        )}

        <AnimatePresence>
          {showCaption && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8 text-2xl md:text-3xl text-gray-400 font-light tracking-wide"
            >
              XFTerminal Trade Anywhere.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
