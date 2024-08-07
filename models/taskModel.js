const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'], // Adjust as necessary
    default: 'todo' // Default value if not provided
  }
});

const Task = mongoose.model('Task', taskSchema);

const createTask = async (userId, title, description, status = 'todo') => {
  const task = new Task({ userId, title, description, status });
  await task.save();
  return task;
};

const getTasksByUserId = async (userId) => await Task.find({ userId });

const updateTask = async (taskId, title, description) => {
  const task = await Task.findById(taskId);
  if (task) {
    if (title) task.title = title;
    if (description) task.description = description;
    await task.save();
  }
  return task;
};

const deleteTask = async (taskId) => {
  await Task.findByIdAndDelete(taskId);
};

module.exports = { createTask, getTasksByUserId, updateTask, deleteTask };
