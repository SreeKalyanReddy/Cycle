import mongoose from 'mongoose';
import Subscription from './models/Subscription.js';
import User from './models/User.js';

const MONGO_URI = 'mongodb://localhost:27017/subscription-tracker';

const checkSubscriptions = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const subs = await Subscription.find({ }).populate('user', 'email');
    
    console.log(`\nFound ${subs.length} subscriptions:\n`);
    subs.forEach(sub => {
      console.log(`- ${sub.serviceName}: $${sub.cost} ${sub.billingCycle}`);
      console.log(`  User: ${sub.user ? sub.user.email : 'NO USER (ORPHANED)'}`);
      console.log(`  Active: ${sub.isActive}`);
      console.log(`  Renewal: ${sub.renewalDate}`);
      console.log('');
    });

    // Clean up orphaned subscriptions
    const orphaned = subs.filter(s => !s.user);
    if (orphaned.length > 0) {
      console.log(`\nCleaning up ${orphaned.length} orphaned subscriptions...`);
      await Subscription.deleteMany({ user: null });
      console.log('✅ Orphaned subscriptions deleted');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

checkSubscriptions();
