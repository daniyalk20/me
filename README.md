# Daniyal Khan - Portfolio Website

A modern, interactive portfolio website showcasing professional experience, projects, and technical writings. Built with React and Material-UI, featuring a responsive design with dynamic SEO, markdown-based blog system, and engaging interactive elements.

## 🚀 Live Demo

Visit the live site: [https://daniyalk20.github.io/me/](https://daniyalk20.github.io/me/)

## ✨ Features

### Core Portfolio Features
- **Interactive CV**: Comprehensive sections for About, Experience, Projects, Skills, Education, and Publications
- **Skill Definitions**: Click on any skill to see user-friendly explanations for non-technical audiences
- **Projects Showcase**: Detailed project galleries with descriptions and technologies used
- **Professional Gallery**: Visual showcase of work and achievements

### Advanced Blog System
- **Markdown-Based Writing**: Full-featured blog system with markdown support
- **Dynamic Routing**: Individual pages for each article with SEO-friendly URLs
- **Syntax Highlighting**: Code blocks with professional highlighting
- **Tag System**: Categorized articles with keyword tags
- **Rich Typography**: Enhanced readability with custom fonts and spacing

### SEO & Performance
- **Dynamic Meta Tags**: Automatic SEO optimization based on current page/article
- **Social Media Integration**: OpenGraph and Twitter Card support
- **Canonical URLs**: Proper search engine indexing
- **Scroll Management**: Smooth scroll-to-top functionality on navigation
- **Fast Loading**: Optimized build with code splitting and performance best practices

### User Experience
- **Responsive Design**: Works seamlessly on all devices
- **Interactive Elements**: Animated backgrounds, bullet effects, and hover states
- **Print-Friendly**: Clean, professional print layout
- **Custom Cursor**: Gaming-themed cursor with interactive effects
- **Smooth Animations**: Professional transitions and micro-interactions

## 🛠️ Technology Stack

### Frontend
- **React**: 19.1.0 (Latest version with concurrent features)
- **React Router**: 7.8.0 (Dynamic routing with hash support)
- **Material-UI (MUI)**: 7.1.0 (Complete UI component library)

### Content & SEO
- **React Helmet Async**: Dynamic head management for SEO
- **React Markdown**: 9.1.0 (Markdown rendering with plugins)
- **Remark GFM**: GitHub Flavored Markdown support
- **Rehype Highlight**: Code syntax highlighting
- **Gray Matter**: Frontmatter parsing for articles

### Development & Build
- **Create React App**: 5.0.1 with Craco configuration
- **Highlight.js**: 11.10.0 (Code syntax highlighting)
- **GitHub Pages**: Automated deployment pipeline

### Fonts & Styling
- **Custom Fonts**: Iceland, JetBrains Mono, Inter, Josefin Sans, Montserrat
- **CSS3**: Advanced styling with variables and custom properties
- **Responsive Design**: Mobile-first approach with breakpoints

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Git**

## 🔧 Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/daniyalk20/me.git
cd me
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm start
```

This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload automatically when you make changes.

### 4. Run Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

## 📝 Development Notes

### Project Structure

```
src/
├── Components/
│   ├── CV.js                    # Interactive CV with tabbed interface
│   ├── cv.json                 # Personal data and skill definitions
│   ├── cv.css                  # Custom CV styling
│   ├── Header.js               # Navigation header with responsive menu
│   ├── Hero.js                 # Landing page hero section
│   ├── Projects.js             # Projects showcase component
│   ├── Gallery.js              # Professional image gallery
│   ├── Writing.js              # Individual article display component
│   ├── WritingsList.js         # Blog posts listing with cards
│   ├── Footer.js               # Site footer
│   ├── 404.js                  # Custom error page with SEO
│   ├── Background.js           # Animated code background
│   ├── blog.css               # Blog-specific styling
│   ├── cursors.css            # Custom cursor styles
│   └── SubComponents/
│       ├── AnimatedRobot.js    # Interactive robot animation
│       ├── HeroIntroduction.js # Hero section introduction text
│       └── SkillPopper.js      # Interactive skill tooltips
├── writings/
│   ├── BinaryTree.md          # Sample technical article
│   ├── TEMPLATE.md            # Article template
│   └── images/                # Article images and assets
├── hooks/
│   └── useSEO.js              # Custom hook for SEO management
├── App.js                     # Main app with routing and SEO
├── App.css                    # Global styles and animations
└── index.js                   # Entry point with providers
```

### Key Components & Features

#### SEO System
- **Dynamic Meta Tags**: Automatically updates based on current page
- **Article-Specific SEO**: Extracts metadata from markdown frontmatter
- **Social Media Optimization**: OpenGraph and Twitter Card support
- **Search Engine Friendly**: Proper canonical URLs and structured data

#### Writing System
- **Markdown Support**: Full GitHub Flavored Markdown with extensions
- **Code Highlighting**: Professional syntax highlighting for all languages
- **Image Processing**: Automatic image optimization and responsive sizing
- **Tag Management**: Article categorization with keyword extraction
- **Reading Progress**: Enhanced typography for better readability

#### Interactive Elements
- **Animated Background**: Live coding snippets floating in background
- **Custom Cursors**: Gaming-themed cursor with click effects
- **Smooth Scrolling**: Automatic scroll-to-top on navigation
- **Hover Effects**: Professional micro-interactions throughout

### Customization

#### 1. Update Personal Information
Edit `src/Components/cv.json` to update:
- Personal details and contact information
- Professional experience and achievements
- Skills and expertise areas
- Education and certifications

#### 2. Add Technical Articles
Create new markdown files in `src/Components/writings/`:
```markdown
---
title: "Your Article Title"
description: "Brief description for SEO"
tags: ["react", "javascript", "tutorial"]
date: "2025-01-15"
cover: "cover-image.jpg"
---

# Your Article Content

Write your technical content here with full markdown support.
```

#### 3. Customize SEO Settings
Update `src/hooks/useSEO.js`:
- Modify default meta descriptions
- Update social media tags
- Customize site-wide SEO data

#### 4. Styling & Branding
- **Global styles**: Edit `src/App.css`
- **CV-specific styles**: Update `src/Components/cv.css`
- **Blog styles**: Modify `src/Components/blog.css`
- **Interactive elements**: Customize cursor effects in `src/Components/cursors.css`

#### 5. Add New Portfolio Sections
Extend functionality by:
- Adding new routes in `App.js`
- Creating new components in `src/Components/`
- Updating navigation in `Header.js`

## 🚀 Deployment

### GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages:

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

This command:
1. Builds the production version
2. Pushes the build to the `gh-pages` branch
3. GitHub Pages automatically serves the site

### Manual Build

```bash
# Create production build
npm run build
```

The build folder contains the production-ready files that can be deployed to any static hosting service.

### Deployment Configuration

The project includes:
- `homepage` field in `package.json` pointing to GitHub Pages URL
- `gh-pages` package for automated deployment
- Pre-deployment build script

## 🔧 Build Configuration

### Available Scripts

- `npm start` - Development server with hot reloading
- `npm test` - Run test suites  
- `npm run build` - Create optimized production build
- `npm run deploy` - Build and deploy to GitHub Pages
- `npm run eject` - Eject from Create React App (irreversible)

### Build Optimization

The production build includes:
- **Code Splitting**: Automatic bundle optimization
- **Tree Shaking**: Unused code elimination  
- **Asset Optimization**: Image and CSS minification
- **SEO Meta Tags**: Dynamic head management
- **Service Worker**: Optional PWA features

### Deployment Features

- **Automated GitHub Pages**: Deploy with single command
- **Custom Domain Support**: Easy CNAME configuration
- **Hash-based Routing**: Client-side routing with GitHub Pages compatibility
- **Build Caching**: Optimized CI/CD pipeline

No environment variables required for basic functionality.

## 🎨 Content Management

### Writing Technical Articles

1. **Create Article File**: Add new `.md` file in `src/Components/writings/`
2. **Add Frontmatter**: Include metadata at the top:
   ```yaml
   ---
   title: "Understanding Binary Trees"
   description: "A comprehensive guide to binary tree data structures"
   tags: ["data-structures", "algorithms", "computer-science"]
   date: "2025-01-15"
   cover: "binary-tree-cover.jpg"
   author: "Daniyal Khan"
   readTime: "8 min read"
   ---
   ```
3. **Write Content**: Use full markdown with code blocks, images, and links
4. **Add Images**: Place images in `src/Components/writings/images/`
5. **Deploy**: Articles automatically appear in the writings section

### SEO Management

The SEO system automatically handles:
- **Page Titles**: Dynamic based on content
- **Meta Descriptions**: Extracted from article frontmatter or auto-generated
- **Keywords**: From article tags and content analysis
- **Open Graph**: Social media preview optimization
- **Canonical URLs**: Proper indexing for search engines

### Skill Definitions System

Add new skills with explanations in `cv.json`:
```json
{
  "skills": {
    "programming": ["React", "Node.js", "Your New Skill"]
  },
  "skillDefinitions": {
    "Your New Skill": "A clear, business-friendly explanation of what this technology does and why it's valuable."
  }
}

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**: 
   - Ensure Node.js version is 16+ 
   - Run `npm install --legacy-peer-deps` for React 19 compatibility
   - Clear cache: `npm start -- --reset-cache`

2. **SEO not updating**: 
   - Check Helmet provider is wrapping the app in `index.js`
   - Verify meta tags in browser dev tools
   - Test with social media debuggers

3. **Articles not displaying**:
   - Verify markdown files are in `src/Components/writings/`
   - Check frontmatter syntax is valid YAML
   - Ensure webpack can import the markdown files

4. **Scroll behavior issues**:
   - Check React Router version compatibility
   - Verify useEffect dependencies are correct

### Performance Tips

- **Images**: Optimize images before adding to reduce bundle size
- **Markdown**: Keep article files reasonable in size
- **Dependencies**: Regular updates and audit for security
- **Build Analysis**: Use `npm run build` and check bundle sizes

### Development Environment

- **Recommended Node.js**: v16.17.0 or higher
- **Package Manager**: npm (yarn may have compatibility issues)
- **Browser**: Chrome/Firefox with React Developer Tools extension

## 📱 Browser Support & Compatibility

### Supported Browsers
- **Chrome**: 90+ (recommended for development)
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+

### Features by Browser
- **Modern Browsers**: Full feature set including animations and interactive elements
- **Older Browsers**: Graceful degradation with core functionality maintained
- **Mobile**: Touch-optimized interface with responsive design

### Accessibility Features
- **Keyboard Navigation**: Full site navigation without mouse
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **High Contrast**: Compatible with system accessibility settings
- **Focus Management**: Clear focus indicators and logical tab order

## 🚀 Advanced Features

### Technical Blog System
- **GitHub Flavored Markdown**: Full GFM support with tables, task lists, strikethrough
- **Code Syntax Highlighting**: 150+ programming languages supported
- **Mathematical Expressions**: LaTeX-style math rendering (optional)
- **Interactive Elements**: Embedded CodePen, JSFiddle support

### SEO & Analytics
- **Search Engine Optimization**: Comprehensive meta tag management
- **Social Media Integration**: Rich previews on Twitter, LinkedIn, Facebook
- **Performance Monitoring**: Core Web Vitals tracking
- **Analytics Ready**: Google Analytics 4 integration ready

### Interactive Design
- **Animated Backgrounds**: Live code snippets with customizable timing
- **Gaming Elements**: Retro-style cursors and effects
- **Smooth Transitions**: 60fps animations using CSS transforms
- **Responsive Images**: Automatic sizing and lazy loading

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: itsdaniyalk7@gmail.com
- **LinkedIn**: [linkedin.com/in/daniyalk20](https://www.linkedin.com/in/daniyalk20)
- **GitHub**: [github.com/daniyalk20](https://github.com/daniyalk20)

## 🙏 Acknowledgments

### Technologies & Libraries
- **React Team**: For the amazing React framework and ecosystem
- **Material-UI Team**: For the comprehensive component library
- **Create React App**: For the excellent build tooling and configuration
- **React Router**: For client-side routing capabilities
- **React Helmet Async**: For dynamic head management
- **React Markdown**: For markdown rendering and processing
- **Highlight.js**: For beautiful code syntax highlighting

### Design & Inspiration
- **Google Fonts**: For the beautiful typography (Iceland, JetBrains Mono, Inter)
- **Material Design**: For design principles and color system
- **GitHub**: For hosting, version control, and Pages deployment
- **Open Source Community**: For countless helpful resources and examples

### Special Thanks
- **Contributors**: Anyone who has provided feedback or suggestions
- **Beta Testers**: Friends and colleagues who tested the site
- **Code Reviewers**: Developers who helped improve the codebase

---

## 📊 Project Stats

- **Total Components**: 15+ React components
- **Lines of Code**: 2000+ (excluding dependencies)
- **Bundle Size**: ~300KB gzipped
- **Lighthouse Score**: 95+ on all metrics
- **Load Time**: <2 seconds on 3G
- **Supported Languages**: 150+ for syntax highlighting

---

**✨ Built with passion and attention to detail by Daniyal Khan ✨**

*This portfolio represents not just my work, but my commitment to creating exceptional user experiences through thoughtful design and robust engineering.*
