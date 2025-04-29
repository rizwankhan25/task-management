const express = require("express");
const router = express.Router();
const authenticateJWT = require('../middleware/auth'); 
const Task = require("../models/task"); // import Task model

// GET /api/tasks - Fetch tasks with optional filtering
// router.get('/', authenticateJWT, async (req, res) => {
//   try {
//     const { completed, search } = req.query;
//     console.log("Search Query:", search); // Log the search query

//     const filter = {};

//     // Filter by completion status if provided
//     if (completed === 'true') {
//       filter.completed = true;
//     } else if (completed === 'false') {
//       filter.completed = false;
//     }

//     // Search by title or description if search query is provided
//     if (search) {
//       filter.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } }
//       ];
//     }

//     const tasks = await Task.find(filter);
//     res.status(200).json(tasks);
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//     res.status(500).json({ message: 'Server error while fetching tasks.' });
//   }
// });
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const { completed, search, priority } = req.query;
    const filter = {};

    // Filter by completion status if provided
    if (completed === 'true') {
      filter.completed = true;
    } else if (completed === 'false') {
      filter.completed = false;
    }

    // Filter by priority if provided
    if (priority) {
      filter.priority = priority;
    }

    // Search by title or description if search query is provided
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error while fetching tasks.' });
  }
});

// GET /api/tasks/priority-distribution - Get task count by priority
router.get('/priority-distribution', async (req, res) => {
  try {
    const distribution = await Task.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          priority: '$_id',
          count: 1
        }
      }
    ]);

    res.status(200).json(distribution);
  } catch (error) {
    console.error('Error fetching priority distribution:', error);
    res.status(500).json({ message: 'Server error while fetching priority distribution.' });
  }
});

// GET /api/tasks/completion-over-time - Get cumulative task completion percentage over time
router.get('/completion-over-time', async (req, res) => {
  try {
    const data = await Task.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: {
              $cond: [{ $eq: ["$completed", true] }, 1, 0]
            }
          }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Calculate cumulative totals
    let cumulativeTotal = 0;
    let cumulativeCompleted = 0;
    const result = data.map(item => {
      cumulativeTotal += item.totalTasks;
      cumulativeCompleted += item.completedTasks;
      const percentage = cumulativeTotal > 0 ? (cumulativeCompleted / cumulativeTotal) * 100 : 0;
      return {
        date: item._id,
        cumulativeCompleted, 
        cumulativeTotal,
        percentage: parseFloat(percentage.toFixed(2))
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching completion data:', error);
    res.status(500).json({ message: 'Server error while fetching completion data.' });
  }
});

// GET /api/tasks/by-month - Get tasks due in a specific month and year
router.get('/by-month', async (req, res) => {
  try {
    const { month, year } = req.query;

    // Validate query parameters
    const monthInt = parseInt(month);
    const yearInt = parseInt(year);
    if (
      isNaN(monthInt) || isNaN(yearInt) ||
      monthInt < 1 || monthInt > 12
    ) {
      return res.status(400).json({ message: 'Invalid month or year parameter.' });
    }

    // Calculate start and end dates for the specified month
    const startDate = new Date(yearInt, monthInt - 1, 1);
    const endDate = new Date(yearInt, monthInt, 0, 23, 59, 59, 999);

    // Query tasks with dueDate within the specified month
    const tasks = await Task.find({
      dueDate: { $gte: startDate, $lte: endDate }
    }).sort({ dueDate: 1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks for specified month:', error);
    res.status(500).json({ message: 'Server error while fetching tasks for specified month.' });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id); // Fetch the task by ID from the database

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Server error while fetching task.' });
  }
});


router.post("/", async (req, res) => {
  try {
    const { title, description, dueDate, priority, completed } = req.body;

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      completed,
    });

    const savedTask = await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: savedTask });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Failed to create task" });
  }
});

// PUT /api/tasks/:id - Update a task by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json({ message: 'Task updated successfully.', task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error while updating task.' });
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json({ message: 'Task deleted successfully.', task: deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error while deleting task.' });
  }
}); 

// details 
// routes/tasks.js (or wherever your routes are)
router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task details:', error);
    res.status(500).json({ message: 'Server error while fetching task details.' });
  }
});

module.exports = router;
