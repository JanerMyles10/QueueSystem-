const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');


let nowServing = {
  priority: null,
  normal: null,
  walkin: null,
  print: null
};


router.get('/', async (req, res) => {
  try {
    const entries = await Queue.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch queue' });
  }
});


router.post('/', async (req, res) => {
  try {
    const newEntry = new Queue(req.body);
    await newEntry.save();
    res.status(201).json({ message: 'Added to queue' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to queue' });
  }
});


router.delete('/:number', async (req, res) => {
  try {
    const result = await Queue.deleteOne({ number: req.params.number });
    if (!result.deletedCount) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted from queue' });
  } catch (err) {
    res.status(500).json({ error: 'Delete error' });
  }
});


router.patch('/:number/serve', async (req, res) => {
  try {
    await Queue.updateOne({ number: req.params.number }, { $set: { status: 'served' } });
    res.json({ message: 'Marked as served' });
  } catch (err) {
    res.status(500).json({ error: 'Serve error' });
  }
});


router.post('/now-serving', (req, res) => {
  const { number, type } = req.body;

  if (!['priority', 'normal', 'walkin', 'print'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  nowServing[type] = number ? { number, type } : null;

  res.json({ message: 'Now serving updated', nowServing });
});


router.get('/now-serving', (req, res) => {
  res.json(nowServing);
});

router.get('/history', async (req, res) => {
  try {
    const activeNowServingNumbers = Object.values(nowServing)
      .filter(entry => entry !== null)
      .map(entry => entry.number);

    const historyEntries = await Queue.find({
      number: { $nin: activeNowServingNumbers }
    }).sort({ updatedAt: -1 });

    res.json(historyEntries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch history logs' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const totalServed = await Queue.countDocuments({ status: 'served' });
    const totalWaiting = await Queue.countDocuments({ status: 'waiting' });

    const perType = await Queue.aggregate([
      { $match: { status: 'waiting' } },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    res.json({
      totalServed,
      totalWaiting,
      byType: perType
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});


router.get('/count', async (req, res) => {
  try {
    const counts = await Queue.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(counts);
  } catch (error) {
    res.status(500).json({ message: 'Error counting queues', error });
  }
});

// GET /api/queue/stats/weekly
router.get('/stats/weekly', async (req, res) => {
  try {
    const weeklyCounts = await Queue.aggregate([
      {
        $group: {
          _id: { $week: "$createdAt" }, // You can also use $isoWeek
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(weeklyCounts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weekly stats' });
  }
});

// GET /api/queue/stats/monthly
router.get('/stats/monthly', async (req, res) => {
  try {
    const monthlyCounts = await Queue.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(monthlyCounts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch monthly stats' });
  }
});


module.exports = router;
