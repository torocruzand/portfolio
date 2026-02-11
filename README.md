# Andrés - Portfolio Website

An elegant, creative portfolio website with dark/light mode, multi-language support, and smooth animations.

## ✨ Features

- 🎨 **Elegant Dark Theme** with light mode support
- 🌍 **Multi-language Support** (English, Spanish, Brazilian Portuguese)
- ✨ **Smooth Animations** and scroll effects
- 📱 **Fully Responsive** design (mobile, tablet, desktop)
- 🚀 **Fast & Lightweight** - No frameworks, pure HTML/CSS/JS
- 🎭 **Interactive Elements** with hover effects
- 📊 **Project Showcase** with 8 featured projects
- ⏱️ **Professional Timeline** for experience
- 💼 **Modern UI/UX** with gradient accents

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Create a new repository** on GitHub
   - Name it: `yourusername.github.io` (replace `yourusername` with your GitHub username)
   - Set it to Public

2. **Upload files** to your repository:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`

3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Under "Source", select `main` branch
   - Click Save

4. **Visit your site**:
   - Your portfolio will be live at: `https://yourusername.github.io`
   - It may take a few minutes to deploy

### Option 2: Local Development

1. **Download the files** to a folder on your computer

2. **Open in browser**:
   - Double-click `index.html`
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js http-server
     npx http-server
     ```

3. **Visit**: `http://localhost:8000`

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --accent-primary: #667eea;  /* Change primary color */
    --accent-secondary: #764ba2; /* Change secondary color */
}
```

### Adding/Editing Projects

Edit the `projects` array in `script.js`:

```javascript
const projects = [
    {
        name: "Project Name",
        description: "Project description",
        image: "https://your-image-url.jpg",
        web: "https://project-url.com",
        download: "https://download-url.zip",
        github: "https://github.com/username/repo",
        technologies: ["Tech1", "Tech2"],
        categories: ["Category1", "Category2"]
    },
    // Add more projects...
];
```

### Updating Personal Information

1. **Hero Section** - Edit in `index.html`:
   - Line 41-43: Name and title
   - Line 44-46: Description

2. **About Section** - Edit in `index.html`:
   - Lines 114-126: About paragraphs
   - Lines 130-144: Statistics

3. **Experience Timeline** - Edit in `index.html`:
   - Lines 252-318: Experience entries

4. **Contact Information** - Update:
   - Social media links (lines 67-88)
   - Contact cards (lines 326-364)

### Language Translations

Edit the `translations` object in `script.js`:

```javascript
const translations = {
    en: { /* English translations */ },
    es: { /* Spanish translations */ },
    pt: { /* Portuguese translations */ }
};
```

## 📂 File Structure

```
portfolio/
│
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Sections

1. **Hero** - Welcome section with name and introduction
2. **About** - Personal bio and statistics
3. **Skills** - Technologies organized by category
4. **Projects** - Featured projects with links
5. **Experience** - Professional timeline
6. **Contact** - Contact methods and social links
7. **Footer** - Copyright and quick links

## ⚙️ Technologies Used

- HTML5
- CSS3 (with CSS Grid & Flexbox)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter & Space Grotesk)
- SVG Icons

## 📱 Responsive Breakpoints

- Desktop: 1024px and above
- Tablet: 768px - 1023px
- Mobile: Below 768px

## 🎨 Design Features

- **Gradient Orbs** - Animated background elements
- **Glass-morphism** - Modern card designs
- **Smooth Scrolling** - Enhanced navigation
- **Intersection Observer** - Scroll animations
- **Parallax Effects** - Depth and movement
- **Micro-interactions** - Button and link animations

## 🔧 Customization Tips

1. **Images**: Replace project images with your own URLs
2. **Colors**: Use the CSS variables for consistent theming
3. **Fonts**: Change Google Fonts in the `<head>` section
4. **Animations**: Adjust timing in CSS keyframes
5. **Content**: Update all text in HTML or translations in JS

## 📄 License

This portfolio template is free to use for personal projects. Feel free to customize it to match your style!

## 🤝 Credits

- Design & Development: Andrés
- Fonts: Google Fonts (Inter, Space Grotesk)
- Icons: Custom SVG icons

## 📞 Support

For questions or issues:
- Email: torocruzand@gmail.com
- GitHub: [@torocruzand](https://github.com/torocruzand)

---

Made with ❤️ by Andrés
