# 🚀 Scrubmarine CRM - Setup Guide

This guide will walk you through setting up the Scrubmarine CRM with **Supabase database** and **Vercel hosting**.

---

## 📋 What We're Building

1. **Customer Form Page** (`/`) - Where clients submit their info
2. **Admin Dashboard** (`/admin`) - Where you manage everything
3. **Supabase Database** - Stores all client submissions
4. **Configurable Branding** - Change logo, colors via admin panel

---

## Step 1: Create Supabase Project

### 1.1 Sign Up / Log In
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub (recommended)

### 1.2 Create New Project
1. Click **"New Project"**
2. **Organization**: Choose your account
3. **Project Name**: `scrubmarine-crm`
4. **Database Password**: Create a secure password (save it!)
5. **Region**: Choose closest to your users (e.g., `US East`)
6. Click **"Create new project"**

⏳ *Wait 1-2 minutes for the project to be created*

---

## Step 2: Get Your API Keys

Once your project is ready:

1. In the left sidebar, click **⚙️ Project Settings**
2. Click **API** in the submenu
3. You will see three important values:

| Setting | What It's For | Copy This |
|---------|--------------|-----------|
| **URL** | Your database address | `https://xxxxxx.supabase.co` |
| **anon public** | For reading public data | `eyJ...` (long string) |
| **service_role secret** | For admin operations | `eyJ...` (keep secret!) |

⚠️ **IMPORTANT**: Never share the `service_role` key publicly!

---

## Step 3: Configure Your Local Environment

### 3.1 Create Environment File

In your project folder (`/root/scrubmarinecrm`), create a file called:

```
.env.local
```

### 3.2 Add Your Credentials

Paste this and fill in your values from Step 2:

```env
# Admin Dashboard Password
# This is used to log into /admin
# If not set, defaults to 'admin123' (change this!)
ADMIN_PASSWORD=your-secure-admin-password
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-admin-password

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Admin Dashboard Password
# This protects your /admin page
ADMIN_PASSWORD=your-secure-password-here

# Also expose to frontend for simple auth
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password-here
```

🔒 **Choose a strong admin password** - this is what you use to log into `/admin`

---

## Step 4: Set Up The Database

### 4.1 Open SQL Editor

1. In Supabase, click **SQL Editor** in the left sidebar
2. Click **"New query"**

### 4.2 Run The Schema

Copy everything from `supabase/schema.sql` in this project and paste it into the SQL Editor.

Then click **▶️ Run** (or press Ctrl+Enter)

✅ This creates:
- `clients` table (stores customer submissions)
- `settings` table (stores your logo, colors)
- `form_fields` table (tracks form fields)
- Security rules (who can read/write data)

---

## Step 5: Test Locally

### 5.1 Install Dependencies

```bash
npm install
```

### 5.2 Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the form.

### 5.3 Test the Form

1. Fill out the form and submit
2. Check Supabase **Table Editor** → **clients** to see the data saved
3. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
4. Log in with your admin password
5. You should see the submitted data!

---

## Step 6: Deploy to Vercel

### 6.1 Push to GitHub (Already Done!)

Your code is already on GitHub at:
`https://github.com/scrubmarine-code/scrubmarinecrm`

### 6.2 Connect to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Log in with your GitHub account
3. Click **"Add New Project"**
4. Find and select `scrubmarinecrm`
5. Click **"Import"**

### 6.3 Add Environment Variables

In Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add each variable from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`

3. Click **"Deploy"**

🎉 Your CRM is now live!

---

## Step 7: Configure Your Logo

### Option A: Use the Default Logo
The project includes `public/logo.svg` - you're all set!

### Option B: Upload Your Own Logo

1. Go to your **Admin Dashboard** (`/admin`)
2. Login with your admin password
3. In **Branding Settings**, enter the URL to your logo:
   - Use `/logo.png` if you add a file to `/public/`
   - Or use an external URL like `https://cdn.example.com/logo.png`
4. Click **Save Changes**

### To Add a Custom Image:

1. Add your logo file to the `public/` folder (e.g., `public/my-logo.png`)
2. Push to GitHub: `git add . && git commit -m "Add custom logo" && git push`
3. In Admin Dashboard, set Logo URL to `/my-logo.png`

---

## 📁 Project Structure

