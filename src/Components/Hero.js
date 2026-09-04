import React from 'react';
import cvData from './cv.json';

function Hero() {
    return (
        <div id="hero" className="hero">
            <div className="hero-card">
                <div className="hero-card-top">
                    <div className="hero-card-text">
                        <h1 className="hero-card-name">Daniyal Khan</h1>
                        <p className="hero-card-tagline">
                            Software Engineer — AI-driven apps, full-stack, machine learning.
                        </p>
                        <a href="#footer" className="btn hero-card-btn">Get in touch</a>
                    </div>
                    <img
                        className="hero-card-photo"
                        src={`${process.env.PUBLIC_URL}/assets/headshots/daniyal-37.jpg`}
                        alt="Daniyal Khan"
                    />
                </div>
                <div className="hero-card-panel">
                    <nav className="hero-card-tabs">
                        <a href="#cv-about" className="hero-tab hero-tab-active">About</a>
                        <a href="#cv-experience" className="hero-tab">Experience</a>
                        <a href="#cv-skills" className="hero-tab">Skills</a>
                        <a href="#cv-education" className="hero-tab">Education</a>
                    </nav>
                    <p className="hero-card-preview">{cvData.summary}</p>
                </div>
            </div>
        </div>
    );
}

export default Hero;
