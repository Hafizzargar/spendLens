export interface AITool {
  id: string;
  name: string;
  category: 'chatbot' | 'coding' | 'image' | 'writing' | 'marketing' | 'other';
  price: number;
  billing: 'monthly' | 'annually';
  alternatives?: string[];
  description?: string;
  pricingSource?: string;
  volumeDiscount?: number; // e.g. 0.15 for 15%
}

export interface AuditInput {
  useCase: 'engineering' | 'marketing' | 'mixed' | 'general';
  tools: {
    toolId: string;
    seats: number;
    customName?: string;
    customPrice?: number;
  }[];
}

export interface AuditResult {
  id: string;
  useCase: 'engineering' | 'marketing' | 'mixed' | 'general';
  totalMonthlySpend: number;
  totalAnnualSpend: number;
  potentialMonthlySavings: number;
  potentialAnnualSavings: number;
  recommendations: Recommendation[];
  tools: any[];
  aiSummary?: string;
  createdAt: Date;
}

export interface Recommendation {
  toolId: string;
  toolName: string;
  action: 'cancel' | 'switch' | 'consolidate' | 'keep' | 'merge';
  message: string;
  purpose?: string;
  savings: number;
  calculation?: string; // e.g. "10 seats × ($49 - $20) = $290/month"
  confidence?: 'High' | 'Medium' | 'Low';
  alternative?: {
    name: string;
    price: number;
  };
}

export interface Lead {
  email: string;
  auditId: string;
  companyName?: string;
  savingsPotential: number;
}
