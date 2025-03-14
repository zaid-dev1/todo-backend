const express = require('express');
const taskService = require('./task.service');

const router = express.Router();

//  Create Task
router.post('/', async (req, res) => {
  try {
    if (!req.body.description || !req.body.name) {
      return res.status(400).json({ error: 'both name and Description is required' });
    }
    const task = await taskService.create(
      req.body.name,req.body.description,
    );
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//  Get All Tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await taskService.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//  Delete Task
router.delete('/:id', async (req, res) => {
  try {
    const result = await taskService.delete(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

module.exports = router;
