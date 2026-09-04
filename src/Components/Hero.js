import React from 'react';

function Hero() {
    const heroStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/hero.png)`,
    };

    return (
        <div id="hero" className="hero" style={heroStyle}>
            <div className="hero-inner">
                <div className="hero-content">
                    <h1 className="hero-title">Daniyal Khan</h1>
                    <p className="hero-subtitle">
                        Software Engineer specializing in full-stack development,
                        high-performance visualization, and scalable applications.
                    </p>
                    <div className="hero-cta">
                        <a href="#about" className="btn btn-primary">View Resume</a>
                        <a href="#projects" className="btn btn-outline">See Projects</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
