import React from 'react';
import hero from '../../hero_image.png';

function HeroImage() {
    return (
        <div
            style={{ minHeight: '10vh', minWidth: '10vh' }}
            className="glass-background"
        >
            <img
                src={hero}
                alt="Hero"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
    );
}

export default HeroImage;