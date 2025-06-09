require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const routes = require('./src/routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
