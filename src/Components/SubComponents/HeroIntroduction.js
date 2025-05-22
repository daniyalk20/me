import { Typography } from '@mui/material';
import React from 'react';
import '../../App.css';

function HeroIntroduction() {
    return (
        <div className='glass-background hero-intro'>
            <h1 className="hero-intro" sx={{ fontSize: '50px', fontWeight: 'bold', marginTop: '100px', color: 'white' }}>
            Hello, I'm<span className= "gradient-text" style={{ color: '#FF5733' }}> Software Engineer</span>
            </h1>
        </div>
    );
}

export default HeroIntroduction;