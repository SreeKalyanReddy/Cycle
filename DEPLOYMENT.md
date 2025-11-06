# Deployment Guide

## Prerequisites
1. GitHub account
2. Vercel account (sign up at vercel.com)
3. Render account (sign up at render.com)
4. MongoDB Atlas account (sign up at mongodb.com/cloud/atlas)

## Step 1: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user:
   - Username: admin
   - Password: [Choose a strong password]
4. Network Access:
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
5. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/subscriptionTracker?retryWrites=true&w=majority`

## Step 2: Push to GitHub

Run these commands in your terminal:

```cmd
cd C:\Users\sreek\Documents\SubscriptionTracker
git init
git add .
git commit -m "Initial commit"
```

Then create a new repository on GitHub:
1. Go to https://github.com/new
2. Name: subscription-tracker
3. Don't initialize with README
4. Click "Create repository"

Then push your code:
```cmd
git remote add origin https://github.com/YOUR_USERNAME/subscription-tracker.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy Backend to Render

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Select your `subscription-tracker` repository
5. Configure:
   - **Name**: subscription-tracker-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/subscriptionTracker
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=production
   PORT=10000
   GOOGLE_CLIENT_ID=your_google_client_id
   ```
7. Click "Create Web Service"
8. Wait for deployment (takes 2-3 minutes)
9. Copy your backend URL (e.g., https://subscription-tracker-backend.onrender.com)

## Step 4: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
5. Add Environment Variables:
   ```
   VITE_API_URL=https://subscription-tracker-backend.onrender.com/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```
6. Click "Deploy"
7. Wait for deployment (takes 1-2 minutes)
8. Your site will be live at: https://your-project.vercel.app

## Step 5: Test Your Live Site

1. Visit your Vercel URL
2. Try the demo login (email: demo@cycle.com, password: demo123)
3. Check if all features work

## Troubleshooting

### Backend Issues:
- Check Render logs if backend fails
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

### Frontend Issues:
- Make sure VITE_API_URL points to your Render backend URL
- Check browser console for errors
- Verify environment variables in Vercel settings

### CORS Issues:
- Backend should allow your Vercel domain in CORS settings
- Check backend/config/cors.js

## Custom Domain (Optional)

### On Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### On Render:
1. Go to Service Settings → Custom Domain
2. Add your custom domain
3. Follow DNS configuration instructions

## Important Notes

- **Free Tier Limits**:
  - Render: Backend may sleep after 15 mins of inactivity
  - Vercel: 100GB bandwidth per month
  - MongoDB Atlas: 512MB storage

- **Security**:
  - Change JWT_SECRET to a strong random string
  - Don't commit .env files to GitHub
  - Keep your MongoDB password secure

- **Updates**:
  - Push to GitHub main branch to auto-deploy
  - Vercel and Render will auto-deploy on git push

## Environment Variables Reference

### Backend (.env for local, Render for production):
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=production
PORT=10000
GOOGLE_CLIENT_ID=your_google_client_id
```

### Frontend (.env for local, Vercel for production):
```
VITE_API_URL=https://your-backend.onrender.com/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Support

If you encounter issues:
1. Check the deployment logs
2. Verify all environment variables
3. Test API endpoints using Postman or browser
4. Check MongoDB Atlas network access

Good luck with your deployment! 🚀
