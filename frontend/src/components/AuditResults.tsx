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
    <div className="space-y-3 max-w-5xl mx-auto">
      {/* Strategic Verdict - The "TL;DR" for the user */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-secondary/50 to-background border border-primary/20 p-6 rounded-2xl backdrop-blur-sm shadow-inner"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary shadow-sm">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="text-base font-black tracking-tight text-foreground">The Strategic Verdict</h3>
            <p className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.2em]">Executive Summary</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground/90 leading-tight">
              Your <span className="font-bold text-primary capitalize">{results.useCase || 'General'}</span> stack is optimized around <span className="font-bold">{results.tools.slice(0, 2).map(t => t.name).join(' & ')}</span>.
            </p>
            <div className="flex items-center gap-2 text-[8px] font-black text-green-700 bg-green-500/10 border border-green-500/20 w-fit px-2 py-1 rounded-full uppercase tracking-wider">
              <CheckCircle2 size={10} />
              Stack Verified
            </div>
          </div>
          <div className="md:border-l border-border md:pl-4 space-y-1">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Next Step</p>
            <p className="text-sm font-bold leading-tight text-foreground">
              {results.potentialAnnualSavings > 1000 
                ? <>Initiate <span className="text-primary underline decoration-primary/30 underline-offset-2">Enterprise Consolidation</span> for your subscriptions.</>
                : <>Maintain configuration. Your stack is <span className="text-primary underline decoration-primary/30 underline-offset-2">High-Efficiency</span>.</>
              }
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Savings Card */}
        {results.potentialAnnualSavings > 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary text-primary-foreground p-3 rounded-xl shadow-lg relative overflow-hidden group"
          >
            <p className="text-primary-foreground/80 text-[10px] font-bold uppercase tracking-wider mb-0.5">Annual Savings</p>
            <h2 className="text-2xl font-black">
              ${results.potentialAnnualSavings.toLocaleString()}
            </h2>
            <div className="text-[10px] font-bold opacity-80 flex items-center gap-1">
              <Sparkles size={10} /> Est. ${results.potentialMonthlySavings}/mo
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-600 text-white p-3 rounded-xl shadow-lg relative overflow-hidden"
          >
            <h2 className="text-xl font-black">Optimized</h2>
            <p className="text-[10px] opacity-90 leading-tight">No immediate saving actions required.</p>
          </motion.div>
        )}

        {/* Current Spend Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border p-3 rounded-xl shadow-sm"
        >
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mb-0.5">Current Spend</p>
          <h3 className="text-2xl font-bold text-foreground">
            ${results.totalAnnualSpend.toLocaleString()}
          </h3>
          <p className="text-[10px] text-muted-foreground leading-none">Annual estimate</p>
        </motion.div>

        {/* AI Summary Compact */}
        {results.aiSummary && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary/20 p-3 rounded-xl border border-border/50"
          >
            <div className="flex items-center gap-1 text-primary mb-1">
              <Sparkles size={12} />
              <span className="font-bold uppercase tracking-widest text-[8px]">AI Analysis</span>
            </div>
            <p className="text-[11px] leading-tight text-foreground/80 line-clamp-3">
              "{results.aiSummary}"
            </p>
          </motion.div>
        )}
      </div>

      {/* Recommendations */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold px-1 uppercase tracking-widest text-muted-foreground/70">Optimization Steps</h3>
        <div className="grid md:grid-cols-2 gap-2">
          {results.recommendations.map((rec, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="flex items-start gap-3 p-2.5 bg-card border border-border rounded-xl hover:shadow-sm transition-all relative overflow-hidden"
            >
              <div className={`mt-1 p-1.5 rounded-lg ${
                rec.action === 'cancel' ? 'bg-red-50 text-red-600' : 
                rec.action === 'keep' ? 'bg-green-50 text-green-600' : 
                'bg-blue-50 text-blue-600'
              }`}>
                {rec.action === 'cancel' ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="truncate pr-2">
                    <span className="font-bold text-sm block truncate">{rec.toolName}</span>
                    <span className="text-primary text-[10px] font-black uppercase tracking-wider">{actionText[rec.action]}</span>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${rec.savings === 0 ? 'text-blue-600' : 'text-green-600'}`}>
                      {rec.savings === 0 ? 'OPTIMIZED' : `$${rec.savings}/mo`}
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-foreground/70 leading-tight line-clamp-3 mb-2">{rec.message}</p>
                
                <div className="flex items-center gap-3">
                   {rec.confidence && (
                      <div className="flex items-center gap-1">
                        <div className="relative flex h-1.5 w-1.5">
                          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${rec.confidence === 'High' ? 'bg-green-500' : rec.confidence === 'Medium' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                        </div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase">{rec.confidence}</span>
                      </div>
                    )}
                    {rec.calculation && (
                      <span className="text-[9px] font-mono text-muted-foreground bg-secondary/30 px-1.5 py-0.5 rounded border border-border/30">
                        {rec.calculation}
                      </span>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Monthly Budget Impact - The "Bottom Line" */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-primary/5 border border-primary/10 rounded-xl p-3 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex-1 min-w-[120px]">
          <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">Total Monthly Budget</p>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-foreground">${results.totalMonthlySpend.toLocaleString()}</span>
            <ArrowRight size={12} className="text-muted-foreground" />
            <span className="text-lg font-black text-primary">${(results.totalMonthlySpend - results.potentialMonthlySavings).toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-lg shadow-sm">
          <TrendingDown size={14} />
          <div className="text-right">
            <p className="text-[8px] font-black uppercase tracking-widest opacity-80 leading-none mb-0.5">Monthly Savings</p>
            <p className="text-sm font-black leading-none">${results.potentialMonthlySavings.toLocaleString()}</p>
          </div>
        </div>
      </motion.div>

      {/* Financial Disclaimer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-2 text-center"
      >
        <p className="text-[8px] text-muted-foreground leading-tight max-w-2xl mx-auto italic">
          <span className="font-bold uppercase tracking-widest mr-1">Assumptions:</span>
          Estimates based on public pricing and common departmental redundancy benchmarks.
        </p>
      </motion.div>
    </div>
  );
};
