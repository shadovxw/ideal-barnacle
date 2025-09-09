// server.js
require('dotenv').config(); // load .env
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./models'); // Sequelize models/index.js
const PORT = process.env.PORT || 5000;
const app = express();
const router = require('./routes/routes');
// Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


app.use('/', router);

db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
  });


  