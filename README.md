# 🌾 FarmAI Insights

**AI-Powered Farming Assistant with Voice Control**

FarmAI Insights is a comprehensive web application designed to help farmers make informed decisions using advanced weather prediction, crop analysis, and AI-powered recommendations. The application features a built-in voice assistant for hands-free interaction and supports multiple Indian languages.

![FarmAI Insights Screenshot](./preview.png)

## ✨ Key Features

### 🎯 Core Functionality
- **Smart Weather Prediction**: Detailed 7-day forecasts with crop-specific weather analysis
- **Crop Growth Conditions**: Real-time assessment of optimal growing conditions for major crops
- **Risk Assessment**: Irrigation advice and pest risk evaluation
- **Weather Alerts**: Proactive notifications for weather changes affecting crops
- **Pesticide Recommendations**: AI-powered suggestions for crop protection
- **Chemical Analysis**: Optimal chemical recommendations for better yield
- **Image Analysis**: AI-powered crop and soil analysis through photo uploads
- **Crop Library**: Comprehensive database of crops with detailed information

### 🗣️ Voice Assistant
- **Voice Navigation**: Navigate through the app using voice commands
- **Multilingual Support**: Works in English and Hindi
- **Smart Commands**: Understands natural language requests
- **Text-to-Speech**: Provides audio feedback and responses

### 🌍 Language Support
- **English**: Full interface and voice support
- **Hindi**: Complete translation with native voice recognition
- **Extensible**: Ready for additional Indian languages

### 📱 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Enhanced user experience with Motion/React
- **Gradient Themes**: Beautiful, modern design with gradients and glassmorphism
- **Accessibility**: Built with accessibility best practices

## 🚀 Live Demo

🔗 **[Visit FarmAI Insights](https://your-username.github.io/farmai-insights)**

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Animations**: Motion (Framer Motion)
- **Charts**: Recharts
- **Voice**: Web Speech API
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser with Web Speech API support

### Local Development
```bash
# Clone the repository
git clone https://github.com/your-username/farmai-insights.git
cd farmai-insights

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production
```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🌐 GitHub Pages Deployment

### Automatic Deployment
1. **Fork this repository** to your GitHub account
2. **Update configuration**:
   - Edit `vite.config.js` and change the `base` to your repository name
   - Update `package.json` homepage URL
3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Choose "GitHub Actions" as source
4. **Push changes** - the site will automatically deploy

### Manual Deployment
```bash
# Build and deploy to GitHub Pages
npm run deploy
```

### Custom Domain (Optional)
1. Add `CNAME` file with your domain
2. Configure DNS settings
3. Enable HTTPS in repository settings

## 🎮 Usage Guide

### Getting Started
1. **Select Language**: Choose between English and Hindi
2. **Login**: Enter your name and phone number
3. **Explore Features**: Use the dashboard to access different modules

### Voice Commands
- "Weather" - Opens weather prediction
- "Crops" - Access crop library
- "Analysis" - Opens image analysis
- "Dashboard" - Returns to main dashboard
- "Help" - Shows available commands

### Weather Analysis
- Select your state and city
- Get detailed weather forecasts
- Review crop-specific growing conditions
- Check irrigation and pest risk recommendations

## 🔧 Customization

### Adding New Languages
1. Update translation objects in each component
2. Add language option in `LanguageSelection.tsx`
3. Configure voice recognition language codes

### Modifying Crop Data
Edit crop information in:
- `WeatherPrediction.tsx` - Weather-crop correlations
- `CropLibrary.tsx` - Crop database

### Styling Changes
- Colors: Edit CSS variables in `styles/globals.css`
- Components: Modify Tailwind classes
- Animations: Adjust Motion components

## 🌐 Browser Compatibility

### Fully Supported
- Chrome 60+
- Firefox 70+
- Safari 14+
- Edge 79+

### Feature Compatibility
- **Voice Recognition**: Chrome, Edge (best support)
- **Speech Synthesis**: All modern browsers
- **Responsive Design**: All modern browsers

## 📱 Mobile Optimization

- **Touch-friendly interface**
- **Responsive layouts**
- **Optimized images**
- **Fast loading times**
- **Mobile voice commands**

## 🔒 Privacy & Security

- **No data collection**: All processing happens locally
- **No external API calls**: Uses mock data for demonstrations
- **Browser-only storage**: No server-side data storage
- **HTTPS ready**: Secure deployment configuration

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines
- Follow React best practices
- Use TypeScript for type safety
- Maintain responsive design
- Test voice commands
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues
1. **Voice not working**: Enable microphone permissions
2. **Build errors**: Clear node_modules and reinstall
3. **Deployment issues**: Check GitHub Pages settings

### Getting Help
- 📧 Email: support@farmai-insights.com
- 💬 Issues: GitHub Issues tab
- 📖 Docs: This README and code comments

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful components
- **Unsplash** for crop imagery
- **Lucide** for icons
- **Tailwind CSS** for styling system
- **Motion** for animations

## 🔮 Future Enhancements

- [ ] Real weather API integration
- [ ] Machine learning crop predictions
- [ ] Offline mode support
- [ ] More Indian languages
- [ ] Mobile app version
- [ ] Farmer community features

---

<div align="center">

**Made with ❤️ for farmers everywhere**

[⭐ Star this repo](https://github.com/your-username/farmai-insights) • [🐛 Report Bug](https://github.com/your-username/farmai-insights/issues) • [💡 Feature Request](https://github.com/your-username/farmai-insights/issues)

</div>