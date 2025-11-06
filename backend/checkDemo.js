import mongoose from 'mongoose';
import Subscription from './models/Subscription.js';
import User from './models/User.js';

const MONGO_URI = 'mongodb://localhost:27017/subscription-tracker';

const checkDemoSubs = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const demoUser = await User.findOne({ email: 'demo@cycle.com' });
    
    if (!demoUser) {
      console.log('❌ Demo user not found!');
      return;
    }

    console.log('✅ Demo user found:', demoUser.email);
    console.log('Demo user ID:', demoUser._id);

    const subs = await Subscription.find({ user: demoUser._id });
    
    console.log(`\nDemo user has ${subs.length} subscriptions:\n`);
    subs.forEach(sub => {
      console.log(`- ${sub.serviceName}: $${sub.cost} ${sub.billingCycle} (${sub.category})`);
      console.log(`  Active: ${sub.isActive !== false}`);
      console.log(`  Renewal: ${sub.renewalDate}`);
      console.log('');
    });

    if (subs.length === 0) {
      console.log('⚠️ Demo user has NO subscriptions!');
      console.log('Run: node seedDemo.js');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

checkDemoSubs();
