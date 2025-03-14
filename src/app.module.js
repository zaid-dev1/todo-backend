const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config();
const TaskModule = require('./tasks/tasks.module');

class AppModule {
  constructor() {
    this.app = express();

 
    this.app.use(
      cors({
        origin: 'https://todo-frontend-pied-phi.vercel.app',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, 
      }),
    );

    this.app.use(express.json()); 
    this.startServer();
  }

  async startServer() {
    try {
      await this.connectDatabase();
      TaskModule(this.app); 

      const PORT = process.env.PORT || 8080; 
      this.app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
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
