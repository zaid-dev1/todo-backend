const Task = require('./task.schema');

class TaskService {
  async create(name,description) {
    try {
      const task = new Task({name, description });
      return await task.save();
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
      return { message: 'Task deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting task: ' + error.message);
    }
  }
}

module.exports = new TaskService();
