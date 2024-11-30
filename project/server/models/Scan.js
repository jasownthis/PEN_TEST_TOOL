import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  target: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'scanning', 'completed', 'failed'],
    default: 'pending'
  },
  vulnerabilities: [{
    vulnerability: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vulnerability'
    },
    detectedAt: Date,
    details: String
  }],
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Scan', scanSchema);