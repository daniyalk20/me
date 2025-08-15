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
import { Routes, Route } from 'react-router-dom';
import Background from './Components/Background';
function App() {

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

  return (
    <div className="App geeky-cursor">
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
            <CV />
            <WritingsList />
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
