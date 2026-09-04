import React from 'react';

function Hero() {
    return (
        <div id="hero" className="hero">
            <div className="hero-inner">
                <div className="hero-text">
                    <span className="hero-eyebrow">Software Engineer</span>
                    <h1 className="hero-title">
                        Hi, I'm Daniyal <span className="gradient-text">Khan</span>
                    </h1>
                    <p className="hero-subtitle">
                        I build full-stack and AI-driven applications, high-performance
                        visualization systems, and scalable web platforms — with a
                        Master's and Bachelor's in Computer Science.
                    </p>
                    <div className="hero-cta">
                        <a href="#projects" className="btn btn-primary">View Projects</a>
                        <a href="#about" className="btn btn-outline">Resume ↓</a>
                    </div>
                </div>
                <div className="hero-media">
                    <div className="hero-photo-frame">
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/headshots/daniyal-37.jpg`}
                            alt="Daniyal Khan"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