```
scrubmarinecrm/
├── app/
│   ├── api/              # API routes for database operations
│   │   ├── clients/      # Save/fetch client submissions
│   │   ├── form-fields/  # Get form field definitions
│   │   └── settings/     # Get/update CRM settings
│   ├── admin/
│   │   └── page.tsx      # Admin dashboard UI
│   ├── page.tsx          # Main customer form page
│   └── layout.tsx        # Root layout
├── lib/
│   ├── supabase.ts       # Database connection & functions
│   └── types.ts          # TypeScript type definitions
├── supabase/
│   └── schema.sql        # Database setup script
├── public/
│   └── logo.svg          # Default logo
├── .env.local.example    # Environment variable template
└── SETUP.md              # This file!
```

---

## 🔧 Common Tasks

### Add a New Form Field

1. Go to Supabase **Table Editor** → **form_fields**
2. Click **"Insert row"**
3. Fill in:
   - `field_name`: `company_name` (no spaces)
   - `field_label`: `Company Name`
   - `field_type`: `text`
   - `is_required`: `true` or `false`
   - `display_order`: `5` (or next number)
   - `is_active`: `true`

4. Update `app/page.tsx` to add the input field
5. Update `lib/types.ts` if needed
6. Update `app/api/clients/route.ts` to handle the new field

### Change Brand Colors

1. Go to **Admin Dashboard** (`/admin`)
2. In **Branding Settings**, change "Primary Color"
3. Click the color picker or enter hex code (e.g., `#e53935`)
4. Save changes - updates immediately!

### View Client Data

1. Go to **Admin Dashboard** (`/admin`)
2. See all submissions in the table
3. Click email addresses to send emails
4. Click **Delete** to remove old entries

---

## 🐛 Troubleshooting

### "Failed to fetch clients" error
- Check that your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Make sure you ran the `schema.sql` in Supabase

### Admin login not working
- Check that `NEXT_PUBLIC_ADMIN_PASSWORD` is set in Vercel environment variables
- Password is case-sensitive

### Logo not showing
- Check browser console for 404 errors
- Try using an absolute path like `/logo.svg` or full URL
- Ensure the file exists in `public/` folder

### Form submissions not saving
- Check Supabase **Table Editor** → **clients** for data
- Check browser **Network tab** for API errors
- Verify RLS policies are set up (in `schema.sql`)

---


## 🔧 Troubleshooting Admin Dashboard

### "Can not view clients" or empty table
**Problem:** Clients not showing in admin dashboard

**Solutions:**
1. Check browser console for errors
2. Verify Supabase schema was run correctly
3. Check that RLS policies allow authenticated users to read clients
4. Try refreshing the page after logging in

### "Can not change logo/color" (401 error)
**Problem:** PATCH /api/settings returns 401

**Solutions:**
1. **Default password:** Try `admin123` if you haven't set ADMIN_PASSWORD
2. Check that password is stored: Open browser DevTools → Application → Local Storage
   - Should see `admin_auth: true` and `admin_password: your-password`
3. If missing, log out and log back in
4. Check Vercel environment variables have ADMIN_PASSWORD set

### "Logo not showing" (404 error)
**Problem:** GET /logo.png or /logo.svg returns 404

**Solutions:**
1. Default logo is now `/logo.svg` (not .png)
2. In Admin Dashboard, set Logo URL to `/logo.svg`
3. Or upload your own image to `/public/` folder and use `/your-image.png`
4. External URLs work too: `https://example.com/logo.png`

### Changes not persisting after refresh
**Problem:** Settings save but reset on page reload

**Solutions:**
1. Check browser console for save errors
2. Verify Supabase settings table has data:
   - Go to Supabase Table Editor → settings
   - Should see one row with your logo_url, primary_color, etc.
3. If empty, run the INSERT statement from schema.sql again

### "Can not delete clients"
**Problem:** Delete button doesn't work

**Solutions:**
1. Check browser console for errors
2. Verify you're still logged in (check localStorage)
3. Try refreshing the page

---

## 🔐 Security Notes

1. **Never commit `.env.local`** - it contains secrets
2. **Use strong admin passwords** - the admin page has customer data
3. **Service role key** - keep this secret, never expose to frontend
4. **RLS Policies** - already set up to protect data

---

## 📞 Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs

---

## ✅ Setup Checklist

- [ ] Created Supabase project
- [ ] Copied API keys to `.env.local`
- [ ] Ran `schema.sql` in Supabase SQL Editor
- [ ] Tested form submission locally
- [ ] Set admin password
- [ ] Deployed to Vercel
- [ ] Added environment variables to Vercel
- [ ] Tested admin dashboard on production
- [ ] Customized logo and colors

🎉 **You're all set! Your CRM is ready to use.**
