const taskRouter = require('./task.controller');

function TaskModule(app) {
  app.use('/tasks', taskRouter);
  console.log('✅ Task routes initialized at /tasks');
}

module.exports = TaskModule;
