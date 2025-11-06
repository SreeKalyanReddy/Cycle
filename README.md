# 📱 Subscription Tracker

A full-stack web application to help you manage, track, and analyze all your recurring subscriptions in one place. Get renewal reminders, visualize spending patterns, and never miss a payment again!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

## ✨ Features

### Core Features (MVP)
- 🔐 **Authentication & User Management**
  - Google OAuth 2.0 Sign-In
  - Email/Password authentication
  - Secure JWT-based sessions
  - User profile management

- 💳 **Subscription Management**
  - Add, edit, and delete subscriptions
  - Track service name, cost, billing cycle, and renewal dates
  - Categorize subscriptions (entertainment, productivity, etc.)
  - Payment method tracking
  - Active/inactive subscription status

- 📅 **Renewal & Reminder System**
  - Visual indicators for upcoming renewals
  - Email notifications before renewal dates
  - Color-coded alerts (urgent/upcoming/normal)
  - Customizable notification timing

- 📊 **Analytics & Dashboard**
  - Interactive dashboard with key metrics
  - Monthly and yearly spending breakdowns
  - Category-wise spending analysis with pie charts
  - Top subscriptions bar chart
  - Cost projections (3 months, 6 months, 1 year, 5 years)

- 🌗 **Dark Mode**
  - System-wide theme toggle
  - Persistent theme preferences
  - Smooth transitions

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js & react-chartjs-2** - Data visualization
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library
- **date-fns** - Date manipulation

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Google Auth Library** - OAuth 2.0
- **Nodemailer** - Email notifications
- **Node-cron** - Scheduled tasks
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- **Google Cloud Console** account for OAuth 2.0 credentials

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
cd SubscriptionTracker
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables
1. Copy the example environment file:
```bash
copy .env.example .env
```

2. Edit `.env` and fill in your credentials:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/subscription-tracker
# Or use MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/subscription-tracker

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email Configuration (Optional - for email notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Notification Settings
NOTIFICATION_DAYS_BEFORE=3
```

#### Setting Up Google OAuth 2.0

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen
6. Create OAuth client:
   - Application type: **Web application**
   - Authorized JavaScript origins: `http://localhost:5173`
   - Authorized redirect URIs: `http://localhost:5173`
7. Copy the **Client ID** and **Client Secret** to your `.env` file

#### Setting Up Email Notifications (Optional)

For Gmail:
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Use the app password in `EMAIL_PASSWORD` (not your regular Gmail password)

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

#### Configure Environment Variables
1. Copy the example environment file:
```bash
copy .env.example .env
```

2. Edit `.env` and add your configuration:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Whitelist your IP address
5. Create a database user
6. Use the connection string in your backend `.env` file

## 🎯 Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
npm run dev
```
The API will run on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The app will run on `http://localhost:5173`

### Production Build

#### Build Frontend
```bash
cd frontend
npm run build
```

#### Start Production Server
```bash
cd backend
npm start
```

## 📁 Project Structure

```
SubscriptionTracker/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── auth.js               # JWT authentication
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Subscription.js       # Subscription schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── subscriptions.js      # Subscription CRUD
│   │   └── users.js              # User profile routes
│   ├── utils/
│   │   ├── emailService.js       # Email sending logic
│   │   └── notificationScheduler.js  # Cron jobs
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Express server
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.jsx        # Main layout with nav
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Auth state management
│   │   │   └── ThemeContext.jsx  # Theme management
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login/Register
│   │   │   ├── Dashboard.jsx     # Main dashboard
│   │   │   ├── Subscriptions.jsx # Subscription management
│   │   │   ├── Analytics.jsx     # Charts and insights
│   │   │   └── Profile.jsx       # User settings
│   │   ├── utils/
│   │   │   └── api.js            # Axios configuration
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Tailwind styles
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/register` - Register with email/password
- `POST /api/auth/login` - Login with email/password

### Subscriptions
- `GET /api/subscriptions` - Get all subscriptions
- `GET /api/subscriptions/:id` - Get single subscription
- `POST /api/subscriptions` - Create subscription
- `PUT /api/subscriptions/:id` - Update subscription
- `DELETE /api/subscriptions/:id` - Delete subscription
- `GET /api/subscriptions/analytics/summary` - Get analytics

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🎨 Usage Guide

### 1. Sign In
- Use Google Sign-In for quick access
- Or create an account with email/password

### 2. Add Subscriptions
- Click "Add Subscription" button
- Fill in service details:
  - Service name (e.g., Netflix, Spotify)
  - Cost and currency
  - Billing cycle (weekly/monthly/quarterly/yearly)
  - Renewal date
  - Category
  - Payment method (optional)

### 3. Track Renewals
- View upcoming renewals on the dashboard
- Color-coded alerts:
  - 🔴 Red: Due in 3 days or less
  - 🟠 Orange: Due in 4-7 days
  - 🟢 Green: Due in 8+ days

### 4. Analyze Spending
- Navigate to Analytics page
- View spending by category (pie chart)
- See top subscriptions (bar chart)
- Check cost projections

### 5. Manage Notifications
- Go to Profile settings
- Toggle email notifications
- Set reminder days before renewal
- Enable/disable dark mode

## 📧 Email Notifications

The app sends automated email reminders:
- Scheduled daily at 9:00 AM
- Checks all active subscriptions
- Sends reminder based on user preference (default: 3 days before)
- Includes subscription details and renewal date

## 🌟 Future Enhancements

- 💰 Expense forecasting with trends
- 🧠 Smart duplicate detection
- 🔔 Browser push notifications
- 📱 Mobile app (React Native)
- 🌐 Multi-currency support with exchange rates
- 📊 Export reports (PDF, CSV)
- 👥 Family sharing/multi-user accounts
- 🔗 Integration with banking APIs
- 📈 Historical spending graphs
- 🎯 Budget setting and alerts

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Whitelist IP in MongoDB Atlas

### Google OAuth Not Working
- Verify Client ID and Secret
- Check authorized origins and redirect URIs
- Ensure Google+ API is enabled

### Email Notifications Not Sending
- Verify email credentials
- Use App Password for Gmail
- Check EMAIL_SERVICE setting

### Port Already in Use
```bash
# Windows - kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Developer

Created with ❤️ by Sree Kalyan Reddy

**Happy Subscription Tracking! 📱💰**
