"use client";

import React, { useState } from 'react';
import { ToolRow } from './ToolRow';
import { Plus, Calculator, Sparkles, RotateCcw } from 'lucide-react';
import { calculateAudit } from '@/lib/auditEngine';
import { AuditResult } from '@/types';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Toast, ToastType } from './Toast';

interface SpendFormProps {
  onResults: (results: AuditResult) => void;
  onLoading?: (loading: boolean) => void;
}

export const SpendForm: React.FC<SpendFormProps> = ({ onResults, onLoading }) => {
  const [tools, setTools] = useState([
    { toolId: '', seats: 1, customName: '', customPrice: 0 },
    { toolId: '', seats: 1, customName: '', customPrice: 0 }
  ]);
  const [useCase, setUseCase] = useState<'engineering' | 'marketing' | 'mixed' | 'general'>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: ToastType }>({
    isVisible: false,
    message: '',
    type: 'info'
  });

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ isVisible: true, message, type });
  };

  const addTool = () => setTools([...tools, { toolId: '', seats: 1, customName: '', customPrice: 0 }]);
  
  const updateTool = (index: number, data: { toolId?: string, seats?: number, customName?: string, customPrice?: number }) => {
    const newTools = [...tools];
    newTools[index] = { ...newTools[index], ...data };
    setTools(newTools);
  };

  const removeTool = (index: number) => {
    // Mandate at least 2 rows
    if (tools.length > 2) {
      setTools(tools.filter((_, i) => i !== index));
    }
  };

  const resetForm = () => {
    setTools([
      { toolId: '', seats: 1, customName: '', customPrice: 0 },
      { toolId: '', seats: 1, customName: '', customPrice: 0 }
    ]);
    setUseCase('general');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out incomplete rows
    const validTools = tools.filter(t => t.toolId !== '');
    
    if (validTools.length < 2) {
      showToast("Please select at least two AI tools to run the audit.", "error");
      return;
    }

    setIsLoading(true);
    if (onLoading) onLoading(true);

    const auditResults = calculateAudit({ useCase, tools: validTools });

    try {
      // Save to backend
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      console.log("📡 Attempting to connect to Backend at:", apiUrl);
      const response = await axios.post(`${apiUrl}/api/audit`, auditResults, { timeout: 60000 });
      onResults(response.data);
    } catch (error) {
      console.error("❌ Failed to save audit to backend:", error);
      // Fallback to local results if backend is down
      onResults(auditResults);
    } finally {
      setIsLoading(false);
      if (onLoading) onLoading(false);
    }
  };

  return (
    <>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto glass-card p-6 md:p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1 mb-2">
          <label className="text-sm font-bold text-foreground tracking-wide">
            Team Primary Focus
          </label>
          <select 
            value={useCase}
            onChange={(e) => setUseCase(e.target.value as any)}
            className="w-full bg-secondary/40 border border-border/50 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none font-bold text-sm transition-all appearance-none cursor-pointer"
          >
            <option value="general">General Business (Operations, Sales, HR)</option>
            <option value="engineering">Engineering & Product Development</option>
            <option value="marketing">Marketing & Content Creation</option>
            <option value="mixed">Mixed / Cross-functional</option>
          </select>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <ToolRow 
                  index={index}
                  selectedToolId={tool.toolId}
                  seats={tool.seats}
                  customName={tool.customName}
                  customPrice={tool.customPrice}
                  onUpdate={updateTool}
                  onRemove={removeTool}
                  selectedToolIds={tools.map(t => t.toolId).filter(id => id !== '')}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.01, backgroundColor: 'rgba(var(--secondary), 0.8)' }}
            whileTap={{ scale: 0.99 }}
            type="button"
            onClick={addTool}
            className="md:col-span-2 flex items-center justify-center gap-2 py-4 bg-secondary/40 border border-border/50 rounded-xl text-muted-foreground hover:text-foreground transition-all font-bold text-sm shadow-sm"
          >
            <Plus size={18} />
            Add Another Tool
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            onClick={resetForm}
            className="flex items-center justify-center gap-2 py-4 bg-red-500/5 border border-red-500/10 rounded-xl text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-all font-bold text-sm shadow-sm"
            title="Clear Form"
          >
            <RotateCcw size={18} />
            Clear
          </motion.button>
        </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            {isLoading ? (
              <Sparkles className="animate-spin" size={20} />
            ) : (
              <>
                <Calculator size={20} />
                Run AI Audit
              </>
            )}
          </button>
      </form>
    </motion.div>
    
    <Toast 
      isVisible={toast.isVisible}
      message={toast.message}
      type={toast.type}
      onClose={() => setToast({ ...toast, isVisible: false })}
    />
    </>
  );
};
