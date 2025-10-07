const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const DailyReport = require('../models/DailyReport');

// @route   GET /api/dailyreport
// @desc    Get all daily reports for logged in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const reports = await DailyReport.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(30);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/dailyreport
// @desc    Create new daily report
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { date, tasks, notes } = req.body;

    const totalHours = tasks.reduce((sum, task) => sum + task.hoursSpent, 0);

    const report = await DailyReport.create({
      user: req.user._id,
      date,
      tasks,
      notes,
      totalHours
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/dailyreport/:id
// @desc    Update daily report
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const report = await DailyReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    if (report.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { tasks, notes } = req.body;
    const totalHours = tasks.reduce((sum, task) => sum + task.hoursSpent, 0);

    report.tasks = tasks;
    report.notes = notes;
    report.totalHours = totalHours;

    await report.save();
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/dailyreport/:id
// @desc    Delete daily report
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const report = await DailyReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    if (report.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await report.deleteOne();
    res.json({ message: 'Report deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
