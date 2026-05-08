"use client";

import React, { useState } from 'react';
import { SpendForm } from '@/components/SpendForm';
import { AuditResults } from '@/components/AuditResults';
import { LeadCapture } from '@/components/LeadCapture';
import { CredexCTA } from '@/components/CredexCTA';
import { AuditResult } from '@/types';
import { ShieldCheck, BarChart3, Coins, Sparkles, ArrowLeft, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { IntroSequence } from '@/components/IntroSequence';
import { IntelligentLoader } from '@/components/IntelligentLoader';

export default function Home() {
  const [results, setResults] = useState<AuditResult | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    // Check session storage immediately on mount to prevent flashing
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
    setIsReady(true);
  }, []);

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  const handleReset = () => {
    setResults(null);
    setFormKey(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-background bg-dot-pattern">
      <AnimatePresence>
        {showIntro && <IntroSequence onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Ambient Glow Elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />


      {/* Header */}
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <BarChart3 size={18} />
          </div>
          SPENDLENS
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#" className="hover:text-foreground transition-colors">Pricing Data</a>
          <motion.a 
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
            href="https://credex.ai" 
            className="bg-secondary/80 text-foreground px-5 py-2.5 rounded-xl font-bold text-xs border border-border/50 hover:bg-secondary hover:shadow-md transition-all uppercase tracking-wider"
          >
            Back to Credex
          </motion.a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-4 pb-2 text-center space-y-4 hero-gradient">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold"
        >
          <Sparkles size={16} />
          AI SPEND AUDIT v2.0
        </motion.div>
        
        <div className="space-y-2 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-foreground">
            Stop overpaying for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary animate-gradient-x">AI Subscriptions.</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Audit your stack in 60 seconds. Identify redundancies and cut spend by up to 30%.
          </p>
        </div>

        {!results && (
          <div className="flex flex-wrap justify-center gap-6 pt-4 pb-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="text-primary" size={20} />
              <span className="text-sm font-medium">Privacy Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BarChart3 className="text-primary" size={20} />
              <span className="text-sm font-medium">Real-time Benchmarks</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Coins className="text-primary" size={20} />
              <span className="text-sm font-medium">Instant ROI Calculation</span>
            </div>
          </div>
        )}
      </section>

      {/* Audit Workflow */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="space-y-16">
          <SpendForm 
            key={formKey} 
            onResults={(data) => {
              setResults(data);
              setIsGenerating(false);
              setShowModal(true);
            }} 
            onLoading={(loading) => {
              setIsGenerating(loading);
              if (loading) setShowModal(true);
            }} 
          />
          
          <AnimatePresence>
            {results && !showModal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LeadCapture auditId={results.id} savingsPotential={results.potentialAnnualSavings} />
                  <CredexCTA />
                </div>
                
                <div className="text-center pt-4">
                  <button 
                    onClick={() => setShowModal(true)}
                    className="text-primary hover:text-primary/80 font-bold underline underline-offset-4 mr-6"
                  >
                    View Full Audit Report
                  </button>
                  <button 
                    onClick={handleReset}
                    className="text-muted-foreground hover:text-destructive underline underline-offset-4 text-sm font-medium transition-colors"
                  >
                    Clear form and start fresh
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showModal && (isGenerating || results) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-background/80 backdrop-blur-sm"
              >
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="w-full max-w-6xl max-h-[95vh] overflow-y-auto bg-card border border-border shadow-2xl rounded-2xl relative"
                >
                  {isGenerating ? (
                    <IntelligentLoader />
                  ) : results && (
                    <div className="p-4 md:p-6 space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <h2 className="text-xl font-bold">Audit Complete</h2>
                        <div className="flex items-center gap-2">
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              handleReset();
                              setShowModal(false);
                            }}
                            className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-600 transition-all px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-100 rounded-full shadow-sm"
                          >
                            <RotateCcw size={14} />
                            Reset
                          </motion.button>
                          
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowModal(false)}
                            className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-all px-4 py-2 bg-secondary/50 hover:bg-secondary border border-border/50 rounded-full shadow-sm"
                          >
                            <ArrowLeft size={14} />
                            Close & Edit Stack
                          </motion.button>
                        </div>
                      </div>

                      <AuditResults results={results} />
                      

                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm text-muted-foreground">
            © 2026 SpendLens by Credex. All rights reserved.
          </div>
          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="#" className="hover:text-foreground">Contact Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
