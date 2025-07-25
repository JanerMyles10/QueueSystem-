const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const queueRoutes = require('./routes/queueRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/queue_system')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Mount all queue-related routes under /api/queue
app.use('/api/queue', queueRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('Backend is running.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
