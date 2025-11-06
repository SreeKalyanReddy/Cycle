import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  serviceName: {
    type: String,
    required: true,
    trim: true
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true
  },
  billingCycle: {
    type: String,
    required: true,
    enum: ['monthly', 'yearly', 'quarterly', 'weekly']
  },
  renewalDate: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'entertainment',
      'productivity',
      'education',
      'fitness',
      'music',
      'cloud-storage',
      'gaming',
      'news',
      'other'
    ]
  },
  paymentMethod: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  icon: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notificationSent: {
    type: Boolean,
    default: false
  },
  lastNotificationDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for efficient querying
subscriptionSchema.index({ user: 1, renewalDate: 1 });
subscriptionSchema.index({ renewalDate: 1, isActive: 1 });

// Virtual for days until renewal
subscriptionSchema.virtual('daysUntilRenewal').get(function() {
  const today = new Date();
  const renewal = new Date(this.renewalDate);
  const diffTime = renewal - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Method to calculate next renewal date
subscriptionSchema.methods.updateRenewalDate = function() {
  const currentRenewal = new Date(this.renewalDate);
  const today = new Date();
  
  // If renewal date has passed, calculate next renewal
  if (currentRenewal < today) {
    switch(this.billingCycle) {
      case 'weekly':
        currentRenewal.setDate(currentRenewal.getDate() + 7);
        break;
      case 'monthly':
        currentRenewal.setMonth(currentRenewal.getMonth() + 1);
        break;
      case 'quarterly':
        currentRenewal.setMonth(currentRenewal.getMonth() + 3);
        break;
      case 'yearly':
        currentRenewal.setFullYear(currentRenewal.getFullYear() + 1);
        break;
    }
    this.renewalDate = currentRenewal;
    this.notificationSent = false;
  }
};

subscriptionSchema.set('toJSON', { virtuals: true });
subscriptionSchema.set('toObject', { virtuals: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
