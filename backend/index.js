const connectToMongo = require('./db');
const express = require('express');
var cors=require('cors');
var app =express();
app.use(cors());
const port = 5000;

connectToMongo();
app.use(express.json());

// Correct the require path here
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`INoteBook listening at http://localhost:${port}`);
});
