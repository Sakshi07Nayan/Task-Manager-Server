const mongoose = require('mongoose');
const { createTask, getTasksByUserId, updateTask, deleteTask } = require('../models/taskModel');

const create = async (req, res) => {
  const { title, description, status } = req.body;
  if (!description) {
    return res.status(400).json({ message: 'Description is required' });
  }
  const task = await createTask(req.user.id, title, description, status);
  res.status(201).json(task);
};

const getTasks = async (req, res) => {
  const tasks = await getTasksByUserId(req.user.id);
  res.json(tasks);
};

const update = async (req, res) => {
  const { title, description } = req.body;
  if (!description) {
    return res.status(400).json({ message: 'Description is required' });
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }
  const task = await updateTask(req.params.id, title, description);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
};

const remove = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }
  await deleteTask(req.params.id);
  res.status(204).send();
};

module.exports = { create, getTasks, update, remove };
