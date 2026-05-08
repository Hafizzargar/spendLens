const express = require('express');
const cors = require('cors');
const connectDB = require('./lib/mongodb');
require('dotenv').config();

const auditRoutes = require('./routes/audit');
const leadRoutes = require('./routes/lead');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const apiLimiter = require('./middleware/rateLimiter');

// Routes
app.use('/api/audit', auditRoutes); // Temporarily removed apiLimiter for testing
app.use('/api/lead', leadRoutes);  // Temporarily removed apiLimiter for testing

app.get('/', (req, res) => {
  res.send('SpendLens API is running...');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
