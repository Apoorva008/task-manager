import { Router, Request, Response } from 'express';
import Task from '../models/taskModel';

const router = Router();

// Create a task
router.post('/tasks', async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: 'Error creating task' });
  }
});

// Get all tasks
router.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// // Update a task
// router.put('/tasks/:id', async (req: Request<{ id: string }>, res: Response) => {
//   const { id } = req.params;
//   const { title, description, completed } = req.body;

//   try {
//     const updatedTask = await Task.findByIdAndUpdate(
//       id,
//       { title, description, completed },
//       { new: true } // Return the updated document
//     );

//     if (!updatedTask) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     res.status(200).json(updatedTask);
//   } catch (err) {
//     res.status(400).json({ error: 'Error updating task', details: err });
//   }
// });

// // Delete a task
// router.delete('/tasks/:id', async (req: Request<{ id: string }>, res: Response) => {
//   const { id } = req.params;

//   try {
//     const deletedTask = await Task.findByIdAndDelete(id);

//     if (!deletedTask) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     res.status(200).json({ message: 'Task deleted successfully' });
//   } catch (err) {
//     res.status(400).json({ error: 'Error deleting task', details: err });
//   }
// });

export default router;