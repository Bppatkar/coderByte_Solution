import mongoose from 'mongoose';

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Work', 'Personal', 'Shopping', 'Health', 'Other'],
      default: 'Other',
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    file: {
      type: String,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

todoSchema.index({ title: 1, user: 1 }, { unique: true });
const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
