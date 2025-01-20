import mongoose, { Document, Schema } from 'mongoose';

// Interface for a Task document
interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
}

// Define the schema for a Task
const taskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true, // Field is mandatory
  },
  description: {
    type: String,
    required: true, // Field is mandatory
  },
  completed: {
    type: Boolean,
    default: false, // Defaults to false
  },
});

// Create a Mongoose model using the schema
const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
