import express from 'express';
import { protect } from '../middleware/auth.js';
import Subscription from '../models/Subscription.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Validation rules
const subscriptionValidation = [
  body('serviceName').trim().notEmpty().withMessage('Service name is required'),
  body('cost').isFloat({ min: 0 }).withMessage('Cost must be a positive number'),
  body('billingCycle').isIn(['monthly', 'yearly', 'quarterly', 'weekly']).withMessage('Invalid billing cycle'),
  body('renewalDate').isISO8601().withMessage('Invalid renewal date'),
  body('category').isIn(['entertainment', 'productivity', 'education', 'fitness', 'music', 'cloud-storage', 'gaming', 'news', 'other']).withMessage('Invalid category')
];

// @route   GET /api/subscriptions
// @desc    Get all subscriptions for logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id }).sort({ renewalDate: 1 });
    res.json(subscriptions);
  } catch (error) {
    console.error('Get subscriptions error:', error);
    res.status(500).json({ message: 'Failed to fetch subscriptions', error: error.message });
  }
});

// @route   GET /api/subscriptions/:id
// @desc    Get single subscription
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.json(subscription);
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({ message: 'Failed to fetch subscription', error: error.message });
  }
});

// @route   POST /api/subscriptions
// @desc    Create new subscription
// @access  Private
router.post('/', protect, subscriptionValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id
    });

    res.status(201).json(subscription);
  } catch (error) {
    console.error('Create subscription error:', error);
    res.status(500).json({ message: 'Failed to create subscription', error: error.message });
  }
});

// @route   PUT /api/subscriptions/:id
// @desc    Update subscription
// @access  Private
router.put('/:id', protect, subscriptionValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      subscription[key] = req.body[key];
    });

    await subscription.save();
    res.json(subscription);
  } catch (error) {
    console.error('Update subscription error:', error);
    res.status(500).json({ message: 'Failed to update subscription', error: error.message });
  }
});

// @route   DELETE /api/subscriptions/:id
// @desc    Delete subscription
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    await subscription.deleteOne();
    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Delete subscription error:', error);
    res.status(500).json({ message: 'Failed to delete subscription', error: error.message });
  }
});

// @route   GET /api/subscriptions/analytics/summary
// @desc    Get analytics summary
// @access  Private
router.get('/analytics/summary', protect, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id, isActive: true });

    // Calculate total costs
    let monthlyTotal = 0;
    let yearlyTotal = 0;

    subscriptions.forEach(sub => {
      switch(sub.billingCycle) {
        case 'weekly':
          monthlyTotal += sub.cost * 4;
          yearlyTotal += sub.cost * 52;
          break;
        case 'monthly':
          monthlyTotal += sub.cost;
          yearlyTotal += sub.cost * 12;
          break;
        case 'quarterly':
          monthlyTotal += sub.cost / 3;
          yearlyTotal += sub.cost * 4;
          break;
        case 'yearly':
          monthlyTotal += sub.cost / 12;
          yearlyTotal += sub.cost;
          break;
      }
    });

    // Group by category
    const byCategory = {};
    subscriptions.forEach(sub => {
      if (!byCategory[sub.category]) {
        byCategory[sub.category] = {
          count: 0,
          total: 0
        };
      }
      byCategory[sub.category].count++;
      
      let monthlyCost = 0;
      switch(sub.billingCycle) {
        case 'weekly': monthlyCost = sub.cost * 4; break;
        case 'monthly': monthlyCost = sub.cost; break;
        case 'quarterly': monthlyCost = sub.cost / 3; break;
        case 'yearly': monthlyCost = sub.cost / 12; break;
      }
      byCategory[sub.category].total += monthlyCost;
    });

    // Upcoming renewals (next 30 days)
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const upcomingRenewals = subscriptions.filter(sub => {
      const renewalDate = new Date(sub.renewalDate);
      return renewalDate >= today && renewalDate <= thirtyDaysFromNow;
    }).length;

    res.json({
      totalSubscriptions: subscriptions.length,
      monthlyTotal: Math.round(monthlyTotal * 100) / 100,
      yearlyTotal: Math.round(yearlyTotal * 100) / 100,
      byCategory,
      upcomingRenewals
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
  }
});

export default router;
