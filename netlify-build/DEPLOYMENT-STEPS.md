# 🚀 Deployment Guide - Netlify + MongoDB Atlas

## Step 1: Set Up MongoDB Atlas (Free)

1. **Create Account**
   - Go to https://www.mongodb.com/atlas
   - Click "Try Free"
   - Sign up (NO credit card required)

2. **Create Free Cluster**
   - Choose "M0 Sandbox" (FREE forever)
   - Select cloud provider (AWS recommended)
   - Choose region closest to you
   - Name: `heavyequip`

3. **Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `admin`
   - Password: (Generate secure password - SAVE IT!)
   - Role: "Read and write to any database"

4. **Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - This is safe for serverless deployments

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Driver: Node.js
   - Copy connection string
   - Replace `<password>` with your actual password
   - Should look like: `mongodb+srv://admin:YourPassword@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Create Database & Collections**
   - Click "Browse Collections"
   - Create database: `heavyequip`
   - Create collections:
     * `admin`
     * `categories`
     * `client`
     * `products`
     * `history`

7. **Add Sample Data**
   ```javascript
   // In MongoDB Atlas browser, add these to 'categories' collection:
   { "name": "Excavators" }
   { "name": "Bulldozers" }
   { "name": "Cranes" }
   { "name": "Loaders" }
   { "name": "Dump Trucks" }
   
   // Add to 'admin' collection (password is 'admin123' hashed):
   {
     "username": "admin",
     "email": "admin@heavyequip.com",
     "password": "$2a$10$rVGkYb3EXAMPLEHASH"  // You'll hash this properly
   }
   ```

---

## Step 2: Deploy to Netlify (Free)

1. **Push to GitHub**
   ```bash
   cd netlify-build
   git init
   git add .
   git commit -m "Heavy equipment rental app"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to https://netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub
   - Select your repository
   - Build settings:
     * Build command: `npm run build`
     * Publish directory: `public`
     * Functions directory: `functions`

3. **Add Environment Variables**
   In Netlify dashboard:
   - Go to "Site settings" → "Environment variables"
   - Add these:
     * `MONGODB_URI` = Your MongoDB connection string
     * `JWT_SECRET` = Any random string (e.g., `my-super-secret-key-12345`)
     * `NODE_ENV` = `production`

4. **Deploy**
   - Click "Deploy site"
   - Wait 2-3 minutes
   - Your site is live!

---

## Step 3: Test Your Deployment

1. Visit your Netlify URL
2. Test these features:
   - Homepage loads
   - Categories menu works
   - Product browsing
   - User registration
   - Login
   - Admin panel
   - Rental requests

---

## 🎯 Free Tier Limits

### MongoDB Atlas (M0)
- Storage: 512 MB
- RAM: 512 MB shared
- Enough for 1000s of products
- **Never expires**

### Netlify Free
- 100 GB bandwidth/month
- 300 build minutes/month
- Serverless functions: 125k requests/month
- **Perfect for small-medium traffic**

---

## 🐛 Troubleshooting

### "Cannot connect to database"
- Check MongoDB IP whitelist includes 0.0.0.0/0
- Verify connection string in Netlify env variables
- Make sure password doesn't have special characters

### "Functions not working"
- Check Netlify functions log in dashboard
- Verify `functions` directory is set correctly
- Check environment variables are set

### "Site not loading"
- Check build logs in Netlify dashboard
- Verify `publish` directory is set to `public`
- Check for any build errors

---

## 📊 Monitoring

- **Netlify Analytics**: Dashboard → Analytics
- **MongoDB Metrics**: Atlas → Clusters → Metrics
- **Function Logs**: Netlify → Functions tab

---

## 🔒 Security Notes

1. **Never commit .env file** to GitHub
2. **Use strong JWT_SECRET** in production
3. **Rotate MongoDB password** periodically
4. **Enable 2FA** on Netlify and MongoDB Atlas

---

## ✅ Post-Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] All collections created with sample data
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Netlify site connected
- [ ] Environment variables added
- [ ] Site deployed successfully
- [ ] All features tested

**Congratulations! Your app is live on Netlify with MongoDB! 🎉**
