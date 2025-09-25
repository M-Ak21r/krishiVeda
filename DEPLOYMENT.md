# 🚀 FarmAI Insights Deployment Guide

## Quick Start Deployment

### 1. GitHub Repository Setup
```bash
# Create new repository on GitHub
# Clone and setup
git clone https://github.com/YOUR_USERNAME/farmai-insights.git
cd farmai-insights

# Install dependencies
npm install
```

### 2. Configuration Updates
Before deploying, update these files:

**`vite.config.js`**
```javascript
export default defineConfig({
  base: '/YOUR_REPOSITORY_NAME/', // Change this!
  // ... rest of config
})
```

**`package.json`**
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME"
}
```

### 3. GitHub Pages Setup
1. Go to repository **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Push any commit to main branch
4. Site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME`

## Manual Deployment Steps

### Option 1: Automatic with GitHub Actions (Recommended)
1. Push to main branch
2. GitHub Actions will automatically build and deploy
3. Check the Actions tab for deployment status

### Option 2: Manual with gh-pages
```bash
npm run deploy
```

### Option 3: Manual Build and Upload
```bash
npm run build
# Upload dist/ folder contents to gh-pages branch
```

## Performance Optimization

### Pre-deployment Checklist
- [ ] Update repository name in `vite.config.js`
- [ ] Update homepage URL in `package.json`
- [ ] Test locally with `npm run build && npm run preview`
- [ ] Verify all images load correctly
- [ ] Test voice assistant functionality
- [ ] Check mobile responsiveness
- [ ] Verify all language translations work

### Browser Compatibility Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Voice Assistant Testing
- [ ] Microphone permissions work
- [ ] Voice recognition in English
- [ ] Voice recognition in Hindi
- [ ] Text-to-speech playback
- [ ] Navigation commands work

## Troubleshooting

### Common Issues

**❌ White screen after deployment**
- Check browser console for errors
- Verify `base` path in `vite.config.js`
- Ensure all assets are loading from correct path

**❌ Voice assistant not working**
- Check HTTPS - voice features require secure context
- Verify microphone permissions
- Test in supported browsers (Chrome recommended)

**❌ 404 errors on refresh**
- Ensure `404.html` is in public folder
- GitHub Pages should handle SPA routing

**❌ Images not loading**
- Check image paths in components
- Verify Unsplash API calls work
- Check browser network tab

### Debugging Commands
```bash
# Test build locally
npm run build
npm run preview

# Check for broken links
npm run build
npx serve dist

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Custom Domain Setup (Optional)

### 1. DNS Configuration
Add CNAME record pointing to: `YOUR_USERNAME.github.io`

### 2. GitHub Settings
1. Add custom domain in Settings → Pages
2. Enable "Enforce HTTPS"
3. Wait for DNS propagation (24-48 hours)

### 3. Update Configuration
```javascript
// vite.config.js
export default defineConfig({
  base: '/', // Change back to root for custom domain
})
```

## Environment Variables

### Production Environment
- No API keys required (uses mock data)
- All processing happens client-side
- No backend services needed

### Security Notes
- No sensitive data stored
- All voice processing is local
- No external API calls in production

## Monitoring & Analytics

### GitHub Pages Analytics
- View traffic in repository Insights
- Monitor deployment status in Actions tab
- Check Pages deployment logs

### Performance Monitoring
```bash
# Lighthouse audit
npx lighthouse https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME --view

# Bundle analysis
npm run build
npx vite-bundle-analyzer dist/stats.html
```

## Advanced Configuration

### PWA Support (Future Enhancement)
```javascript
// vite.config.js - Add PWA plugin
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})
```

### CDN Optimization
- GitHub Pages automatically serves from global CDN
- No additional CDN setup required
- Files are cached and distributed globally

## Support

### Getting Help
1. Check deployment logs in GitHub Actions
2. Review browser console for errors
3. Test locally first with `npm run preview`
4. Create issue in repository if needed

### Useful Links
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Web Speech API Support](https://caniuse.com/speech-recognition)

---

✅ **Ready to deploy? Push to main branch and watch the magic happen!**