import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.models.js';
import { loginSchema, registerSchema } from '../validation/schemas.js';

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });

export const registerController = async (req, res) => {
  try {
    const validateData = registerSchema.parse(req.body);

    let existingUser = await User.findOne({
      email: validateData.email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    // hashing pass
    const hashedPass = await bcrypt.hash(validateData.password, 10);

    //create new user
    const user = new User({
      name: validateData.name.trim(),
      email: validateData.email.toLowerCase().trim(),
      password: hashedPass,
    });
    await user.save();

    // sign and return jwt
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.issues) {
      return res.status(400).json({ errors: error.issues });
    }
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

export const loginController = async (req, res) => {
  try {
    const validateData = loginSchema.parse(req.body);

    const user = await User.findOne({
      email: validateData.email.toLowerCase(),
    });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // compare pass
    const isMatch = await bcrypt.compare(validateData.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.issues) {
      return res.status(400).json({ errors: error.issues });
    }
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

export const getMeController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Error in getMeController:', error.message);
    res.status(500).send('Server error during token check');
  }
};
