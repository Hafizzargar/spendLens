import { AuditInput, AuditResult, Recommendation } from '../types';
import { AI_TOOLS } from './pricingData';
import { v4 as uuidv4 } from 'uuid';

export const calculateAudit = (input: AuditInput): AuditResult => {
  let totalMonthlySpend = 0;
  const recommendations: Recommendation[] = [];

  // Map tool IDs to input data for easy lookup with type safety
  const userTools = input.tools.map(t => {
    const toolData = AI_TOOLS.find(at => at.id === t.toolId);
    const price = t.toolId === 'custom' ? (t.customPrice || 0) : (toolData?.price || 0);
    
    return {
      ...t,
      name: t.toolId === 'custom' ? (t.customName || 'Custom Tool') : (toolData?.name || 'AI Tool'),
      category: toolData?.category || 'other',
      actualPrice: price,
      volumeDiscount: toolData?.volumeDiscount,
      id: toolData?.id || `custom-${Math.random().toString(36).substr(2, 9)}`
    };
  });

  userTools.forEach(t => {
    totalMonthlySpend += t.actualPrice * t.seats;
  });

  // Check for chatbot redundancy
  const chatbots = userTools.filter(t => t.category === 'chatbot');
  if (chatbots.length > 1) {
    const mostExpensive = [...chatbots].sort((a, b) => b.actualPrice - a.actualPrice)[0];
    const others = chatbots.filter(c => c.id !== mostExpensive.id);
    
    // Use Case Override: Engineers often need both Claude and ChatGPT for API testing/cross-checking
    const isEngineeringOverride = input.useCase === 'engineering' || input.useCase === 'mixed';

    if (isEngineeringOverride) {
      chatbots.forEach(c => {
        recommendations.push({
          toolId: c.toolId,
          toolName: c.name || 'AI Tool',
          action: 'keep',
          message: `Engineering teams require ${c.name} for critical model-benchmarking and API integration testing. Standardizing here would hinder developer agility.`,
          savings: 0,
          confidence: 'High'
        });
      });
    } else {
      const contextPrefix = input.useCase === 'marketing' 
        ? 'Marketing teams often have overlapping writing and research workflows' 
        : 'Your team currently pays for overlapping general-purpose chat assistants';

      others.forEach(other => {
        recommendations.push({
          toolId: other.toolId,
          toolName: other.name || 'AI Tool',
          action: 'merge',
          message: `${contextPrefix}. Standardizing on one primary assistant could reduce duplicate spend without impacting productivity.`,
          savings: other.actualPrice * other.seats,
          calculation: `${other.seats} seats × $${other.actualPrice}/mo = $${other.actualPrice * other.seats}/mo`,
          confidence: 'High'
        });
      });
    }
  }

  // Check for coding tool redundancy
  const codingTools = userTools.filter(t => t.category === 'coding');
  if (codingTools.length > 1) {
    const primary = codingTools[0];
    const secondary = codingTools.slice(1);
    secondary.forEach(s => {
      recommendations.push({
        toolId: s.toolId,
        toolName: s.name || 'AI Tool',
        action: 'merge',
        message: `Your team currently pays for overlapping AI coding assistants. Standardizing on a single engineering platform could reduce duplicate licensing costs.`,
        savings: s.actualPrice * s.seats,
        calculation: `${s.seats} seats × $${s.actualPrice}/mo = $${s.actualPrice * s.seats}/mo`,
        confidence: 'High'
      });
    });
  }

  // General "Expensive Writing Tool" check
  const expensiveWriting = userTools.filter(t => t.category === 'writing' && t.actualPrice > 30);
  expensiveWriting.forEach(w => {
    // Use Case Override: Marketing teams actually need the specialized templates in tools like Copy.ai/Jasper
    if (input.useCase === 'marketing') {
      recommendations.push({
        toolId: w.toolId,
        toolName: w.name || 'AI Tool',
        action: 'keep',
        message: `While ${w.name} is a premium tool, marketing teams derive high ROI from its specialized brand-voice templates. Justifiable expense.`,
        savings: 0,
        confidence: 'High'
      });
    } else {
      const contextSuffix = 'may cover a significant portion of your current writing workflows';

      recommendations.push({
        toolId: w.toolId,
        toolName: w.name || 'AI Tool',
        action: 'switch',
        message: `${w.name} is a premium tool. Standard models like ChatGPT Plus or Claude Pro ${contextSuffix} at a fraction of the cost.`,
        savings: (w.actualPrice - 20) * w.seats,
        calculation: `${w.seats} seats × ($${w.actualPrice} - $20 alternative) = $${(w.actualPrice - 20) * w.seats}/mo`,
        confidence: 'Medium',
        alternative: { name: 'ChatGPT Plus', price: 20 }
      });
    }
  });

  // ==========================================
  // DETERMINISTIC ENTERPRISE SCALING LOGIC
  // ==========================================
  // Check if an individual subscription is being used by a large team
  userTools.forEach(t => {
    if (t.seats >= 10 && t.actualPrice >= 10) {
      const discount = t.volumeDiscount || 0.15; // Default to 15% if not specified
      const estimatedEnterprisePrice = t.actualPrice * (1 - discount);
      const savings = (t.actualPrice - estimatedEnterprisePrice) * t.seats;
      
      // Prevent duplicate recommendations if we already suggested switching this tool.
      // However, if the tool was merely marked as 'keep' by a use-case override, replace it with the volume discount advice.
      const existingIndex = recommendations.findIndex(r => r.toolId === t.toolId);
      const existing = existingIndex !== -1 ? recommendations[existingIndex] : null;

      if (!existing || existing.action === 'keep') {
        const categoryContext = t.category === 'chatbot' ? 'enterprise-wide chat assistants' : 
                                t.category === 'coding' ? 'specialized engineering licenses' : 
                                'team-wide AI subscriptions';

        const volumeRec = {
          toolId: t.toolId,
          toolName: t.name || 'AI Tool',
          action: 'consolidate' as const,
          message: `You are currently paying for ${t.seats} individual ${t.name} licenses. Transitioning to an Enterprise contract for these ${categoryContext} would unlock a projected ${discount * 100}% volume discount and better security controls.`,
          savings: Math.round(savings),
          calculation: `${t.seats} seats × ${discount * 100}% volume discount on $${t.actualPrice} = $${Math.round(savings)}/mo`,
          confidence: 'Medium' as const
        };

        if (existing && existing.action === 'keep') {
          recommendations[existingIndex] = volumeRec;
        } else {
          recommendations.push(volumeRec);
        }
      }
    }
  });

  // ==========================================
  // PERFECTLY OPTIMIZED TOOLS (KEEP)
  // ==========================================
  userTools.forEach(t => {
    // If there is no existing recommendation for this tool, it means it passed the audit!
    if (!recommendations.find(r => r.toolId === t.toolId)) {
      recommendations.push({
        toolId: t.toolId,
        toolName: t.name || 'AI Tool',
        action: 'keep',
        message: `This tool is appropriately priced and scaled for your team. No changes needed.`,
        savings: 0,
        confidence: 'High'
      });
    }
  });

  const potentialMonthlySavings = recommendations.reduce((sum, r) => sum + r.savings, 0);

  return {
    id: uuidv4(),
    totalMonthlySpend,
    totalAnnualSpend: totalMonthlySpend * 12,
    potentialMonthlySavings,
    potentialAnnualSavings: potentialMonthlySavings * 12,
    recommendations,
    tools: userTools,
    createdAt: new Date()
  };
};
