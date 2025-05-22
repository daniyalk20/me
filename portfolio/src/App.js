import logo from './logo.png';
import './App.css';

import { Box } from '@mui/material';
import BodyComponent from './Components/BodyComponent';
import Header from './Components/Header';

function App() {
  
  return (
    <div className="App">
      <Header />
      <Box className="App-body">
        <BodyComponent />
      </Box>
        
    </div>
  );
}

export default App;
