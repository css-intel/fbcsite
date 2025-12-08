# 🚀 Deployment Guide - Friendship Baptist Church Website

## Quick Start (5 Minutes to Live Site)

### Step 1: Prepare Your Files
```bash
# Navigate to your project folder
cd C:\Users\CSS\friendship-baptist-church

# Verify all files are present
dir
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in (create account if needed)
2. Click the "+" icon > "New repository"
3. Repository name: `friendship-baptist-church`
4. Description: "Official website for Friendship Baptist Church"
5. Make it **Public** (required for free Netlify hosting)
6. **Do NOT** initialize with README (we have one)
7. Click "Create repository"

### Step 3: Upload to GitHub

```bash
# Initialize Git in your project folder
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Complete church website"

# Set main branch
git branch -M main

# Connect to GitHub (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/friendship-baptist-church.git

# Push to GitHub
git push -u origin main
```

**Windows User? Use GitHub Desktop:**
1. Download [GitHub Desktop](https://desktop.github.com/)
2. File > Add Local Repository > Choose your folder
3. Commit changes
4. Publish repository

### Step 4: Deploy to Netlify

1. Go to [netlify.com](https://www.netlify.com/)
2. Click "Sign up" > "Sign up with GitHub"
3. Authorize Netlify to access your GitHub
4. Click "Add new site" > "Import an existing project"
5. Choose "GitHub"
6. Find and select `friendship-baptist-church` repository
7. Configure:
   - **Branch to deploy:** `main`
   - **Build command:** (leave empty)
   - **Publish directory:** `.` (just a period)
8. Click "Deploy site"

**Your site is now live!** 🎉

Initial URL: `https://random-name-12345.netlify.app`

### Step 5: Customize Site URL

1. In Netlify dashboard, click "Site settings"
2. Click "Change site name"
3. Enter: `friendship-baptist-aiken` (or your preference)
4. Your URL is now: `https://friendship-baptist-aiken.netlify.app`

---

## 🔐 Enable Content Management System (CMS)

### Step 1: Enable Netlify Identity

1. In your site dashboard, click "Identity" in the top menu
2. Click "Enable Identity"
3. Under "Registration preferences", select **Invite only**
4. Click "Invite users"
5. Enter admin email addresses (pastor, church admin, etc.)
6. Click "Send"

### Step 2: Enable Git Gateway

1. Still in Identity settings, scroll to "Services"
2. Click "Enable Git Gateway"
3. This allows the CMS to save changes to your GitHub repo

### Step 3: Access the CMS

1. Check your email for the Netlify invitation
2. Click "Accept the invite"
3. Set your password
4. You'll be redirected to: `https://your-site.netlify.app/admin/`
5. Log in with your email and password

**You can now edit content without touching code!** 📝

---

## 🌐 Connect Custom Domain

### Option A: Domain from GoDaddy, Namecheap, etc.

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain: `friendshipbaptist.org`
4. Click "Verify"
5. Netlify will show DNS configuration
6. Go to your domain registrar (GoDaddy, Namecheap, etc.)
7. Find DNS settings
8. Add these records:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

9. Wait 24-48 hours for DNS propagation
10. SSL certificate will auto-enable

### Option B: Buy Domain Through Netlify

1. In Domain settings, click "Add or register domain"
2. Search for available domains
3. Purchase directly (easier, auto-configured)

---

## 📧 Set Up Form Notifications

### Receive Contact Form Emails

1. Go to your Netlify site dashboard
2. Click "Forms" in the top menu
3. You'll see all your forms:
   - Contact
   - Prayer Request
   - Visit Planning
   - Giving
4. Click on a form name
5. Click "Notifications" > "Add notification"
6. Choose "Email notification"
7. Enter recipient email (church admin)
8. Save

**Now you'll get an email every time someone submits a form!**

---

## 🎨 Customize Content

### Via CMS (Recommended)

1. Go to `https://your-site.netlify.app/admin/`
2. Click "Settings" > "General Settings"
3. Edit:
   - Church name
   - Address
   - Phone
   - Email
   - Social media links
4. Click "Save"
5. Content updates automatically!

### Directly in Code

