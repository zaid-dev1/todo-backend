const taskRouter = require('./task.controller');

function TaskModule(app, io) {
  const taskService = require('./task.service')(io); // Pass io instance
  app.use('/tasks', taskRouter(taskService));

  console.log('✅ Task routes initialized at /tasks');
}

module.exports = TaskModule;
