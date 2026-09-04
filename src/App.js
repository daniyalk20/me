import './App.css';

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
import { useSEO, seoData } from './hooks/useSEO';

function App() {
  const location = useLocation();

  const getSEOData = () => {
    const path = location.pathname;
    const hash = location.hash;
    
    if (path === '/' && !hash) return seoData.home;
    if (hash === '#about') return seoData.about;
    if (hash === '#projects') return seoData.projects;
    if (hash === '#writings') return seoData.writings;
    if (hash === '#gallery') return seoData.gallery;
    if (path.startsWith('/writing/')) return null;
    if (path === '*') return seoData.notFound;
    
    return seoData.home;
  };

  const currentSEO = getSEOData();
  
  const seoComponent = useSEO(
    currentSEO?.title || seoData.home.title,
    currentSEO?.description || seoData.home.description,
    currentSEO?.keywords || seoData.home.keywords,
    currentSEO?.url || seoData.home.url
  );

  useEffect(() => {
    const shouldScroll = !location.hash || location.pathname !== '/';
    if (shouldScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  return (
    <div className="App">
      {seoComponent}
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            
            <section id="about" className="section">
              <div className="section-inner">
                <div className="section-header">
                  <h2 className="section-title">Resume</h2>
                  <hr className="section-divider" />
                </div>
                <CV />
              </div>
            </section>

            <section id="projects" className="section">
              <div className="section-inner">
                <div className="section-header">
                  <h2 className="section-title">Projects</h2>
                  <hr className="section-divider" />
                </div>
                <Projects />
              </div>
            </section>

            <section id="writings" className="section">
              <div className="section-inner">
                <div className="section-header">
                  <h2 className="section-title">Technical Writings</h2>
                  <hr className="section-divider" />
                </div>
                <WritingsList />
              </div>
            </section>

            {/* Gallery section hidden for now */}
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
