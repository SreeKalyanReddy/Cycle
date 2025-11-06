import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

const MONGO_URI = 'mongodb://localhost:27017/subscription-tracker';

const testDemoLogin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const user = await User.findOne({ email: 'demo@cycle.com' }).select('+password');
    
    if (!user) {
      console.log('❌ Demo user not found!');
      return;
    }

    console.log('✅ Demo user found:', user.email);
    console.log('Password hash:', user.password);
    console.log('Auth provider:', user.authProvider);
    
    // Test password comparison
    const isMatch = await bcrypt.compare('demo123', user.password);
    console.log('\nPassword test with bcrypt.compare:');
    console.log('Testing "demo123":', isMatch ? '✅ MATCH' : '❌ NO MATCH');
    
    // Test with user method
    const isMatch2 = await user.comparePassword('demo123');
    console.log('Testing with user.comparePassword:', isMatch2 ? '✅ MATCH' : '❌ NO MATCH');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

testDemoLogin();
