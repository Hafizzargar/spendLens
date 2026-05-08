"use client";

import React from 'react';
import { AuditResult } from '@/types';
import { TrendingDown, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuditResultsProps {
  results: AuditResult;
}

export const AuditResults: React.FC<AuditResultsProps> = ({ results }) => {
  const actionText = {
    cancel: 'REMOVE',
    switch: 'CHANGE',
    consolidate: 'VOLUME DISCOUNT',
    keep: 'KEEP',
    merge: 'STANDARDIZE'
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Strategic Verdict - The "TL;DR" for the user */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary/30 border border-primary/20 p-6 rounded-2xl backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-lg font-black tracking-tight">The Strategic Verdict</h3>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Executive Summary</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground/80 leading-relaxed">
              Based on your <span className="font-bold text-primary">{results.tools.length > 0 ? results.tools[0].category : 'General'}</span> focus, your core "Power Stack" is optimized around <span className="font-bold">{results.tools.slice(0, 2).map(t => t.name).join(' and ')}</span>.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 w-fit px-2 py-1 rounded">
              <CheckCircle2 size={12} />
              PRIMARY TOOLS CONFIRMED
            </div>
          </div>
          <div className="border-l border-border pl-6 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Immediate Next Step</p>
            <p className="text-sm font-bold leading-snug">
              Do not cancel licenses. Instead, initiate <span className="text-primary">Enterprise Consolidation</span> for your 100+ seat subscriptions to unlock volume pricing.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Savings Card */}
        {results.potentialAnnualSavings > 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary text-primary-foreground p-5 rounded-2xl shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <TrendingDown size={80} />
            </div>
            <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider mb-1">Estimated Annual Savings</p>
            <h2 className="text-4xl font-black mb-2">
              ${results.potentialAnnualSavings.toLocaleString()}
            </h2>
            <div className="flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm text-sm">
              <Sparkles size={14} />
              <span className="font-bold">Est. ${results.potentialMonthlySavings.toLocaleString()} / month</span>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-600 text-white p-5 rounded-2xl shadow-xl relative overflow-hidden group flex flex-col justify-center"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <CheckCircle2 size={80} />
            </div>
            <h2 className="text-3xl font-black mb-2 relative z-10">Highly Optimized</h2>
            <p className="text-white/90 text-sm leading-snug relative z-10 max-w-[85%]">
              This configuration appears reasonably optimized for your team size. No immediate cost-saving actions required.
            </p>
          </motion.div>
        )}

        {/* Current Spend Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border p-5 rounded-2xl flex flex-col justify-center shadow-sm"
        >
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-1">Current Annual Spend</p>
          <h3 className="text-3xl font-bold text-foreground">
            ${results.totalAnnualSpend.toLocaleString()}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">Across your team subscriptions</p>
        </motion.div>
      </div>

      {/* AI Summary */}
      {results.aiSummary && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 rounded-xl"
        >
          <div className="flex items-center gap-2 text-primary mb-2">
            <Sparkles size={16} />
            <span className="font-bold uppercase tracking-widest text-[10px]">Gemini AI Analysis</span>
          </div>
          <p className="text-base italic leading-snug text-foreground/90">
            "{results.aiSummary}"
          </p>
        </motion.div>
      )}

      {/* Recommendations */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold px-1">Optimization Steps</h3>
        <div className="grid gap-2">
          {results.recommendations.map((rec, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-4 p-3 bg-card border border-border rounded-xl hover:shadow-md transition-all group"
            >
              <div className={`p-2 rounded-full ${
                rec.action === 'cancel' ? 'bg-red-100 text-red-600' : 
                rec.action === 'keep' ? 'bg-green-100 text-green-600' : 
                rec.action === 'merge' ? 'bg-amber-100 text-amber-600' : 
                'bg-blue-100 text-blue-600'
              }`}>
                {rec.action === 'cancel' ? <AlertCircle size={18} /> : 
                 rec.action === 'keep' ? <CheckCircle2 size={18} /> : 
                 rec.action === 'merge' ? <TrendingDown size={18} /> : 
                 <CheckCircle2 size={18} />}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-base">{rec.toolName}</span>
                  {(rec.action === 'keep' || rec.action === 'consolidate') && (
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-200">
                      PRIMARY PLATFORM
                    </span>
                  )}
                  {/* Purpose Badge - 100% AI Driven from Backend */}
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-blue-100">
                    BEST FOR {rec.purpose || 'AI WORKFLOWS'}
                  </span>
                  <ArrowRight size={14} className="text-muted-foreground" />
                  <span className="text-primary text-sm font-bold">{actionText[rec.action]}</span>
                </div>
                <div className="space-y-2 mt-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5 block">Reasoning</span>
                    <p className="text-sm text-foreground/90 leading-snug">{rec.message}</p>
                  </div>
                  
                  {rec.confidence && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5 block">Confidence Level</span>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${rec.confidence === 'High' ? 'bg-green-500' : rec.confidence === 'Medium' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                        <span className="text-xs font-medium text-foreground/80">{rec.confidence}</span>
                      </div>
                    </div>
                  )}

                  {rec.calculation && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5 block">Math Breakdown</span>
                      <p className="text-xs font-mono text-foreground/70 bg-secondary/50 inline-block px-2 py-1 rounded border border-border/50">
                        {rec.calculation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right whitespace-nowrap">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                  {rec.savings === 0 ? 'Status' : 'Est. Savings'}
                </p>
                <p className={`text-base font-bold ${rec.savings === 0 ? 'text-blue-600' : 'text-green-600'}`}>
                  {rec.savings === 0 ? 'OPTIMIZED' : `$${rec.savings}/mo`}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Financial Disclaimer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pt-6 pb-2 text-center"
      >
        <p className="text-[10px] text-muted-foreground leading-relaxed max-w-2xl mx-auto italic">
          <span className="font-bold uppercase tracking-widest mr-1">Assumptions:</span>
          Enterprise discounts vary by vendor and contract volume. Savings estimates are based on publicly available pricing, common procurement discount ranges, and departmental redundancy analysis.
        </p>
      </motion.div>
    </div>
  );
};
