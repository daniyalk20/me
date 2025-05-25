import logo from './logo.png';
import './App.css';

import { Box } from '@mui/material';
import Hero from './Components/Hero';
import Header from './Components/Header';
import CV from './Components/CV';
import Projects from './Components/Projects';
import Blogs from './Components/Blogs';
import Gallery from './Components/Gallery';

function App() {

  return (
    <div className="App">
      <Header />
      <Hero />
      <CV />
      <Projects />
      <Blogs />
      <Gallery />

    </div>
  );
}

export default App;
