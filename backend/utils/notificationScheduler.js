import cron from 'node-cron';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';
import { sendRenewalReminder } from './emailService.js';

// Schedule notification check (runs daily at 9:00 AM)
export const scheduleNotifications = () => {
  cron.schedule('0 9 * * *', async () => {
    console.log('🔔 Running scheduled notification check...');
    await checkAndSendNotifications();
  });

  console.log('✅ Notification scheduler started (runs daily at 9:00 AM)');
};

// Check subscriptions and send notifications
export const checkAndSendNotifications = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find all active subscriptions
    const subscriptions = await Subscription.find({ isActive: true }).populate('user');

    let notificationsSent = 0;

    for (const subscription of subscriptions) {
      const user = subscription.user;
      
      if (!user || !user.emailNotifications) {
        continue;
      }

      const renewalDate = new Date(subscription.renewalDate);
      renewalDate.setHours(0, 0, 0, 0);

      const daysUntilRenewal = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
      const notificationDays = user.notificationDaysBefore || 3;

      // Check if notification should be sent
      const shouldNotify = daysUntilRenewal <= notificationDays && 
                          daysUntilRenewal >= 0 &&
                          !subscription.notificationSent;

      if (shouldNotify) {
        const sent = await sendRenewalReminder(user, subscription);
        
        if (sent) {
          subscription.notificationSent = true;
          subscription.lastNotificationDate = new Date();
          await subscription.save();
          notificationsSent++;
        }
      }

      // Reset notification flag if renewal date has passed
      if (daysUntilRenewal < 0) {
        subscription.updateRenewalDate();
        await subscription.save();
      }
    }

    console.log(`✅ Notification check complete. Sent ${notificationsSent} notifications.`);
  } catch (error) {
    console.error('❌ Notification scheduler error:', error);
  }
};

// Manual trigger for testing
export const triggerNotificationCheck = async (req, res) => {
  try {
    await checkAndSendNotifications();
    res.json({ message: 'Notification check completed' });
  } catch (error) {
    res.status(500).json({ message: 'Notification check failed', error: error.message });
  }
};
