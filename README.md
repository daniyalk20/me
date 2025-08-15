# Daniyal Khan - Portfolio Website

A modern, interactive portfolio website showcasing professional experience, projects, and skills. Built with React and Material-UI, featuring a responsive design with tabbed navigation and interactive skill definitions.

## 🚀 Live Demo

Visit the live site: [https://daniyalk20.github.io/me/](https://daniyalk20.github.io/me/)

## ✨ Features

- **Interactive CV**: Tabbed navigation with sections for About, Experience, Projects, Skills, Education, and Publications
- **Skill Definitions**: Click on any skill to see user-friendly explanations for non-technical audiences
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Print-Friendly**: Clean, professional print layout
- **Modern UI**: Built with Material-UI components and custom styling
- **Fast Loading**: Optimized build with code splitting and performance best practices

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0
- **UI Library**: Material-UI (MUI) 7.1.0
- **Icons**: Material-UI Icons
- **Styling**: CSS3 with custom variables and Material-UI theming
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages
- **Fonts**: Iceland, Inter, Josefin Sans, Montserrat, Press Start 2P

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
│   ├── CV.js              # Main CV component with tabbed interface
│   ├── cv.json           # Personal data and skill definitions
│   ├── cv.css            # Custom styling
│   ├── Header.js         # Navigation header
│   ├── Hero.js           # Landing page hero section
│   ├── Projects.js       # Projects showcase
│   ├── Gallery.js        # Image gallery component
│   ├── Blogs.js          # Blog posts component
│   └── SubComponents/
│       ├── HeroIntroduction.js  # Hero intro text
│       └── SkillPopper.js       # Interactive skill tooltips
├── App.js                # Main app component
├── App.css              # Global styles
└── index.js             # Entry point
```

### Key Components

- **CV.js**: Main portfolio component with tabbed interface
- **SkillPopper.js**: Interactive tooltip component for skill definitions
- **cv.json**: Contains all personal data, experience, and skill definitions

### Customization

1. **Update Personal Information**: Edit `src/Components/cv.json`
2. **Add New Skills**: Add to `skills` section and provide definitions in `skillDefinitions`
3. **Modify Styling**: Update `src/Components/cv.css` or Material-UI theme
4. **Add New Sections**: Extend the `sections` array in `CV.js`

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
- `npm run build` - Create production build
- `npm run deploy` - Build and deploy to GitHub Pages
- `npm run eject` - Eject from Create React App (irreversible)

### Environment Variables

No environment variables required for basic functionality.

### Environment Variables

No environment variables required for basic functionality.

## 🎨 Customization Guide

### Adding New Skills

1. Open `src/Components/cv.json`
2. Add the skill to the appropriate category in the `skills` section
3. Add a user-friendly definition in the `skillDefinitions` section:

```json
{
  "skills": {
    "programming": ["Python", "Your New Skill"]
  },
  "skillDefinitions": {
    "Your New Skill": "A clear explanation of what this skill is used for in business terms."
  }
}
```

### Updating Personal Information

Edit the following sections in `cv.json`:
- `name`, `contact`, `links` - Basic contact information
- `summary` - Professional summary
- `experience` - Work experience with highlights
- `education` - Educational background
- `projects` - Portfolio projects
- `publications` - Academic or professional publications

### Styling Modifications

- **Global styles**: Edit `src/App.css`
- **CV-specific styles**: Edit `src/Components/cv.css`
- **Component styles**: Modify inline `sx` props in React components
- **Theme colors**: Update CSS variables in `cv.css` root section

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**: Ensure all dependencies are installed with `npm install`
2. **Port 3000 in use**: The dev server will prompt to use another port
3. **Deployment issues**: Verify the `homepage` field in `package.json` matches your GitHub Pages URL

### Performance Optimization

- Images are optimized and served from the `public/assets` folder
- CSS is minified in production builds
- React components use proper key props for efficient re-rendering
- Material-UI components are tree-shaken to reduce bundle size

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

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

- Built with [Create React App](https://create-react-app.dev/)
- UI components by [Material-UI](https://mui.com/)
- Icons by [Material-UI Icons](https://mui.com/material-ui/material-icons/)
- Fonts by [Google Fonts](https://fonts.google.com/)

---

**Built with ❤️ by Daniyal Khan**
