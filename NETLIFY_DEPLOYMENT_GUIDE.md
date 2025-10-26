# Netlify Deployment Guide for Machineries

## ✅ Project Status
- **15 Product Categories** with **150 Products** (10 products per category)
- **Admin Account**: Username: `admin` | Password: `admin123`
- **Favicon & Title**: Updated to "Machineries" with custom logo
- **All Features Working**: Homepage, Products, Product Details, Admin Login, Admin Dashboard

---

## 📋 Prerequisites
1. **Netlify Account** - Sign up at https://netlify.com (free tier works)
2. **MongoDB Atlas Connection String** - Your current MONGODB_URI secret

---

## 🚀 Deployment Steps

### Step 1: Prepare Your Project
Your project is already configured and ready to deploy. The `netlify-build` folder contains:
- `/public` - All HTML, CSS, JS, and assets
- `/functions` - 12 serverless functions for backend API
- `netlify.toml` - Netlify configuration file

### Step 2: Push to GitHub (Recommended) or Deploy Directly

#### Option A: Deploy via GitHub (Recommended)
1. **Create a new GitHub repository**
2. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Machineries Equipment Rental System"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

3. **Connect to Netlify**:
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select your repository
   - Configure build settings:
     - **Base directory**: `netlify-build`
     - **Build command**: (leave empty)
     - **Publish directory**: `public`
     - **Functions directory**: `functions`
   - Click "Deploy site"

#### Option B: Deploy via Netlify CLI (Direct Upload)
1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Deploy from netlify-build directory**:
   ```bash
   cd netlify-build
   netlify deploy
   ```
   - Follow prompts to create a new site
   - When asked for publish directory, enter: `public`
   
4. **Deploy to production**:
   ```bash
   netlify deploy --prod
   ```

### Step 3: Configure Environment Variables
**CRITICAL**: Your MongoDB connection must be added to Netlify

1. Go to your site in Netlify Dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Click "Add a variable"
4. Add:
   - **Key**: `MONGODB_URI`
   - **Value**: Your MongoDB Atlas connection string (same one from Replit Secrets)
   - **Scopes**: Check all (Builds, Functions, Post-processing)
5. Click "Save"

### Step 4: Trigger Redeploy
After adding environment variables:
1. Go to **Deploys** tab
2. Click "Trigger deploy" → "Deploy site"
3. Wait for deployment to complete (~2-3 minutes)

### Step 5: Test Your Deployed Site
Once deployed, test these features:

1. **Homepage**: Should load with orange branding
2. **Products Page**: Should display all 150 products from 15 categories
3. **Product Details**: Click any product to view details
4. **Admin Login**: 
   - Go to `/admin` or `/auth/admin-login.html`
   - Login with: `admin` / `admin123`
5. **Admin Dashboard**: Should load after successful login

---

## 🔧 Netlify Configuration (Already Done)

Your `netlify.toml` file is already configured:
```toml
[build]
  publish = "public"
  functions = "functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

---

## 📱 Custom Domain (Optional)
1. In Netlify Dashboard, go to **Domain settings**
2. Click "Add custom domain"
3. Follow instructions to connect your domain
4. Netlify provides free HTTPS/SSL automatically

---

## 🔐 Admin Credentials
- **Username**: admin
- **Password**: admin123

⚠️ **Important**: Change the admin password after first login for security!

---

## 📊 Database Summary
- **Categories**: 15 (Excavators, Bulldozers, Wheel Loaders, Backhoe Loaders, Skid Steer Loaders, Motor Graders, Dump Trucks, Concrete Mixers, Cranes, Forklifts, Compactors, Trenchers, Pavers, Scrapers, Telehandlers)
- **Products**: 150 total (10 per category)
- **Brands**: Caterpillar, Komatsu, Volvo, John Deere, Hitachi, JCB, Liebherr, Doosan
- **Users**: 1 admin account

---

## ⚡ Troubleshooting

### Products Not Loading
- Check if `MONGODB_URI` environment variable is set correctly in Netlify
- Check Functions logs in Netlify Dashboard → Functions tab

### Admin Login Fails
- Verify MongoDB connection is working
- Check browser console for errors (F12)
- Verify credentials: admin / admin123

### 404 Errors on Page Refresh
- Already handled with redirects in `netlify.toml`
- If still occurring, add catch-all redirect in Netlify Dashboard

---

## 📞 Support
If you encounter issues:
1. Check Netlify Functions logs
2. Check browser console (F12 → Console tab)
3. Verify all environment variables are set correctly

---

## ✨ Next Steps After Deployment
1. Test all features thoroughly
2. Change admin password
3. Add more products if needed
4. Set up custom domain (optional)
5. Configure email notifications (future enhancement)

---

**Deployment Complete!** 🎉
Your Heavy Equipment Rental Management System is now live on Netlify with full MongoDB backend support.
