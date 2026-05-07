const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true,
    // Regex validation for relational-grade data integrity
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
    index: true // Indexed to quickly check for duplicate leads or query by email
  },
  auditId: { 
    type: String, 
    required: true,
    // Acts as a Foreign Key to the Audit collection. Indexed for O(1) joins/populates.
    index: true 
  },
  companyName: { 
    type: String, 
    trim: true 
  },
  savingsPotential: { 
    type: Number, 
    default: 0 
  }
}, {
  timestamps: true // Auto-manages createdAt and updatedAt
});

// ==========================================
// RELATIONSHIP & DATA INTEGRITY INDEXES
// ==========================================
// Compound index: Prevent the same email from submitting multiple leads for the exact same audit
LeadSchema.index({ email: 1, auditId: 1 }, { unique: true });

// Virtual Population (Relational emulation in MongoDB)
// This allows us to use `.populate('audit')` on a Lead document to join the Audit data
LeadSchema.virtual('audit', {
  ref: 'Audit',
  localField: 'auditId',
  foreignField: 'uuid',
  justOne: true
});

// Ensure virtuals are included when converting documents to JSON
LeadSchema.set('toJSON', { virtuals: true });
LeadSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Lead', LeadSchema);
