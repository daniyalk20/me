import React from 'react';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

function Footer() {
    const navLinks = [
        { label: 'Home', href: '#hero' },
        { label: 'Resume', href: '#about' },
        { label: 'Projects', href: '#projects' },
    ];

    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <span className="footer-brand-name">Daniyal Khan</span>
                    <p className="footer-brand-desc">
                        Software Engineer building high-performance applications and visualization systems.
                    </p>
                </div>
                <nav className="footer-nav">
                    <span className="footer-nav-heading">Navigation</span>
                    {navLinks.map((link) => (
                        <a key={link.label} href={link.href}>{link.label}</a>
                    ))}
                </nav>
                <div className="footer-connect">
                    <span className="footer-nav-heading">Connect</span>
                    <div className="footer-social">
                        <a href="https://github.com/daniyalk20" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <GitHub fontSize="small" /> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/daniyalk20" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <LinkedIn fontSize="small" /> LinkedIn
                        </a>
                        <a href="mailto:itsdaniyalk7@gmail.com" aria-label="Email">
                            <Email fontSize="small" /> Email
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p className="footer-copy">
                    &copy; {new Date().getFullYear()} Daniyal Khan. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
