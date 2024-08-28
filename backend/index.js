const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors'); // Import cors
const app = express(); // Initialize express app
const port = 5000;

// Use cors middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
connectToMongo();

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start server
app.listen(port, () => {
  console.log(`INoteBook listening at http://localhost:${port}`);
});
