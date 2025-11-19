# Vercel Deployment Guide - Setting Up Production Database

Your Qala platform is currently showing "0 brands discovered" because the SQLite database is local only. Follow these steps to set up a production database on Vercel.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Vercel Postgres Database

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your `platform-v5` project
3. Click on the **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a name (e.g., `qala-platform-db`)
7. Select your region (choose closest to your users)
8. Click **Create**

### Step 2: Connect Database to Project

Vercel will automatically add environment variables to your project:
- `POSTGRES_PRISMA_URL` - For Prisma queries (with connection pooling)
- `POSTGRES_URL_NON_POOLING` - For direct connections (migrations)

These are already configured in your `prisma/schema.prisma` file! ✅

### Step 3: Push Database Schema

Once the database is created, you need to push your schema and seed data.

**Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Link your project
vercel link

# Pull environment variables
vercel env pull

# Push database schema
npx prisma db push

# Seed the database with 5 luxury brands
npm run db:seed
```

**Option B: Manual Setup**

1. Copy the environment variables from Vercel Dashboard → Settings → Environment Variables
2. Create `.env.local` file:
```env
POSTGRES_PRISMA_URL="your-connection-string-here"
POSTGRES_URL_NON_POOLING="your-direct-connection-string-here"
```
3. Run:
```bash
npx prisma db push
npm run db:seed
```

### Step 4: Redeploy

After seeding your database:

```bash
git add -A
git commit -m "chore: Switch to PostgreSQL for production"
git push origin main
```

Vercel will automatically redeploy with the new database configuration!

## ✅ Verification

Once deployed, visit https://platform-v5.vercel.app/

You should see:
- ✅ "5 brands discovered" (instead of 0)
- ✅ Magazine grid with 5 luxury brands displayed
- ✅ Brand timeline navigation working
- ✅ Full user journey functional

## 🔍 Troubleshooting

### "0 brands discovered" still showing

1. **Check Environment Variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Verify `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING` exist

2. **Verify Database is Seeded:**
   ```bash
   vercel env pull
   npx prisma studio
   ```
   - Check if Brand, Collection, and Product tables have data

3. **Check Build Logs:**
   - Go to Vercel Dashboard → Deployments → Latest Deployment
   - Check for any Prisma or database connection errors

### Database Connection Errors

If you see connection errors in build logs:

1. Make sure environment variables are set for **Production**, **Preview**, and **Development**
2. Try redeploying: `vercel --prod`

## 📊 Database Management

### View Your Data
```bash
npx prisma studio
```

### Reset and Reseed
```bash
npx prisma db push --force-reset
npm run db:seed
```

### Add More Brands
Edit `prisma/seed.ts` and run:
```bash
npm run db:seed
```

## 🎯 What Changed

- ✅ Switched from SQLite to PostgreSQL
- ✅ Added `@vercel/postgres` package
- ✅ Updated `prisma/schema.prisma` to use environment variables
- ✅ Added `postinstall` script for automatic Prisma generation
- ✅ Database now persists across deployments

## 💡 Alternative: Use Local SQLite for Development

You can keep SQLite for local development:

1. Create `.env.development`:
```env
DATABASE_URL="file:./dev.db"
```

2. Create `.env.production`:
```env
POSTGRES_PRISMA_URL="your-vercel-url"
POSTGRES_URL_NON_POOLING="your-vercel-url"
```

But for now, using PostgreSQL everywhere is simplest!

## 🆘 Need Help?

If you encounter any issues:
1. Check Vercel build logs
2. Verify environment variables are set
3. Make sure database is seeded
4. Try a fresh deployment

---

**Next Steps After Database Setup:**
1. Verify all 5 brands appear on homepage
2. Test filtering by category and season
3. Navigate through brand timeline
4. Explore brand B2B pages
5. Browse collections and products

Your luxury fashion platform is ready to go live! 🎨✨

