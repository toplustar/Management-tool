const mongoose = require('mongoose');

const dailyReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  tasks: [{
    description: {
      type: String,
      required: true
    },
    hoursSpent: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'pending'],
      default: 'in-progress'
    }
  }],
  notes: {
    type: String,
    default: ''
  },
  totalHours: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DailyReport', dailyReportSchema);
