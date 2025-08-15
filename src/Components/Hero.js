import React, { useEffect } from 'react';
import AnimatedRobot from './SubComponents/AnimatedRobot';

function Hero() {
    // Parallax background effect
    useEffect(() => {
        const handleScroll = () => {
            const hero = document.querySelector('.hero');
            if (!hero) return;
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

        // Robot now sources messages internally from cv.json

    return (
        <div id='hero' className='hero'>
            <div style={{ fontSize: '4rem', lineHeight: 1.1 }}>
                Shalom, I’m Daniyal <span className="gradient-text" style={{ color: '#FF5733' }}>Khan</span>
            </div>
            <hr style={{ width: '50px', border: '2px solid white', margin: '1rem 0' }} />
            <div style={{ fontSize: '2.2rem', maxWidth: '900px' }}>
                Software Engineer, Deep Learning enthusiast, and CURIOUS mind.
            </div>
                {/* <AnimatedRobot /> */}
        </div>
    );
}

export default Hero;