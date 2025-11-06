import mongoose from 'mongoose';
import User from './models/User.js';
import Subscription from './models/Subscription.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/subscription-tracker';

const seedDemoAccount = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to Production MongoDB');

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

    console.log('✅ Demo user created:', demoUser.email);

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
        serviceName: 'Disney+',
        cost: 7.99,
        billingCycle: 'monthly',
        category: 'entertainment',
        renewalDate: new Date(today.getTime() + 22 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Family entertainment'
      },
      {
        user: demoUser._id,
        serviceName: 'Amazon Prime',
        cost: 14.99,
        billingCycle: 'monthly',
        category: 'entertainment',
        renewalDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Prime Video and benefits'
      },
      {
        user: demoUser._id,
        serviceName: 'GitHub Pro',
        cost: 4.00,
        billingCycle: 'monthly',
        category: 'productivity',
        renewalDate: new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Professional development tools'
      },
      {
        user: demoUser._id,
        serviceName: 'Adobe Creative Cloud',
        cost: 54.99,
        billingCycle: 'monthly',
        category: 'productivity',
        renewalDate: new Date(today.getTime() + 18 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Design and creative tools'
      },
      {
        user: demoUser._id,
        serviceName: 'Notion',
        cost: 8.00,
        billingCycle: 'monthly',
        category: 'productivity',
        renewalDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Note-taking and organization'
      },
      {
        user: demoUser._id,
        serviceName: 'ChatGPT Plus',
        cost: 20.00,
        billingCycle: 'monthly',
        category: 'productivity',
        renewalDate: new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'AI assistant'
      },
      {
        user: demoUser._id,
        serviceName: 'YouTube Premium',
        cost: 11.99,
        billingCycle: 'monthly',
        category: 'entertainment',
        renewalDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Ad-free videos and music'
      },
      {
        user: demoUser._id,
        serviceName: 'Dropbox',
        cost: 9.99,
        billingCycle: 'monthly',
        category: 'cloud-storage',
        renewalDate: new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000),
        isActive: true,
        notes: 'Cloud storage'
      }
    ];

    const createdSubscriptions = await Subscription.insertMany(subscriptions);
    console.log(`✅ Created ${createdSubscriptions.length} demo subscriptions`);

    console.log('\n🎉 Demo account setup complete!');
    console.log('📧 Email: demo@cycle.com');
    console.log('🔑 Password: demo123');
    
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding demo account:', error);
    process.exit(1);
  }
};

seedDemoAccount();
