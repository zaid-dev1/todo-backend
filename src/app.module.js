const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const TaskModule = require('./tasks/tasks.module');

class AppModule {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: process.env.ALLOW_ORIGIN ,
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
        credentials: true,
      },
    });

    // ✅ Correct CORS setup
    this.app.use(
      cors({
        origin: process.env.ALLOW_ORIGIN,
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      }),
    );

    this.app.use(express.json());

    this.io.on('connection', (socket) => {
      console.log(' New client connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    this.startServer();
  }

  async startServer() {
    try {
      await this.connectDatabase();
      TaskModule(this.app, this.io);

      const PORT = process.env.PORT || 3000;
      this.server.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Server startup failed:', error);
    }
  }

  async connectDatabase() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to MongoDB Atlas');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }
}

module.exports = AppModule;
