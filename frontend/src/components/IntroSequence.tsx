"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BrainCircuit, TrendingDown } from 'lucide-react';

const steps = [
  {
    icon: <Search size={48} className="text-primary" />,
    title: "1. Map Your Stack",
    subtitle: "Tell us what AI tools your team uses."
  },
  {
    icon: <BrainCircuit size={48} className="text-primary" />,
    title: "2. We Analyze",
    subtitle: "Our engine finds redundancies and better pricing."
  },
  {
    icon: <TrendingDown size={48} className="text-primary" />,
    title: "3. You Save",
    subtitle: "Cut your AI spend by up to 30% instantly."
  }
];

export const IntroSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1200); // Show each step for 1.2s
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 400); // Brief pause before hiding
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full max-w-md text-center">
        <AnimatePresence mode="wait">
          {currentStep < steps.length && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="p-6 bg-primary/10 rounded-3xl">
                {steps[currentStep].icon}
              </div>
              <div>
                <h2 className="text-4xl font-black text-foreground mb-2 tracking-tight">
                  {steps[currentStep].title}
                </h2>
                <p className="text-xl text-muted-foreground font-medium">
                  {steps[currentStep].subtitle}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Progress Bar */}
        <div className="absolute -bottom-24 left-0 right-0 flex justify-center gap-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= currentStep ? 'w-8 bg-primary' : 'w-4 bg-border'}`} 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
