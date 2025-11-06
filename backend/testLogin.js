import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const testLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find user
    const user = await User.findOne({ email: 'demo@cycle.com' }).select('+password');
    
    if (!user) {
      console.log('❌ User not found');
      process.exit(1);
    }

    console.log('✅ User found:');
    console.log('  Email:', user.email);
    console.log('  Password hash exists:', !!user.password);
    console.log('  Auth provider:', user.authProvider);
    console.log('  Password hash:', user.password);
    
    // Test password comparison
    const isMatch = await user.comparePassword('demo123');
    console.log('\n🔐 Password "demo123" match:', isMatch ? '✅ YES' : '❌ NO');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

testLogin();
