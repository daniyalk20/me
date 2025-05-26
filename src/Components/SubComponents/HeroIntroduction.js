import { Typography } from '@mui/material';
import React from 'react';
import '../../App.css';

function HeroIntroduction() {
    return (
        <div className='hero-intro'>
            <p style={{ fontSize: '4rem'}}>
                Shalom, I’m Daniyal <span className="gradient-text" style={{ color: '#FF5733' }}>Khan</span> 
                <hr style={{ width: '50px', border: '2px solid white' }} />
            <p style={{fontSize: '3rem'}}>Software Engineer, Deep Learning enthusiast, and CURIOUS mind.</p>
                {/* <br /><br />
                I build with <strong>Python (Django)</strong>, <strong>React</strong>, and <strong>MySQL</strong>. Right now, I’m working on <em>ChatAlloy</em> — an AI tool helping manufacturers make smarter decisions.
                <br /><br />
                I love turning research into code, especially in <strong>NLP</strong> and <strong>deep learning</strong>.
                <br /><br />
                I also write hands-on tutorials about what I learn — and occasionally get lost in <em>Biblical Archaeology</em> for fun. */}
            </p>

        </div>
    );
}

export default HeroIntroduction;