const Task = require("../models/taskmodel");

// =======================
// Get Logged-in User Tasks
// =======================

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// Add Task
// =======================

const addTask = async (req, res) => {
  try {
    const { name, date, priority } = req.body;

    // Required Fields
    if (!name || !date || !priority) {
      return res.status(400).json({
        success: false,
        message: "Name, Date and Priority are required.",
      });
    }

    // Name Validation
    if (name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Task name must be at least 3 characters.",
      });
    }

    if (name.trim().length > 50) {
      return res.status(400).json({
        success: false,
        message: "Task name cannot exceed 50 characters.",
      });
    }

    // Priority Validation
    const priorities = ["High", "Medium", "Low"];

    if (!priorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Priority must be High, Medium or Low.",
      });
    }

    // Past Date Validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);

    if (selectedDate < today) {
      return res.status(400).json({
        success: false,
        message: "Past dates are not allowed.",
      });
    }

    // Duplicate Validation (Only for logged-in user)
    const taskExists = await Task.findOne({
      name: name.trim(),
      userId: req.user.id,
    });

    if (taskExists) {
      return res.status(400).json({
        success: false,
        message: "Task already exists.",
      });
    }

    // Create Task
    const task = await Task.create({
      name: name.trim(),
      date,
      priority,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
      data: task,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// Update Task
// =======================

const updateTask = async (req, res) => {
  try {
    const { name, date, priority } = req.body;

    if (!name || !date || !priority) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
        name,
        date,
        priority,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      data: task,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// Delete Task
// =======================

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};




















