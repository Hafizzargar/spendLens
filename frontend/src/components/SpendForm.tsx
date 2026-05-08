"use client";

import React, { useState } from 'react';
import { ToolRow } from './ToolRow';
import { Plus, Calculator, Sparkles } from 'lucide-react';
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
      const response = await axios.post(`${apiUrl}/api/audit`, auditResults);
      onResults(response.data);
    } catch (error) {
      console.error("Failed to save audit:", error);
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
      className="max-w-2xl mx-auto glass-card p-8 md:p-10"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-sm font-bold text-foreground tracking-wide">
            Team Primary Focus
          </label>
          <select 
            value={useCase}
            onChange={(e) => setUseCase(e.target.value as any)}
            className="w-full bg-secondary/50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none font-medium"
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

        <div className="flex gap-4">
          <button
            type="button"
            onClick={addTool}
            className="flex-1 flex items-center justify-center gap-2 py-4 border-2 border-dashed border-muted-foreground/20 rounded-xl text-muted-foreground hover:border-primary hover:text-primary transition-all font-medium"
          >
            <Plus size={20} />
            Add Another Tool
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Sparkles className="animate-spin" size={20} />
            ) : (
              <>
                <Calculator size={20} />
                Run AI Audit
              </>
            )}
          </button>
        </div>
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
