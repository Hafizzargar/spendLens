const mongoose = require('mongoose');

// Define strict sub-schema for tools to ensure data integrity
const ToolSchema = new mongoose.Schema({
  toolId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true, index: true }, // Indexed for aggregation (e.g., spending by category)
  seats: { type: Number, required: true, min: 1 },
  actualPrice: { type: Number, required: true, min: 0 },
  customName: { type: String },
  customPrice: { type: Number }
}, { _id: false }); // Prevents Mongoose from generating unnecessary ObjectIds for subdocuments

// Define strict sub-schema for recommendations
const RecommendationSchema = new mongoose.Schema({
  toolId: { type: String, required: true },
  toolName: { type: String, required: true },
  action: { type: String, enum: ['cancel', 'switch', 'consolidate', 'keep', 'merge'], required: true }, // Relational-style enum constraint
  savings: { type: Number, required: true },
  calculation: { type: String }, // Explicit math for savings to prove it is not AI hallucinated
  confidence: { type: String, enum: ['High', 'Medium', 'Low'] },
  message: { type: String, required: true }
}, { _id: false });

const AuditSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true, index: true }, // Explicitly indexed as our primary lookup key
  useCase: { type: String, enum: ['engineering', 'marketing', 'mixed', 'general'], default: 'general' },
  
  // Financial Metrics (Double precision)
  totalMonthlySpend: { type: Number, required: true, default: 0 },
  totalAnnualSpend: { type: Number, required: true, default: 0 },
  potentialMonthlySavings: { type: Number, required: true, default: 0 },
  potentialAnnualSavings: { type: Number, required: true, default: 0 },
  
  // Relational Arrays with strict schemas
  tools: [ToolSchema],
  recommendations: [RecommendationSchema],
  
  aiSummary: { type: String }
}, { 
  timestamps: true // Auto-manages createdAt and updatedAt for time-series analysis
});

// ==========================================
// ANALYTICS INDEXING STRATEGY
// ==========================================
// 1. Indexing by spend to quickly run queries like "Find top 10% spenders"
AuditSchema.index({ totalAnnualSpend: -1 });

// 2. Indexing by creation date for time-series charts (e.g. audits per month)
AuditSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Audit', AuditSchema);
