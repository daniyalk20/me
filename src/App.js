import './App.css';
import './Components/cursors.css';

import { Box } from '@mui/material';
import { useEffect } from 'react';
import Hero from './Components/Hero';
import Header from './Components/Header';
import CV from './Components/CV';
import Projects from './Components/Projects';
import WritingsList from './Components/WritingsList';
import Gallery from './Components/Gallery';
import Writing from './Components/Writing';
import Footer from './Components/Footer';
import NotFound from './Components/404';
import { Routes, Route, useLocation } from 'react-router-dom';
import Background from './Components/Background';
import { useSEO, seoData } from './hooks/useSEO';
function App() {
  const location = useLocation();

  // Determine SEO data based on current route
  const getSEOData = () => {
    const path = location.pathname;
    const hash = location.hash;
    
    if (path === '/' && !hash) return seoData.home;
    if (hash === '#about') return seoData.about;
    if (hash === '#projects') return seoData.projects;
    if (hash === '#writings') return seoData.writings;
    if (hash === '#gallery') return seoData.gallery;
    if (path.startsWith('/writing/')) return null; // Will be handled by Writing component
    if (path === '*') return seoData.notFound;
    
    return seoData.home; // Default fallback
  };

  const currentSEO = getSEOData();
  
  // Always call the hook, even if currentSEO is null
  const seoComponent = useSEO(
    currentSEO?.title || seoData.home.title,
    currentSEO?.description || seoData.home.description,
    currentSEO?.keywords || seoData.home.keywords,
    currentSEO?.url || seoData.home.url
  );

  // Add bullet shot effect on click
  useEffect(() => {
    const handleClick = (event) => {
      const bullet = document.createElement('div');
      bullet.className = 'bullet-shot';
      // Adjust positioning to align with cursor hotspot (12,12 for crosshair)
      bullet.style.left = `${event.clientX - 12}px`; // Align with cursor center
      bullet.style.top = `${event.clientY - 12}px`;
      
      document.body.appendChild(bullet);
      
      // Remove the bullet after animation completes
      setTimeout(() => {
        if (bullet.parentNode) {
          bullet.parentNode.removeChild(bullet);
        }
      }, 3000);
    };

    // Add click listener to document
    document.addEventListener('click', handleClick);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Scroll to top when route changes (except for hash-only changes)
  useEffect(() => {
    const shouldScroll = !location.hash || location.pathname !== '/';
    if (shouldScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]); // Only trigger on pathname changes, not hash changes

  return (
    <div className="App geeky-cursor">
      {seoComponent}
      <Background
        lines={[
          "const useAsync = (fn,deps)=>{/* ... */}",
          "export const API = createClient({ baseURL: '/api' })",
          "type Vec3 = [number, number, number];",
        ]}
        spawnEveryMs={1600}
        fadeOutMs={8000}
        liveLimit={7}
        
      />
      <Header/>
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            
            <Box id="about" className="section-container">
              <div className="section-heading">
                <div className="section-title">About Me</div>
                <hr className="section-divider" />
              </div>
              <CV />
            </Box>
            
            
            
            <Box id="writings" className="section-container">
              <div className="section-heading">
                <div className="section-title">Technical Writings</div>
                <hr className="section-divider" />
              </div>
              <WritingsList />
            </Box>
            
            <Box id="gallery" className="section-container">
              <div className="section-heading">
                <div className="section-title">Gallery</div>
                <hr className="section-divider" />
              </div>
              <Gallery />
            </Box>

            <Box id="projects" className="section-container">
              <div className="section-heading">
                <div className="section-title">Projects</div>
                <hr className="section-divider" />
              </div>
              <Projects />
            </Box>
          </>
        } />
        <Route path="/writing/:slug" element={<Writing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
