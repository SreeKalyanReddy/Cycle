import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = null;

// Initialize email transporter
const initializeTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('⚠️  Email credentials not configured. Email notifications disabled.');
    return null;
  }

  try {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    console.log('✅ Email service initialized');
    return transporter;
  } catch (error) {
    console.error('❌ Email service initialization failed:', error);
    return null;
  }
};

// Send renewal reminder email
export const sendRenewalReminder = async (user, subscription) => {
  if (!transporter) {
    transporter = initializeTransporter();
  }

  if (!transporter || !user.emailNotifications) {
    return false;
  }

  try {
    const renewalDate = new Date(subscription.renewalDate).toLocaleDateString();
    const daysUntil = subscription.daysUntilRenewal;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `🔔 Subscription Renewal Reminder: ${subscription.serviceName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Subscription Renewal Reminder</h2>
          <p>Hi ${user.name},</p>
          <p>This is a friendly reminder that your <strong>${subscription.serviceName}</strong> subscription will renew soon.</p>
          
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1F2937;">Subscription Details</h3>
            <p><strong>Service:</strong> ${subscription.serviceName}</p>
            <p><strong>Cost:</strong> ${subscription.currency} ${subscription.cost}</p>
            <p><strong>Billing Cycle:</strong> ${subscription.billingCycle}</p>
            <p><strong>Renewal Date:</strong> ${renewalDate}</p>
            <p><strong>Days Until Renewal:</strong> ${daysUntil} day${daysUntil !== 1 ? 's' : ''}</p>
            ${subscription.paymentMethod ? `<p><strong>Payment Method:</strong> ${subscription.paymentMethod}</p>` : ''}
          </div>
          
          <p>Make sure you have sufficient funds available for the renewal.</p>
          <p>If you want to cancel this subscription, please do so before the renewal date.</p>
          
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
          <p style="color: #6B7280; font-size: 12px;">
            This is an automated reminder from Subscription Tracker.<br>
            You can manage your notification preferences in your profile settings.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Reminder sent to ${user.email} for ${subscription.serviceName}`);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};

export default { sendRenewalReminder };
