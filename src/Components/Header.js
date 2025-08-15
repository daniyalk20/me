import React from 'react';
import Stack from '@mui/material/Stack';
import '../App.css';
import { Code, Menu as MenuIcon, Terminal, GitHub, LinkedIn } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate, useLocation } from 'react-router-dom';

// Get homepage from package.json or default to '/' for local development
const getHomepageUrl = () => {
    // Check if we're in development mode (local)
    if (process.env.NODE_ENV === 'development') {
        return '/';
    }
    // In production, use the homepage from package.json if it exists
    return process.env.PUBLIC_URL || '/';
};

function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handle navigation to sections - works from any page
    const handleNavigation = (sectionId) => {
        // Close mobile menu if open
        handleClose();
        
        // If we're not on the home page, navigate to home first
        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to complete, then scroll to section
            // Use both timeout and a retry mechanism
            const scrollToSection = () => {
                const element = document.getElementById(sectionId);
                if (element) {
                    // Calculate offset for fixed header (approximately 80px)
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // If element not found, try again after a short delay
                    setTimeout(() => {
                        const retryElement = document.getElementById(sectionId);
                        if (retryElement) {
                            // Calculate offset for fixed header
                            const headerOffset = 80;
                            const elementPosition = retryElement.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                            
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 200);
                }
            };
            
            // Try after 300ms (increased from 100ms)
            setTimeout(scrollToSection, 300);
        } else {
            // We're already on home page, just scroll to section
            const element = document.getElementById(sectionId);
            if (element) {
                // Calculate offset for fixed header
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <Stack id="header" direction="row" justifyContent="space-between" alignItems="center" className="header_style glass-background">
            {/* Logo/Brand Section */}
            <button 
                onClick={() => handleNavigation('hero')}
                style={{ 
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textDecoration: 'none', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center' 
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/logo.svg`}
                        alt="Daniyal Khan Logo"
                        style={{
                            width: 'auto',
                            height: '50px',
                            filter: 'brightness(1.2)',
                        }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <h1 style={{
                            margin: '0',
                            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                            fontWeight: '700',
                            color: 'white',
                            fontFamily: "'Iceland', sans-serif",
                            letterSpacing: '0.5px'
                        }}>
                            Daniyal{' '}
                            <span style={{ color: 'var(--primary-color)' }}>Khan</span>
                        </h1>
                        <p style={{
                            margin: '0',
                            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                            color: '#a0a0a0',
                            fontFamily: "'Iceland', sans-serif",
                            fontWeight: '400',
                            letterSpacing: '0.3px'
                        }}>
                            {'<'} Software Engineer {'/>'} 
                        </p>
                    </div>
                </div>
            </button>

            {/* Social Links for larger screens */}
            <div className="social-links" style={{ 
                display: 'none', 
                gap: '20px',
                '@media (min-width: 768px)': { display: 'flex' }
            }}>
                <Tooltip title="GitHub Profile" arrow>
                    <a 
                        href="https://github.com/daniyalk20" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                            color: '#a0a0a0',
                            transition: 'all 0.3s ease',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = 'var(--primary-color)';
                            e.target.style.borderColor = 'var(--primary-color)';
                            e.target.style.backgroundColor = 'rgba(255, 192, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '#a0a0a0';
                            e.target.style.borderColor = 'transparent';
                            e.target.style.backgroundColor = 'transparent';
                        }}
                    >
                        <GitHub fontSize="large" />
                    </a>
                </Tooltip>
            </div>
            <div className="menu_small">
                {/* Menu icon as a button for mobile */}
                <Tooltip title="Navigation Menu" arrow>
                    <button
                        onClick={handleClick}
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 192, 0, 0.2), rgba(255, 192, 0, 0.1))',
                            border: '1px solid rgba(255, 192, 0, 0.4)',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            color: 'var(--primary-color)',
                            fontSize: '1.8rem',
                            padding: '12px',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)',
                        }}
                        aria-controls={open ? 'developer-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(255, 192, 0, 0.3)';
                            e.target.style.borderColor = 'var(--primary-color)';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(255, 192, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.borderColor = 'rgba(255, 192, 0, 0.4)';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        <Code fontSize="large"/>
                    </button>
                </Tooltip>
                <Menu
                    id="developer-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    sx={{
                        '& .MuiPaper-root': {
                            background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95), rgba(67, 66, 66, 0.9))',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 192, 0, 0.3)',
                            boxShadow: '0 8px 40px rgba(255, 192, 0, 0.2)',
                            color: 'white',
                            fontFamily: "'Iceland', sans-serif",
                        },
                    }}
                    slotProps={{
                        list: {
                            'aria-labelledby': 'developer-menu-button',
                            sx: {
                                '& .MuiMenuItem-root': {
                                    color: '#e0e0e0',
                                    padding: '15px 30px',
                                    fontFamily: "'Iceland', sans-serif",
                                    fontSize: '1.1rem',
                                    fontWeight: '500',
                                    borderBottom: '1px solid #333',
                                    '&:last-child': {
                                        borderBottom: 'none',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 192, 0, 0.1)',
                                        color: 'var(--primary-color)',
                                        transform: 'translateX(5px)',
                                        transition: 'all 0.3s ease',
                                    },
                                    '&:before': {
                                        content: '">"',
                                        marginRight: '10px',
                                        color: 'var(--primary-color)',
                                        fontWeight: 'bold',
                                    }
                                },
                            },
                        },
                    }}
                >
                    <MenuItem onClick={() => handleNavigation('hero')}>./home</MenuItem>
                    <MenuItem onClick={() => handleNavigation('cv')}>./resume</MenuItem>
                    <MenuItem onClick={() => handleNavigation('projects')}>./projects</MenuItem>
                    <MenuItem onClick={() => handleNavigation('writings')}>./blog</MenuItem>
                    <MenuItem onClick={() => handleNavigation('gallery')}>./gallery</MenuItem>
                </Menu>
            </div>

            <div className="menu_large menu_style" style={{ 
                display: 'flex', 
                gap: '35px', 
                alignItems: 'center',
                fontFamily: "'Iceland', sans-serif"
            }}>
                <button onClick={() => handleNavigation('hero')} style={{
                    background: 'none',
                    border: 'none',
                    color: '#e0e0e0',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    cursor: 'pointer',
                    fontFamily: "'Iceland', sans-serif"
                }}
                onMouseEnter={(e) => {
                    e.target.style.color = 'var(--primary-color)';
                    e.target.style.borderColor = 'var(--primary-color)';
                    e.target.style.backgroundColor = 'rgba(255, 192, 0, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 15px rgba(255, 192, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = '#e0e0e0';
                    e.target.style.borderColor = 'transparent';
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                }}>
                    {'<home />'}
                </button>
                <button onClick={() => handleNavigation('cv')} style={{
                    background: 'none',
                    border: 'none',
                    color: '#e0e0e0',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    fontFamily: "'Iceland', sans-serif"
                }}
                onMouseEnter={(e) => {
                    e.target.style.color = 'var(--primary-color)';
                    e.target.style.borderColor = 'var(--primary-color)';
                    e.target.style.backgroundColor = 'rgba(255, 192, 0, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 15px rgba(255, 192, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = '#e0e0e0';
                    e.target.style.borderColor = 'transparent';
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                }}>
                    {'<resume />'}
                </button>
                <button onClick={() => handleNavigation('projects')} style={{
                    background: 'none',
                    border: 'none',
                    color: '#e0e0e0',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    fontFamily: "'Iceland', sans-serif"
                }}
                onMouseEnter={(e) => {
                    e.target.style.color = 'var(--primary-color)';
                    e.target.style.borderColor = 'var(--primary-color)';
                    e.target.style.backgroundColor = 'rgba(255, 192, 0, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 15px rgba(255, 192, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = '#e0e0e0';
                    e.target.style.borderColor = 'transparent';
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                }}>
                    {'<projects />'}
                </button>
                <button onClick={() => handleNavigation('writings')} style={{
                    background: 'none',
                    border: 'none',
                    color: '#e0e0e0',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    fontFamily: "'Iceland', sans-serif"
                }}
                onMouseEnter={(e) => {
                    e.target.style.color = 'var(--primary-color)';
                    e.target.style.borderColor = 'var(--primary-color)';
                    e.target.style.backgroundColor = 'rgba(255, 192, 0, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 15px rgba(255, 192, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = '#e0e0e0';
                    e.target.style.borderColor = 'transparent';
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                }}>
                    {'<blog />'}
                </button>
                <button onClick={() => handleNavigation('gallery')} style={{
                    background: 'none',
                    border: 'none',
                    color: '#e0e0e0',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    fontFamily: "'Iceland', sans-serif"
                }}
                onMouseEnter={(e) => {
                    e.target.style.color = 'var(--primary-color)';
                    e.target.style.borderColor = 'var(--primary-color)';
                    e.target.style.backgroundColor = 'rgba(255, 192, 0, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 15px rgba(255, 192, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = '#e0e0e0';
                    e.target.style.borderColor = 'transparent';
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                }}>
                    {'<gallery />'}
                </button>
            </div>
        </Stack >
    );
}

export default Header;