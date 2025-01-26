import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import router from './routes/userRoute';

dotenv.config()

console.log('dotenv.config()', dotenv.config())

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.DB_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Route registration
app.use('/api', taskRoutes);
app.use('/user', router)

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
