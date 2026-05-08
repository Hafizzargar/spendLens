"use client";

import React from 'react';
import { ExternalLink, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const CredexCTA: React.FC = () => {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-black text-white p-4 rounded-2xl overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] -mr-16 -mt-16" />
      
      <div className="relative z-10 space-y-3">
        <div className="flex items-center gap-1.5 text-primary">
          <Zap size={14} fill="currentColor" />
          <span className="font-bold uppercase tracking-widest text-[10px]">Unlock Discounts</span>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-lg font-bold">Scaling AI adoption?</h3>
          <p className="text-gray-400 text-xs leading-snug">
            Credex helps high-growth startups get up to <strong>30% off</strong> enterprise AI subscriptions and API credits. 
          </p>
        </div>

        <a 
          href="https://credex.ai/consultation" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full gap-1.5 bg-primary text-primary-foreground px-4 py-2 text-sm rounded-lg font-bold hover:bg-primary/90 transition-colors"
        >
          Book a Consultation
          <ExternalLink size={14} />
        </a>
        
        <p className="text-[10px] text-gray-500 text-center">Trusted by 500+ Engineering Managers</p>
      </div>
    </motion.div>
  );
};
