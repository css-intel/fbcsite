# Friendship Baptist Church Website

A modern, mobile-optimized church website built with HTML, CSS, and JavaScript. Ready for deployment to Netlify with built-in CMS capabilities.

## 🎨 Features

- **Fully Responsive Design** - Mobile-first approach, looks great on all devices
- **Brand-Aligned Styling** - Maroon (#800000) and Gold (#C5A253) color scheme
- **Complete Page Structure** - Home, About, Ministries, Sermons, Events, Give, Visit, Contact
- **Netlify CMS Integration** - Easy content management without coding
- **Netlify Forms** - Contact forms, prayer requests, giving, and visitor forms
- **Accessibility Compliant** - WCAG 2.1 AA standards
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Fast Loading** - Optimized assets and minimal dependencies

## 📁 Project Structure

```
friendship-baptist-church/
├── index.html              # Homepage
├── about.html              # About page (Mission, Beliefs, History, Team)
├── ministries.html         # All ministries
├── sermons.html            # Sermon archive and live stream
├── events.html             # Event calendar
├── give.html               # Online giving
├── visit.html              # Plan a visit
├── contact.html            # Contact form and staff directory
├── css/
│   ├── styles.css          # Main stylesheet
│   └── pages.css           # Page-specific styles
├── js/
│   └── main.js             # JavaScript functionality
├── admin/
│   ├── index.html          # Netlify CMS entry point
│   └── config.yml          # CMS configuration
├── content/                # JSON content files for CMS
│   ├── home.json
│   ├── settings/
│   ├── sermons/
│   ├── events/
│   ├── ministries/
│   └── staff/
├── images/
│   └── uploads/            # User-uploaded media
├── netlify.toml            # Netlify configuration
└── README.md               # This file
```

## 🚀 Deployment to Netlify

### Option 1: Deploy from GitHub (Recommended)

1. **Create a GitHub Repository**
   ```bash
   cd friendship-baptist-church
   git init
   git add .
   git commit -m "Initial commit - Friendship Baptist Church website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/friendship-baptist-church.git
   git push -u origin main
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "Add new site" > "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select your `friendship-baptist-church` repository
   - Build settings (should auto-detect):
     - **Build command:** Leave empty (static site)
     - **Publish directory:** `.` (root directory)
   - Click "Deploy site"

3. **Enable Netlify Identity (for CMS Access)**
   - In your Netlify site dashboard, go to "Identity"
   - Click "Enable Identity"
   - Go to "Settings" > "Registration preferences" > Set to "Invite only"
   - Click "Invite users" and add admin email addresses

4. **Configure Git Gateway (for CMS)**
   - In Identity settings, go to "Services" > "Git Gateway"
   - Click "Enable Git Gateway"

5. **Access the CMS**
   - Go to `https://your-site-name.netlify.app/admin/`
   - Accept the invitation email from Netlify
   - Set your password
   - Log in to manage content

### Option 2: Drag and Drop Deploy

1. Go to [netlify.com](https://netlify.com)
2. Drag the entire `friendship-baptist-church` folder onto the deploy zone
3. Your site will be live in seconds!
4. For CMS functionality, you'll still need to follow steps 3-5 from Option 1

### Option 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to project
cd friendship-baptist-church

# Deploy
netlify deploy --prod
```

## 🔧 Custom Domain Setup

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain (e.g., `friendshipbaptist.org`)
4. Follow DNS configuration instructions
5. Enable HTTPS (free SSL certificate)

## 📝 Content Management

### Accessing the CMS

1. Navigate to `https://your-site.com/admin/`
2. Log in with your Netlify Identity credentials
3. Edit content through the visual interface

### Managing Content

The CMS allows you to edit:

- **Pages** - Hero sections, pastor greetings, about content
- **Sermons** - Add new sermons with video/audio links
- **Events** - Create and manage church events
- **Ministries** - Add/edit ministry information
- **Staff** - Update staff profiles and photos
- **Settings** - Church info, service times, social links
- **Announcements** - Site-wide announcements

### Adding Images

1. In the CMS, click any image field
2. Upload new images or select from media library
3. Images are stored in `/images/uploads/`

## 🛠️ Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/friendship-baptist-church.git
   cd friendship-baptist-church
   ```

2. **Run a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📧 Form Submissions

Forms are handled by Netlify Forms. View submissions in:
- Netlify Dashboard > Forms

Available forms:
- General Contact Form
- Prayer Request Form
- Visitor Planning Form
- Online Giving Form (information collection)

To receive email notifications:
1. Go to Netlify Dashboard > Forms
2. Click "Form notifications"
3. Add email notification rules

## 🎨 Customization

### Brand Colors

Edit in `css/styles.css`:

```css
:root {
    --primary-maroon: #800000;
    --secondary-gold: #C5A253;
    --off-white: #F9F9F9;
    --neutral-dark: #2C2C2C;
    --neutral-light: #E8E8E8;
}
```

### Fonts

Current fonts (from Google Fonts):
- Headings: Merriweather (serif)
- Subheadings: Montserrat (sans-serif)
- Body: Open Sans (sans-serif)

To change fonts, edit the Google Fonts link in HTML files.

### Church Information

Update church details in:
- `/content/settings/general.json` (via CMS)
- Or directly edit HTML files

## 🔄 Migrating to WordPress

When ready to migrate to WordPress:

1. **Export Content**
   - All content is in `/content/` folder as JSON
   - Images in `/images/uploads/`
   - Easy to import via WordPress REST API or plugins

2. **Theme Development**
   - Use existing HTML as theme template structure
   - CSS can be integrated into WordPress theme
   - JavaScript functions can be enqueued in `functions.php`

3. **Recommended Approach**
   - Use a starter theme like Underscores
   - Copy HTML structure into template files
   - Port CSS to theme stylesheet
   - Migrate forms to Contact Form 7 or Gravity Forms

## 📱 Social Media Integration

Update social links in:
- Footer of each HTML page
- `/content/settings/general.json` (via CMS)

Embed codes:
- **YouTube**: Replace iframe src in `sermons.html`
- **Facebook Live**: Replace embed code in sermon media section

## 🔒 Security Features

- HTTPS enforced (via Netlify)
- XSS Protection headers
- Content Security Policy
- Form spam protection (Netlify honeypot)
- Invite-only CMS access

## 📊 Analytics

### Google Analytics

Add to each HTML file before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Netlify Analytics

Enable in Netlify Dashboard > Analytics (paid feature)

## 🐛 Troubleshooting

### Forms not submitting
- Ensure `netlify` attribute is in form tag: `data-netlify="true"`
- Check Netlify dashboard > Forms to verify form detection
- Clear cache and redeploy

### CMS not loading
- Verify Netlify Identity is enabled
- Check Git Gateway is configured
- Ensure user is invited and accepted invitation

### Images not displaying
- Check file paths are relative (start with `/` or `./`)
- Verify images are in `/images/uploads/`
- Check file names don't have spaces (use hyphens)

### Mobile menu not working
- Check JavaScript is loading (`/js/main.js`)
- Look for console errors in browser dev tools

## 📞 Support

For issues specific to:
- **Netlify**: [Netlify Support](https://www.netlify.com/support/)
- **Netlify CMS**: [Netlify CMS Docs](https://www.netlifycms.org/docs/)
- **Web Development**: [MDN Web Docs](https://developer.mozilla.org/)

## 📄 License

This website template is created for Friendship Baptist Church. Modify and use as needed.

## ✅ Pre-Launch Checklist

- [ ] Test all pages on mobile, tablet, desktop
- [ ] Verify all forms submit successfully
- [ ] Test navigation and internal links
- [ ] Check all images load properly
- [ ] Verify social media links are correct
- [ ] Update church contact information
- [ ] Test CMS login and content editing
- [ ] Add real sermon videos/audio
- [ ] Set up custom domain
- [ ] Enable HTTPS
- [ ] Configure form notifications
- [ ] Add Google Analytics
- [ ] Test accessibility with screen reader
- [ ] Check page load speed
- [ ] Invite CMS users
- [ ] Train staff on CMS usage

## 🚀 Future Enhancements

Consider adding:
- Online event registration with payment
- Member login portal
- Small group finder
- Podcast RSS feed
- Newsletter subscription
- Online prayer wall
- Livestream chat integration
- Mobile app integration
- Multi-language support

---

Built with ❤️ for Friendship Baptist Church
