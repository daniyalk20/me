import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GitHub, LinkedIn, Menu as MenuIcon, Close, DarkMode, LightMode } from '@mui/icons-material';

function getInitialTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
}

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [theme, setTheme] = useState(getInitialTheme);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const handleNavigation = (sectionId) => {
        setMobileOpen(false);

        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => scrollToSection(sectionId), 300);
        } else {
            scrollToSection(sectionId);
        }
    };

    const scrollToSection = (sectionId) => {
        if (sectionId === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    const navItems = [
        { label: 'Home', id: 'hero' },
        { label: 'Resume', id: 'about' },
        { label: 'Projects', id: 'projects' },
        { label: 'Writings', id: 'writings' },
    ];

    return (
        <>
            <header className={`header${scrolled ? ' header-scrolled' : ''}`}>
                <div className="header-inner">
                    <nav className="header-nav">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                className="nav-link"
                                onClick={() => handleNavigation(item.id)}
                            >
                                {item.label}
                            </button>
                        ))}
                        <a
                            href="https://github.com/daniyalk20"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-link"
                            aria-label="GitHub"
                        >
                            <GitHub fontSize="small" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/daniyalk20"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-link"
                            aria-label="LinkedIn"
                        >
                            <LinkedIn fontSize="small" />
                        </a>
                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                        >
                            {theme === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
                        </button>
                    </nav>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                        <button
                            className="theme-toggle mobile-theme-toggle"
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                        >
                            {theme === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
                        </button>
                        <button
                            className="header-mobile-btn"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                        >
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </header>

            {mobileOpen && (
                <div className="mobile-nav-overlay">
                    <button
                        className="mobile-nav-close"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                    >
                        <Close />
                    </button>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className="nav-link"
                            onClick={() => handleNavigation(item.id)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
}

export default Header;
