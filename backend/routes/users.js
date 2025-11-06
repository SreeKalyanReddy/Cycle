import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profilePicture: req.user.profilePicture,
      theme: req.user.theme,
      emailNotifications: req.user.emailNotifications,
      notificationDaysBefore: req.user.notificationDaysBefore
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, emailNotifications, notificationDaysBefore, theme } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (emailNotifications !== undefined) user.emailNotifications = emailNotifications;
    if (notificationDaysBefore) user.notificationDaysBefore = notificationDaysBefore;
    if (theme) user.theme = theme;

    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      theme: user.theme,
      emailNotifications: user.emailNotifications,
      notificationDaysBefore: user.notificationDaysBefore
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

export default router;
