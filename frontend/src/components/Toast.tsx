"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-6 right-6 z-[100] min-w-[300px] max-w-md"
        >
          <div className="glass-card p-4 rounded-xl shadow-2xl border border-white/20 flex items-start gap-3 bg-white/80 backdrop-blur-md">
            <div className={`p-1.5 rounded-full ${
              type === 'error' ? 'bg-red-100 text-red-600' : 
              type === 'success' ? 'bg-green-100 text-green-600' : 
              'bg-blue-100 text-blue-600'
            }`}>
              {type === 'error' ? <AlertCircle size={18} /> : 
               type === 'success' ? <CheckCircle2 size={18} /> : 
               <AlertCircle size={18} />}
            </div>
            
            <div className="flex-1 pt-0.5">
              <p className="text-sm font-bold text-foreground leading-tight">
                {type === 'error' ? 'Attention Required' : type === 'success' ? 'Success' : 'Notification'}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {message}
              </p>
            </div>

            <button 
              onClick={onClose}
              className="p-1 hover:bg-black/5 rounded-md transition-colors text-muted-foreground"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Subtle progress bar */}
          <motion.div 
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className={`h-1 absolute bottom-0 left-0 rounded-b-xl ${
              type === 'error' ? 'bg-red-500' : 
              type === 'success' ? 'bg-green-500' : 
              'bg-blue-500'
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
