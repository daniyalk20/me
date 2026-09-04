import React from 'react';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';
import cvData from './cv.json';

function Footer() {
    const navLinks = [
        { label: 'Home', href: '#hero' },
        { label: 'Resume', href: '#about' },
        { label: 'Projects', href: '#projects' },
        { label: 'Writings', href: '#writings' },
    ];

    return (
        <footer className="footer">
            <div className="footer-cta">
                <span className="footer-cta-eyebrow">$ status --check</span>
                <h2 className="footer-cta-title">Open to opportunities</h2>
                <p className="footer-cta-desc">
                    Open to full-time Software Engineering roles — let's build something great together.
                </p>
                <a href={`mailto:${cvData.contact.email}`} className="btn">
                    Email me →
                </a>
            </div>

            <div className="footer-links">
                <span className="footer-brand-name">Daniyal Khan</span>
                <nav className="footer-nav">
                    {navLinks.map((link) => (
                        <a key={link.label} href={link.href}>{link.label}</a>
                    ))}
                </nav>
                <div className="footer-social">
                    <a href={cvData.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <GitHub fontSize="small" />
                    </a>
                    <a href={cvData.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <LinkedIn fontSize="small" />
                    </a>
                    <a href={`mailto:${cvData.contact.email}`} aria-label="Email">
                        <Email fontSize="small" />
                    </a>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="footer-copy">
                    &copy; {new Date().getFullYear()} Daniyal Khan. Built with passion and precision.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
