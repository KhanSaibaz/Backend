import express from 'express';
import Task from '../Model/Task.js';
import authMiddleware from '../Middleware/AuthMiddleware.js'

const router = express.Router();

// GET all tasks (Protected Route)
router.get('/getTasks', authMiddleware, async (req, res) => {
    
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
});

// POST - Add a new task (Protected Route)
router.post('/addTasks', authMiddleware, async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error: error.message });
    }
});


// PUT - Update a task by ID (Protected Route)
router.put('/updateTasks/:id', authMiddleware, async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
});

// DELETE - Remove a task by ID (Protected Route)
router.delete('/deleteTasks/:id', authMiddleware, async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const deletedTask = await Task.findOneAndDelete({ id: taskId });

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
});

export default router;
