import Todo from '../models/todo.models.js';

async function getAllTodos(req, res) {
  try {
    const todos = await Todo.find({ user: req.user }).sort({ createdAt: -1 });
    return res.status(200).json(todos || []);
  } catch (error) {
    console.log('Error in getAllTodos controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function addTodo(req, res) {
  try {
    // console.log('🔍 DEBUG - Request file:', req.file);
    // console.log('🔍 DEBUG - Request body:', req.body);

    const { title, description, category, isActive } = req.body;

    const attachmentPath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !description) {
      return res.status(404).json({ message: 'all fields are required' });
    }
    const existingTodo = await Todo.findOne({
      title: title.trim(),
      user: req.user,
    });
    if (existingTodo) {
      return res.status(400).json({ message: 'Use other Title' });
    }
    const newTodo = await Todo.create({
      title: title.trim(),
      description: description.trim(),
      category: category || 'Other',
      isActive: isActive !== undefined ? isActive : true,
      file: attachmentPath,
      user: req.user,
    });

    // console.log('✅ DEBUG - Todo created with file:', newTodo.file);

    return res.status(201).json({
      success: true,
      message: 'Todo added successfully',
      newTodo,
    });
  } catch (error) {
    console.log('Error in addTodo controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getTodoById(req, res) {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res
      .status(200)
      .json({ message: 'Todo retrieved successfully', todo });
  } catch (error) {
    console.log('Error in getTodoById controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateTodo(req, res) {
  try {
    const { title, description, category, isActive } = req.body;

    const updateFields = { title, description, category, isActive };

    if (req.file) {
      updateFields.file = `/uploads/${req.file.filename}`;
    }

    const todo = await Todo.findOne({ _id: req.params.id, user: req.user });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // if updating title, check for duplicate
    if (req.body.title && req.body.title !== todo.title) {
      const duplicate = await Todo.findOne({
        title: req.body.title,
        user: req.user,
        _id: { $ne: req.params.id },
      });

      if (duplicate) {
        return res
          .status(400)
          .json({ message: 'You already have a todo with this title' });
      }
    }

    // Trim strings if provided

    if (req.body.title) req.body.title = req.body.title.trim();
    if (req.body.description)
      req.body.description = req.body.description.trim();

    const newUpdatedTodo = await Todo.findOneAndUpdate(
      { _id: todo._id },
      updateFields,
      { new: true }
    );

    if (!newUpdatedTodo) {
      return res
        .status(404)
        .json({ success: false, message: 'Todo not found or unauthorized' });
    }

    return res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      todo: newUpdatedTodo,
    });
  } catch (error) {
    console.log('Error in updateTodo controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteTodo(req, res) {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    console.log('Error in deleteTodo controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export { getAllTodos, addTodo, getTodoById, updateTodo, deleteTodo };
