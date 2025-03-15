const Task = require('./task.schema');

class TaskService {
  constructor(io) {
    this.io = io; // Store socket.io instance
  }

  async create(name, description) {
    try {
      const task = new Task({ name, description });
      const savedTask = await task.save();

      // Notify all clients about the new task
      this.io.emit('taskCreated', savedTask);

      return savedTask;
    } catch (error) {
      throw new Error('Error creating task: ' + error.message);
    }
  }

  async findAll() {
    try {
      return await Task.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error('Error fetching tasks: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        throw new Error('Task not found');
      }

      // Notify all clients about task deletion
      this.io.emit('taskDeleted', id);

      return { message: 'Task deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting task: ' + error.message);
    }
  }
}

module.exports = (io) => new TaskService(io);
