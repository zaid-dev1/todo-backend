const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ Import CORS middleware
require('dotenv').config();
const TaskModule = require('./tasks/tasks.module');

class AppModule {
  constructor() {
    this.app = express();

    // ✅ Enable CORS with specific frontend origin
    this.app.use(
      cors({
        origin: 'http://localhost:5173', // Allow requests from your frontend
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Allow cookies & authentication headers
      }),
    );

    this.app.use(express.json()); // ✅ Enable JSON parsing
    this.startServer();
  }

  async startServer() {
    try {
      await this.connectDatabase();
      TaskModule(this.app); // ✅ Register Task Module after DB connection

      const PORT = process.env.PORT || 3000;
      this.app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('❌ Server startup failed:', error);
    }
  }

  async connectDatabase() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ Connected to MongoDB Atlas');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }
}

module.exports = AppModule;
