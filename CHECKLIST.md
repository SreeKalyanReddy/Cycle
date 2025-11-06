# ✅ Pre-Launch Checklist

## Before You Start

### 1. Prerequisites Installed ✓
- [ ] Node.js (v16+) installed
- [ ] MongoDB installed OR MongoDB Atlas account created
- [ ] Google Cloud Console account (for OAuth)
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command Prompt access

### 2. Project Setup ✓
- [ ] Run `setup.bat` (or manual npm install)
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] No installation errors

### 3. Environment Configuration 📝

#### Backend Environment (`backend/.env`)
- [ ] `PORT=5000` (or your preferred port)
- [ ] `MONGODB_URI` configured (local or Atlas)
- [ ] `JWT_SECRET` set (random secure string)
- [ ] `GOOGLE_CLIENT_ID` from Google Cloud Console
- [ ] `GOOGLE_CLIENT_SECRET` from Google Cloud Console
- [ ] `FRONTEND_URL=http://localhost:5173`
- [ ] `EMAIL_USER` (optional, for notifications)
- [ ] `EMAIL_PASSWORD` (optional, Gmail App Password)

#### Frontend Environment (`frontend/.env`)
- [ ] `VITE_GOOGLE_CLIENT_ID` matches backend
- [ ] `VITE_API_URL=http://localhost:5000/api`

### 4. Google OAuth Setup 🔑
- [ ] Created project in Google Cloud Console
- [ ] Enabled Google+ API
- [ ] Created OAuth 2.0 credentials
- [ ] Set authorized JavaScript origins: `http://localhost:5173`
- [ ] Set authorized redirect URIs: `http://localhost:5173`
- [ ] Copied Client ID and Secret to .env files

### 5. MongoDB Setup 💾
- [ ] MongoDB service running (if local)
  ```bash
  net start MongoDB
  ```
- [ ] OR MongoDB Atlas cluster created
- [ ] Connection string tested
- [ ] Database access configured (Atlas users only)
- [ ] IP whitelist configured (Atlas users only)

### 6. Email Configuration (Optional) 📧
- [ ] Gmail 2FA enabled
- [ ] App Password generated
- [ ] Added to `EMAIL_PASSWORD` in backend .env
- [ ] `EMAIL_SERVICE=gmail` set
- [ ] `EMAIL_USER` configured

## Launch Steps

### Start the Application 🚀

#### Option 1: Automated (Recommended)
```bash
start.bat
```

#### Option 2: Manual
Terminal 1:
```bash
cd backend
npm run dev
```

Terminal 2:
```bash
cd frontend
npm run dev
```

### Verify Everything Works ✓

- [ ] Backend server running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] No console errors in backend
- [ ] No console errors in frontend
- [ ] MongoDB connected (check backend console)
- [ ] Email service initialized (check backend console)

### First Use 🎉

- [ ] Open http://localhost:5173 in browser
- [ ] Sign in with Google OR create email account
- [ ] Login successful, redirected to dashboard
- [ ] Dashboard loads without errors
- [ ] Navigation menu works
- [ ] Add subscription form opens
- [ ] Create first subscription
- [ ] View subscription in list
- [ ] Check analytics page
- [ ] Verify profile page
- [ ] Test dark mode toggle
- [ ] Test logout

## Common Issues & Solutions

### MongoDB Connection Failed
- **Check**: Is MongoDB running?
  ```bash
  net start MongoDB
  ```
- **Check**: Is connection string correct in .env?
- **Atlas**: Is IP whitelisted? Is database user created?

### Google OAuth Not Working
- **Check**: Client ID matches in both .env files
- **Check**: Authorized origins include http://localhost:5173
- **Check**: Google+ API is enabled
- **Try**: Clear browser cache and cookies

### Port Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000
# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Same for port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Email Notifications Not Sending
- **Check**: Using App Password, not regular Gmail password
- **Check**: 2FA enabled on Gmail account
- **Check**: EMAIL_USER and EMAIL_PASSWORD set correctly
- **Note**: This is optional, app works without it

### Dependencies Installation Failed
```bash
# Clear cache and reinstall
cd backend
del package-lock.json
rmdir /s /q node_modules
npm install

cd ../frontend
del package-lock.json
rmdir /s /q node_modules
npm install
```

## Testing Checklist

### Authentication
- [ ] Google Sign-In works
- [ ] Email registration works
- [ ] Email login works
- [ ] JWT token stored
- [ ] Protected routes accessible after login
- [ ] Logout works
- [ ] Redirects to login when not authenticated

### Subscriptions
- [ ] Add subscription works
- [ ] Edit subscription works
- [ ] Delete subscription works (with confirmation)
- [ ] List all subscriptions
- [ ] Filter by category (visual)
- [ ] Renewal date calculation correct

### Dashboard
- [ ] Statistics display correctly
- [ ] Upcoming renewals show
- [ ] Color coding works (red/orange/green)
- [ ] Quick actions work
- [ ] Real-time updates after adding subscription

### Analytics
- [ ] Pie chart renders
- [ ] Bar chart renders
- [ ] Category breakdown correct
- [ ] Projections calculate correctly
- [ ] No errors with zero subscriptions

### Profile
- [ ] Profile displays user info
- [ ] Name update works
- [ ] Notification toggle works
- [ ] Reminder days selector works
- [ ] Theme persists after refresh
- [ ] Changes save successfully

### Responsive Design
- [ ] Mobile layout works (< 768px)
- [ ] Tablet layout works (768px - 1024px)
- [ ] Desktop layout works (> 1024px)
- [ ] Mobile menu functional
- [ ] Charts responsive

## Security Verification

- [ ] Passwords are hashed (not visible in database)
- [ ] JWT tokens expire after 7 days
- [ ] Protected routes require authentication
- [ ] CORS configured properly
- [ ] Environment variables not exposed
- [ ] No console.log of sensitive data in production

## Performance Check

- [ ] Page loads in < 3 seconds
- [ ] API responses in < 500ms
- [ ] No memory leaks
- [ ] Charts render smoothly
- [ ] No excessive re-renders

## Documentation Review

- [ ] README.md read and understood
- [ ] QUICKSTART.md followed
- [ ] FEATURES.md reviewed
- [ ] PROJECT_SUMMARY.md read
- [ ] Environment examples checked

## Ready for Production?

If deploying to production, also check:
- [ ] Update FRONTEND_URL in backend .env
- [ ] Update VITE_API_URL in frontend .env
- [ ] Set NODE_ENV=production
- [ ] Use production MongoDB database
- [ ] Update Google OAuth authorized origins
- [ ] Use secure JWT_SECRET (32+ characters)
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Configure error logging
- [ ] Set up backups

## 🎉 You're Ready!

Once all items are checked, you're ready to use your Subscription Tracker!

**Happy Tracking! 💳📊**

---

*Tip: Keep this checklist handy for troubleshooting or when setting up on a new machine.*
