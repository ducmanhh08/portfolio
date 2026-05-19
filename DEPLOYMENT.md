# Deployment Guide 🚀

Learn how to deploy your portfolio to various platforms.

## 🔄 Pre-Deployment Checklist

- [ ] All personal information updated
- [ ] All links are correct
- [ ] Images are optimized
- [ ] Meta tags and SEO are configured
- [ ] Contact form backend is set up (if applicable)
- [ ] Project links are working
- [ ] Social links are correct
- [ ] Website tested on multiple devices
- [ ] Build completes without errors: `npm run build`

## 🎯 Quick Deploy Options

### 1. Vercel (Recommended) ⚡

Vercel is the creator of Next.js and provides the best experience for Next.js applications.

#### Steps:
1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Sign up with GitHub
4. Click "New Project"
5. Select your portfolio repository
6. Click "Deploy"

**That's it!** Your portfolio is live at `portfolio.vercel.app`

#### Custom Domain on Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update your domain's DNS settings pointing to Vercel's nameservers
4. Verify the domain

### 2. Netlify 🌐

#### Steps:
1. Push to GitHub (same as above)
2. Go to [netlify.com](https://netlify.com)
3. Sign up with GitHub
4. Click "Add new site" → "Import an existing project"
5. Select your repository
6. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
7. Click "Deploy site"

#### Custom Domain on Netlify:
1. Domain settings → "Add custom domain"
2. Follow DNS setup instructions
3. Configure SSL certificate (automatic)

### 3. GitHub Pages 📄

#### Steps:
1. Update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  basePath: '/portfolio', // if deploying to portfolio subdirectory
};
export default nextConfig;
```

2. Build: `npm run build`
3. Push to GitHub
4. Go to repository Settings → Pages
5. Select "Deploy from a branch"
6. Branch: `main`, folder: `/root` (or `/docs` if you move build)
7. Save

### 4. AWS Amplify ☁️

#### Steps:
1. Push to GitHub
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
3. Click "Create app" → "Host web app"
4. Connect GitHub repository
5. Select your repo and branch
6. Build settings - use defaults for Next.js
7. Click "Deploy"

### 5. DigitalOcean App Platform

#### Steps:
1. Push to GitHub
2. Go to [DigitalOcean](https://www.digitalocean.com/)
3. Create App → Select GitHub repo
4. Choose Node.js environment
5. Build command: `npm run build`
6. Run command: `npm run start`
7. Deploy

### 6. Railway 🚂

#### Steps:
1. Push to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project
4. Connect GitHub
5. Select your repository
6. Automatic detection for Next.js
7. Deploy

### 7. Self-Hosted (VPS)

#### Requirements:
- Node.js 18+ installed
- Nginx or Apache as reverse proxy
- SSL certificate (Let's Encrypt)
- Domain configured

#### Steps:
1. SSH into your server
2. Clone repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

3. Install dependencies:
```bash
npm install
npm run build
```

4. Install PM2 (process manager):
```bash
npm install -g pm2
```

5. Start application:
```bash
pm2 start npm --name "portfolio" -- start
pm2 startup
pm2 save
```

6. Configure Nginx:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. Set up SSL (Let's Encrypt):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## 🌐 Custom Domain Setup

### Update DNS Records

For most domain registrars (GoDaddy, Namecheap, etc.):

1. Find DNS settings in your registrar's control panel
2. Add records:
   - **Type**: CNAME
   - **Name**: www (or @ for root)
   - **Value**: Your platform's domain (see below)

#### Platform-Specific DNS:
- **Vercel**: `cname.vercel.app`
- **Netlify**: `your-site.netlify.app`
- **AWS Amplify**: `d123.amplifyapp.com`

### SSL Certificate

Most platforms automatically provide free SSL certificates. If self-hosting, use Let's Encrypt.

## 📊 Post-Deployment

### 1. Set Up Analytics

Add Google Analytics (already covered in CUSTOMIZATION.md)

### 2. Test Website

- [ ] Visit your domain
- [ ] Test all navigation links
- [ ] Test contact form
- [ ] Test on mobile
- [ ] Check page speed: [PageSpeed Insights](https://pagespeed.web.dev)
- [ ] Test SEO: [SEO Checker](https://www.seobility.net/)

### 3. Performance Optimization

```bash
# Check lighthouse score
npm install -g lighthouse
lighthouse https://yourdomain.com --view
```

### 4. Set Up Monitoring

- **Uptime Monitoring**: [UptimeRobot](https://uptimerobot.com)
- **Error Tracking**: [Sentry](https://sentry.io)
- **Performance**: [New Relic](https://newrelic.com)

## 🔄 Continuous Deployment

Most platforms automatically deploy when you push to GitHub.

### Manual Deployment

If needed, manually trigger deployment from platform dashboard.

### Environment Variables

If you add environment variables, configure them in:
- Vercel: Project Settings → Environment Variables
- Netlify: Build & Deploy → Environment
- AWS Amplify: App Settings → Environment variables

## 🐛 Troubleshooting

### Build Failed
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### 404 Errors on Subpaths
Check that routes are correctly configured. For Next.js App Router, this should be automatic.

### Slow Performance
- Optimize images
- Enable caching
- Use CDN (most platforms do this)
- Minify CSS/JS (automatic)

### Contact Form Not Working
Ensure your backend API is deployed and accessible.

## 📈 Recommended Configuration

### Production Optimizations

Update `next.config.ts`:
```typescript
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Generate sitemap
  // (requires separate package)
  
  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
};
```

## 🎯 Domain Registration

Recommended registrars:
- [Namecheap](https://namecheap.com) - Affordable
- [GoDaddy](https://godaddy.com) - Popular
- [Google Domains](https://domains.google) - Easy integration

Typical cost: $8-15/year

## 📱 Mobile Testing

Test on real devices:
- Use Chrome DevTools device emulation
- Test on actual mobile device
- Use BrowserStack for cross-device testing

## ✅ Final Checklist

- [ ] Domain is registered and points to deployment
- [ ] SSL certificate is valid
- [ ] All pages load correctly
- [ ] Contact form works
- [ ] Mobile responsive design verified
- [ ] Social links working
- [ ] Project links working
- [ ] Analytics configured
- [ ] SEO meta tags verified
- [ ] Performance is acceptable (>90 Lighthouse score)

## 🎉 You're Live!

Congratulations! Your portfolio is now live on the internet. Share it with potential clients and employers!

## 📞 Support

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)
- [Netlify Support](https://netlify.com/support)

---

**Happy deploying! 🚀**
