import { AITool } from '../types';

export const AI_TOOLS: AITool[] = [
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    category: 'chatbot',
    price: 20,
    billing: 'monthly',
    alternatives: ['claude-pro', 'poe'],
    description: 'Individual subscription for GPT-4 access.',
    volumeDiscount: 0.15
  },
  {
    id: 'claude-pro',
    name: 'Claude Pro',
    category: 'chatbot',
    price: 20,
    billing: 'monthly',
    alternatives: ['chatgpt-plus', 'poe'],
    description: 'Anthropic\'s premium chatbot.',
    volumeDiscount: 0.20
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot Individual',
    category: 'coding',
    price: 10,
    billing: 'monthly',
    alternatives: ['cursor', 'codeium'],
    description: 'AI pair programmer.'
  },
  {
    id: 'github-copilot-business',
    name: 'GitHub Copilot Business',
    category: 'coding',
    price: 19,
    billing: 'monthly',
    alternatives: ['cursor-business'],
    description: 'Enterprise AI pair programmer.',
    volumeDiscount: 0.10
  },
  {
    id: 'midjourney-basic',
    name: 'Midjourney Basic',
    category: 'image',
    price: 10,
    billing: 'monthly',
    description: 'AI image generation.'
  },
  {
    id: 'midjourney-standard',
    name: 'Midjourney Standard',
    category: 'image',
    price: 30,
    billing: 'monthly',
    description: 'AI image generation with more fast hours.'
  },
  {
    id: 'perplexity-pro',
    name: 'Perplexity Pro',
    category: 'chatbot',
    price: 20,
    billing: 'monthly',
    alternatives: ['chatgpt-plus', 'claude-pro'],
    description: 'AI search engine.'
  },
  {
    id: 'poe-subscription',
    name: 'Poe Subscription',
    category: 'chatbot',
    price: 20,
    billing: 'monthly',
    description: 'Aggregator for multiple AI models.'
  },
  {
    id: 'jasper-creator',
    name: 'Jasper Creator',
    category: 'writing',
    price: 49,
    billing: 'monthly',
    alternatives: ['copy-ai', 'chatgpt-plus'],
    description: 'AI content platform for creators.'
  },
  {
    id: 'copy-ai-pro',
    name: 'Copy.ai Pro',
    category: 'writing',
    price: 49,
    billing: 'monthly',
    alternatives: ['jasper-creator', 'chatgpt-plus'],
    description: 'AI for marketing and copy.',
    volumeDiscount: 0.25
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    category: 'writing',
    price: 10,
    billing: 'monthly',
    description: 'AI integrated into Notion.',
    volumeDiscount: 0.15
  },
  {
    id: 'cursor-pro',
    name: 'Cursor Pro',
    category: 'coding',
    price: 20,
    billing: 'monthly',
    alternatives: ['github-copilot'],
    description: 'AI-first code editor.'
  }
];
