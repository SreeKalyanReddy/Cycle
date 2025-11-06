# 🚀 Quick Start Guide

## Step-by-Step Setup (5 minutes)

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Setup Environment Variables

**Backend** (`backend/.env`):
```bash
cd backend
copy .env.example .env
```
Then edit `.env` with your credentials (see README.md for detailed instructions).

**Frontend** (`frontend/.env`):
```bash
cd frontend
copy .env.example .env
```
Add your Google Client ID.

### 3. Start MongoDB

**Option A - Local:**
```bash
net start MongoDB
```

**Option B - Atlas:**
Use the connection string from MongoDB Atlas in your backend `.env`.

### 4. Run the Application

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access the App

Open your browser and navigate to:
```
http://localhost:5173
```

## 🎯 Next Steps

1. **Sign in** with Google or create an account
2. **Add your first subscription**
3. **Explore** the dashboard and analytics
4. **Configure** notification preferences in your profile

## ⚠️ Common Issues

### Port Already in Use
If ports 5000 or 5173 are in use:
```bash
# Check what's using the port
netstat -ano | findstr :5000

# Kill the process (replace <PID> with actual process ID)
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Make sure MongoDB service is running
- Check your connection string in `backend/.env`
- For Atlas, whitelist your IP address

### Google OAuth Not Working
- Verify GOOGLE_CLIENT_ID is correct in both backend and frontend `.env` files
- Check authorized origins in Google Cloud Console

## 📝 Minimum Required Configuration

To get started quickly, you only need to set these in `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/subscription-tracker
JWT_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

And in `frontend/.env`:
```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

Email notifications are optional and can be configured later!

## 🆘 Need Help?

Check the main README.md for:
- Detailed setup instructions
- API documentation
- Troubleshooting guide
- Feature documentation

Happy tracking! 📊
