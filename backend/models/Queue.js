const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['priority', 'walkin', 'normal', 'print'],
    required: true
  },
  status: {
    type: String,
    enum: ['waiting', 'served'],
    default: 'waiting'
  },
  EnqueueTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // ✅ This adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Queue', queueSchema);
