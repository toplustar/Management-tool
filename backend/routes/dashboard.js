const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const DailyReport = require('../models/DailyReport');
const User = require('../models/User');

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Get reports for current month
    const monthlyReports = await DailyReport.find({
      user: userId,
      date: { $gte: thisMonth }
    });

    const totalHoursThisMonth = monthlyReports.reduce((sum, report) => sum + report.totalHours, 0);
    const reportsThisMonth = monthlyReports.length;

    // Get today's report
    const todayReport = await DailyReport.findOne({
      user: userId,
      date: { $gte: today }
    });

    res.json({
      totalHoursThisMonth,
      reportsThisMonth,
      todayReportSubmitted: !!todayReport,
      todayHours: todayReport ? todayReport.totalHours : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
