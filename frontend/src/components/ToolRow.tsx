"use client";

import React from 'react';
import { AI_TOOLS } from '@/lib/pricingData';
import { Trash2 } from 'lucide-react';

interface ToolRowProps {
  index: number;
  selectedToolId: string;
  seats: number;
  customName?: string;
  customPrice?: number;
  selectedToolIds: string[];
  onUpdate: (index: number, data: { toolId?: string, seats?: number, customName?: string, customPrice?: number }) => void;
  onRemove: (index: number) => void;
}

export const ToolRow: React.FC<ToolRowProps> = ({ index, selectedToolId, seats, customName, customPrice, selectedToolIds, onUpdate, onRemove }) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-secondary/50 rounded-xl transition-all hover:bg-secondary">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">
            AI Tool
          </label>
          <select 
            value={selectedToolId}
            onChange={(e) => onUpdate(index, { toolId: e.target.value })}
            className="w-full bg-transparent border-none focus:ring-0 text-lg font-semibold cursor-pointer"
          >
            <option value="">Select a tool...</option>
            {AI_TOOLS.map(tool => {
              const isAlreadySelected = selectedToolIds.includes(tool.id) && tool.id !== selectedToolId;
              return (
                <option key={tool.id} value={tool.id} disabled={isAlreadySelected}>
                  {tool.name} (${tool.price}/mo) {isAlreadySelected ? '(Already Added)' : ''}
                </option>
              );
            })}
            <option value="custom">+ Add Custom / Unknown AI</option>
          </select>
        </div>

        <div className="w-24">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">
            Seats
          </label>
          <input 
            type="number" 
            min="1"
            value={seats}
            onChange={(e) => onUpdate(index, { seats: parseInt(e.target.value) || 1 })}
            className="w-full bg-transparent border-none focus:ring-0 text-lg font-semibold"
          />
        </div>

        <button 
          type="button"
          onClick={() => onRemove(index)}
          className="p-2 text-muted-foreground hover:text-destructive transition-colors mt-5"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Custom Tool Fields */}
      {selectedToolId === 'custom' && (
        <div className="flex gap-4 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2">
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">
              Custom Tool Name
            </label>
            <input 
              type="text" 
              placeholder="e.g. Midjourney Pro"
              value={customName || ''}
              onChange={(e) => onUpdate(index, { customName: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>
          <div className="w-32">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">
              Price/Mo ($)
            </label>
            <input 
              type="number" 
              min="0"
              placeholder="0"
              value={customPrice || ''}
              onChange={(e) => onUpdate(index, { customPrice: parseInt(e.target.value) || 0 })}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>
        </div>
      )}
    </div>
  );
};
