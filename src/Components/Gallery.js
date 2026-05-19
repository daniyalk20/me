import React, { useState } from 'react';
import { Close, Image as ImageIcon } from '@mui/icons-material';

// Placeholder items - replace with actual screenshots later
// Just drop images in public/assets/gallery/ and update this array
const galleryItems = [
    { src: '', alt: 'Project Screenshot 1', caption: 'Coming soon' },
    { src: '', alt: 'Project Screenshot 2', caption: 'Coming soon' },
    { src: '', alt: 'Project Screenshot 3', caption: 'Coming soon' },
    { src: '', alt: 'Project Screenshot 4', caption: 'Coming soon' },
    { src: '', alt: 'Project Screenshot 5', caption: 'Coming soon' },
    { src: '', alt: 'Project Screenshot 6', caption: 'Coming soon' },
];

function Gallery() {
    const [lightboxIdx, setLightboxIdx] = useState(null);

    return (
        <>
            <div className="gallery-grid">
                {galleryItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="gallery-item"
                        onClick={() => item.src && setLightboxIdx(idx)}
                    >
                        {item.src ? (
                            <img src={item.src} alt={item.alt} />
                        ) : (
                            <div className="gallery-placeholder">
                                <ImageIcon style={{ fontSize: '2rem', marginBottom: '8px', display: 'block', margin: '0 auto 8px' }} />
                                {item.caption}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {lightboxIdx !== null && galleryItems[lightboxIdx]?.src && (
                <div className="gallery-lightbox" onClick={() => setLightboxIdx(null)}>
                    <button
                        className="gallery-lightbox-close"
                        onClick={() => setLightboxIdx(null)}
                        aria-label="Close lightbox"
                    >
                        <Close />
                    </button>
                    <img
                        src={galleryItems[lightboxIdx].src}
                        alt={galleryItems[lightboxIdx].alt}
                    />
                </div>
            )}
        </>
    );
}

export default Gallery;
