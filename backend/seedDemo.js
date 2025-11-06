import mongoose from 'mongoose';
import User from './models/User.js';
import Subscription from './models/Subscription.js';

const MONGO_URI = 'mongodb://localhost:27017/subscription-tracker';

const seedDemoAccount = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Delete existing demo user and their subscriptions
    const existingUser = await User.findOne({ email: 'demo@cycle.com' });
    if (existingUser) {
      await Subscription.deleteMany({ user: existingUser._id });
      await User.deleteOne({ email: 'demo@cycle.com' });
      console.log('Deleted existing demo account');
    }

    // Create demo user (password will be hashed by the User model pre-save hook)
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@cycle.com',
      password: 'demo123'
    });

    console.log('Demo user created:', demoUser.email);

    // Create sample subscriptions
    const today = new Date();
    const subscriptions = [
      {
        user: demoUser._id,
        serviceName: 'Netflix',
        cost: 15.99,
        billingCycle: 'monthly',
        category: 'entertainment',
        renewalDate: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        status: 'active',
        notes: 'Premium streaming service'
      },
      {
        user: demoUser._id,
        serviceName: 'Spotify',
        cost: 10.99,
        billingCycle: 'monthly',
        category: 'music',
        renewalDate: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
        status: 'active',
        notes: 'Music streaming'
      },
      {
        user: demoUser._id,
        serviceName: 'Adobe Creative Cloud',
        cost: 54.99,
        billingCycle: 'monthly',
        category: 'productivity',
        renewalDate: new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
        status: 'active',
        notes: 'Design and creative tools'
      },
      {
        user: demoUser._id,
        serviceName: 'GitHub Pro',
        cost: 4.00,
        billingCycle: 'monthly',
        category: 'productivity',
        renewalDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        status: 'active',
        notes: 'Code hosting and collaboration'
      },
      {
        user: demoUser._id,
        serviceName: 'ChatGPT Plus',
        cost: 20.00,
        billingCycle: 'monthly',
        category: 'productivity',
        renewalDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        status: 'active',
        notes: 'AI assistant subscription'
      },
      {
        user: demoUser._id,
        serviceName: 'Amazon Prime',
        cost: 14.99,
        billingCycle: 'monthly',
        category: 'other',
        renewalDate: new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
        status: 'active',
        notes: 'Fast shipping and streaming'
      },
      {
        user: demoUser._id,
        serviceName: 'Microsoft 365',
        cost: 6.99,
        billingCycle: 'monthly',
        category: 'productivity',
        renewalDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        status: 'active',
        notes: 'Office apps and cloud storage'
      },
      {
        user: demoUser._id,
        serviceName: 'Gym Membership',
        cost: 29.99,
        billingCycle: 'monthly',
        category: 'fitness',
        renewalDate: new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
        status: 'active',
        notes: 'Fitness center access'
      }
    ];

    await Subscription.insertMany(subscriptions);
    console.log(`Created ${subscriptions.length} sample subscriptions`);

    console.log('\n✅ Demo account setup complete!');
    console.log('Email: demo@cycle.com');
    console.log('Password: demo123');
    console.log(`Total subscriptions: ${subscriptions.length}`);
    console.log(`Monthly cost: $${subscriptions.reduce((sum, sub) => sum + sub.cost, 0).toFixed(2)}`);

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding demo account:', error);
    process.exit(1);
  }
};

seedDemoAccount();
