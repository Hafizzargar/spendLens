"use client";

import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface LeadCaptureProps {
  auditId: string;
  savingsPotential: number;
}

export const LeadCapture: React.FC<LeadCaptureProps> = ({ auditId, savingsPotential }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
      await axios.post(`${apiUrl}/api/lead`, {
        email,
        auditId,
        savingsPotential
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Lead capture failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 p-4 rounded-2xl text-center space-y-2">
        <div className="mx-auto w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <CheckCircle size={20} />
        </div>
        <h3 className="text-lg font-bold text-green-900">Audit Sent!</h3>
        <p className="text-sm text-green-700">Check your inbox for the full PDF report and optimization guide.</p>
      </div>
    );
  }

  return (
    <div className="bg-secondary/20 border border-border p-4 rounded-2xl space-y-3">
      <div className="space-y-1">
        <h3 className="text-lg font-bold">Email My Full Report</h3>
        <p className="text-xs text-muted-foreground">Get a detailed breakdown and alternative tool recommendations sent to your inbox.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input 
            type="email" 
            required
            placeholder="Work email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-background"
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="bg-foreground text-background px-4 py-2 text-sm rounded-lg font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-1.5"
        >
          {loading ? "Sending..." : "Send Report"}
          {!loading && <Send size={14} />}
        </button>
      </form>
    </div>
  );
};
