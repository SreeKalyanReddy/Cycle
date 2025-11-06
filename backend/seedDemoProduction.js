import mongoose from 'mongoose';
import User from './models/User.js';
import Subscription from './models/Subscription.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

const seedDemoAccount = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing demo user and their subscriptions
    const existingUser = await User.findOne({ email: 'demo@cycle.com' });
    if (existingUser) {
      await Subscription.deleteMany({ user: existingUser._id });
      await User.deleteOne({ email: 'demo@cycle.com' });
      console.log('🗑️  Deleted existing demo account');
    }

    // Create demo user (password will be hashed by the User model pre-save hook)
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@cycle.com',
      password: 'demo123'
    });

    console.log('👤 Demo user created:', demoUser.email);

    // Create sample subscriptions
    const today = new Date();
    const subscriptions = [
      {
        user: demoUser._id,
        serviceName: 'Netflix',
        cost: 15.99,
        billingCycle: 'monthly',
        category: 'entertainment',
        renewalDate: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Premium streaming service'
      },
      {
        user: demoUser._id,
        serviceName: 'Spotify',
        cost: 10.99,
        billingCycle: 'monthly',
        category: 'music',
        renewalDate: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Music streaming'
      },
      {
        user: demoUser._id,
        serviceName: 'Adobe Creative Cloud',
        cost: 54.99,
        billingCycle: 'monthly',
        category: 'productivity',
        renewalDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Design and video editing tools'
      },
      {
        user: demoUser._id,
        serviceName: 'GitHub Pro',
        cost: 4.00,
        billingCycle: 'monthly',
        category: 'productivity',
        renewalDate: new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Code hosting and collaboration'
      },
      {
        user: demoUser._id,
        serviceName: 'Notion',
        cost: 8.00,
        billingCycle: 'monthly',
        category: 'productivity',
        renewalDate: new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Workspace and notes'
      },
      {
        user: demoUser._id,
        serviceName: 'AWS',
        cost: 25.00,
        billingCycle: 'monthly',
        category: 'cloud-storage',
        renewalDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Cloud services'
      },
      {
        user: demoUser._id,
        serviceName: 'YouTube Premium',
        cost: 11.99,
        billingCycle: 'monthly',
        category: 'entertainment',
        renewalDate: new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Ad-free videos'
      },
      {
        user: demoUser._id,
        serviceName: 'Grammarly',
        cost: 12.00,
        billingCycle: 'monthly',
        category: 'productivity',
        renewalDate: new Date(today.getTime() + 18 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Writing assistant'
      }
    ];

    await Subscription.insertMany(subscriptions);
    console.log(`✨ Created ${subscriptions.length} demo subscriptions`);

    console.log('\n🎉 Demo account setup complete!');
    console.log('📧 Email: demo@cycle.com');
    console.log('🔑 Password: demo123');

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding demo account:', error);
    process.exit(1);
  }
};

seedDemoAccount();