1. Edit files in the `content/` folder
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Update church information"
git push
```
3. Netlify auto-deploys in ~30 seconds

---

## 🖼️ Add Real Images

### Via CMS

1. Log into CMS
2. Edit any content with an image field
3. Click the image area
4. Upload your photo
5. Save

### Manually

1. Add images to `/images/uploads/` folder
2. Update image paths in HTML files
3. Commit and push

---

## 🎥 Add Sermon Videos

### YouTube

1. Upload video to your church's YouTube channel
2. Click "Share" > "Embed"
3. Copy the iframe code
4. Edit `sermons.html`
5. Replace the placeholder video code with your iframe
6. Commit and push

### Via CMS

1. Go to CMS > Sermons
2. Click "New Sermon"
3. Fill in details
4. Paste YouTube URL in "Video URL" field
5. Publish

---

## 📱 Add Social Media Links

1. Edit `content/settings/general.json` via CMS
2. Or update footer in each HTML file
3. Replace `#` with actual URLs:
```html
<a href="https://facebook.com/yourchurch">
<a href="https://youtube.com/@yourchurch">
<a href="https://instagram.com/yourchurch">
```

---

## 🛠️ Advanced Setup

### Add Google Analytics

1. Create Google Analytics account
2. Get your Measurement ID (looks like: `G-XXXXXXXXXX`)
3. Add to each HTML page before `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Enable Facebook Live Embed

1. Go to your Facebook Page
2. Create a live video
3. Get the embed code
4. Replace in `index.html` and `sermons.html`

---

## 🔄 Making Updates

### After Going Live

1. Edit files locally
2. Test changes
3. Commit:
```bash
git add .
git commit -m "Description of changes"
git push
```
4. Netlify auto-deploys (watch in dashboard)
5. Check live site

### Rollback if Needed

1. In Netlify dashboard > "Deploys"
2. Find previous working version
3. Click "..." > "Publish deploy"

---

## 👥 Train Staff on CMS

### Create Training Accounts

1. Invite staff via Netlify Identity
2. They set their own passwords
3. Give them this guide

### CMS Quick Guide for Staff

**To edit content:**
1. Go to `https://your-site.netlify.app/admin/`
2. Log in
3. Choose what to edit (Pages, Sermons, Events, etc.)
4. Click the item
5. Make changes
6. Click "Save"
7. Changes go live immediately!

**To add a new sermon:**
1. CMS > Sermons > "New Sermon"
2. Fill in title, date, speaker
3. Add YouTube link
4. Upload audio/notes (optional)
5. Publish

**To create an event:**
1. CMS > Events > "New Event"
2. Enter details
3. Set date and time
4. Choose category
5. Publish

---

## ✅ Launch Checklist

Before announcing the new website:

- [ ] All pages load correctly
- [ ] Mobile view works on phone/tablet
- [ ] Forms submit successfully (test each one)
- [ ] Test form notification emails arrive
- [ ] All links work (click every link)
- [ ] Social media links go to correct pages
- [ ] Church contact info is accurate
- [ ] Service times are correct
- [ ] Custom domain is connected (if applicable)
- [ ] HTTPS is enabled (green padlock)
- [ ] CMS login works
- [ ] Staff trained on CMS
- [ ] Google Analytics installed (optional)
- [ ] Favicon added (church logo)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Check loading speed (should be under 3 seconds)
- [ ] Proofread all text for typos
- [ ] Add real photos (replace placeholders)
- [ ] Upload recent sermons
- [ ] Post upcoming events
- [ ] Test accessibility (try keyboard navigation)
- [ ] Verify all embedded videos work

---

## 🆘 Troubleshooting

### "Deploy Failed" on Netlify
- Check build log for errors
- Ensure all files are committed
- Try manual deploy: Drag folder to Netlify

### CMS Won't Load
- Verify Identity is enabled
- Check Git Gateway is enabled
- Clear browser cache

### Forms Not Working
- Check form has `data-netlify="true"` attribute
- Verify in Netlify Forms dashboard
- Redeploy site

### Images Not Showing
- Check file paths (use `/images/filename.jpg`)
- Verify images are committed to GitHub
- Check file names (no spaces)

### Mobile Menu Not Opening
- Check browser console for JavaScript errors
- Verify `js/main.js` is loading
- Clear cache and reload

---

## 📞 Support Resources

- **Netlify Support:** https://www.netlify.com/support/
- **Netlify Docs:** https://docs.netlify.com/
- **GitHub Help:** https://docs.github.com/
- **HTML/CSS Help:** https://developer.mozilla.org/

---

## 🎓 Next Steps After Launch

1. **Announce the new website**
   - Church bulletin
   - Social media posts
   - Email to congregation

2. **Keep content fresh**
   - Upload sermons weekly
   - Update events regularly
   - Share news and announcements

3. **Monitor analytics**
   - Check visitor numbers
   - See which pages are popular
   - Track form submissions

4. **Gather feedback**
   - Ask congregation for input
   - Make improvements
   - Add requested features

5. **Plan for WordPress migration**
   - When ready, content easily exports
   - HTML serves as theme template
   - Smooth transition path

---

**Congratulations! Your church now has a modern, professional website! 🎊**

Need help? Refer back to the main README.md for detailed documentation.
