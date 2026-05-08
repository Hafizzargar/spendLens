"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Search, Calculator, ShieldCheck, FileText } from 'lucide-react';

export const IntelligentLoader = () => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    { text: "Initializing AI Research Engine...", icon: <Sparkles size={18} /> },
    { text: "Searching for 2024 Market Benchmarks...", icon: <Search size={18} /> },
    { text: "Analyzing Vendor Redundancies...", icon: <Brain size={18} /> },
    { text: "Calculating Multi-seat Volume Discounts...", icon: <Calculator size={18} /> },
    { text: "Drafting Executive Savings Verdict...", icon: <ShieldCheck size={18} /> },
    { text: "Finalizing your Audit Report...", icon: <FileText size={18} /> },
  ];

  useEffect(() => {
    // Progress bar simulation (0 to 95% over 15 seconds)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 95) return prev + 1;
        return prev;
      });
    }, 150); // Approximately 15 seconds to hit 95%

    // Status message rotation
    const statusInterval = setInterval(() => {
      setStatusIndex(prev => (prev + 1) % statuses.length);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 space-y-10 w-full max-w-lg mx-auto text-center">
      {/* Percentage Display */}
      <div className="relative">
        <motion.div 
          key={progress}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl font-black text-primary/20 absolute -top-12 left-1/2 -translate-x-1/2 select-none"
        >
          {progress}%
        </motion.div>
        
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary relative z-10 shadow-lg shadow-primary/5">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Sparkles size={40} />
          </motion.div>
        </div>
      </div>

      <div className="space-y-4 w-full">
        <h2 className="text-3xl font-black tracking-tight text-foreground">
          Deep Auditing...
        </h2>
        
        {/* Progress Bar Container */}
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden border border-border/50">
          <motion.div 
            className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Status Messages */}
        <div className="h-8 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={statusIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-center gap-2 text-muted-foreground font-medium"
            >
              <span className="text-primary">{statuses[statusIndex].icon}</span>
              {statuses[statusIndex].text}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="pt-4 grid grid-cols-3 gap-8 w-full max-w-xs opacity-40 grayscale">
        <div className="flex flex-col items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Research</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary animate-ping [animation-delay:0.2s]" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Verify</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary animate-ping [animation-delay:0.4s]" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Audit</span>
        </div>
      </div>
    </div>
  );
};
