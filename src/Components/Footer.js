import React from 'react';
import { Box, Typography, Container, IconButton, Divider } from '@mui/material';
import { GitHub, LinkedIn, Email, KeyboardArrowUp } from '@mui/icons-material';

const PRIMARY = "#FFC000";
const TEXT_MUTED = "#8A8A8A";
const TEXT_LIGHT = "#E0E0E0";

// Iceland font consistency
const icelandFont = {
    fontFamily: '"Iceland", monospace',
    fontOpticalSizing: 'auto',
};

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
                py: 6,
                px: 2,
                position: 'relative',
                // Muted glass morphism background
                background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.85) 0%, rgba(25, 25, 25, 0.75) 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                
                // Simple top border line
                borderTop: `1px solid var(--grid-bold)`,

                // Subtle grid overlay (muted version)
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
            repeating-linear-gradient(to right, transparent 0 47px, rgba(255, 192, 0, 0.02) 47px 48px),
            repeating-linear-gradient(to bottom, transparent 0 47px, rgba(255, 192, 0, 0.02) 47px 48px)
          `,
                    pointerEvents: 'none',
                    zIndex: 0,
                },
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Back to top button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <IconButton
                        onClick={scrollToTop}
                        sx={{
                            color: TEXT_MUTED,
                            background: 'rgba(255, 192, 0, 0.03)',
                            backdropFilter: 'blur(8px)',
                            border: `1px solid rgba(255, 192, 0, 0.05)`,
                            borderRadius: '50%',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                color: PRIMARY,
                                background: 'rgba(255, 192, 0, 0.06)',
                                border: `1px solid rgba(255, 192, 0, 0.15)`,
                                transform: 'translateY(-2px)',
                            }
                        }}
                    >
                        <KeyboardArrowUp />
                    </IconButton>
                </Box>

                {/* Main footer content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 4,
                    }}
                >
                    {/* Left side - Name and tagline */}
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: TEXT_LIGHT,
                                fontWeight: 600,
                                fontSize: { xs: '1.3rem', sm: '1.5rem' },
                                mb: 0.5,
                                ...icelandFont,
                            }}
                        >
                            Daniyal Khan
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: TEXT_MUTED,
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                fontWeight: 300,
                                ...icelandFont,
                            }}
                        >
                            Software Engineer & Problem Solver
                        </Typography>
                    </Box>

                    {/* Center - Social links */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                        }}
                    >
                        <IconButton
                            href="https://github.com/daniyalk20"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                color: TEXT_MUTED,
                                background: 'rgba(255, 192, 0, 0.02)',
                                backdropFilter: 'blur(6px)',
                                border: `1px solid rgba(255, 192, 0, 0.04)`,
                                borderRadius: '8px',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: PRIMARY,
                                    background: 'rgba(255, 192, 0, 0.05)',
                                    border: `1px solid rgba(255, 192, 0, 0.12)`,
                                    transform: 'translateY(-1px)',
                                }
                            }}
                        >
                            <GitHub fontSize="small" />
                        </IconButton>

                        <IconButton
                            href="https://linkedin.com/in/daniyalk20"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                color: TEXT_MUTED,
                                background: 'rgba(255, 192, 0, 0.02)',
                                backdropFilter: 'blur(6px)',
                                border: `1px solid rgba(255, 192, 0, 0.04)`,
                                borderRadius: '8px',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: PRIMARY,
                                    background: 'rgba(255, 192, 0, 0.05)',
                                    border: `1px solid rgba(255, 192, 0, 0.12)`,
                                    transform: 'translateY(-1px)',
                                }
                            }}
                        >
                            <LinkedIn fontSize="small" />
                        </IconButton>

                        <IconButton
                            href="mailto:itsdaniyalk7@gmail.com"
                            sx={{
                                color: TEXT_MUTED,
                                background: 'rgba(255, 192, 0, 0.02)',
                                backdropFilter: 'blur(6px)',
                                border: `1px solid rgba(255, 192, 0, 0.04)`,
                                borderRadius: '8px',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: PRIMARY,
                                    background: 'rgba(255, 192, 0, 0.05)',
                                    border: `1px solid rgba(255, 192, 0, 0.12)`,
                                    transform: 'translateY(-1px)',
                                }
                            }}
                        >
                            <Email fontSize="small" />
                        </IconButton>
                    </Box>

                    {/* Right side - Quick links */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 3,
                            alignItems: 'center',
                            textAlign: { xs: 'center', md: 'right' },
                        }}
                    >
                        <Typography
                            component="a"
                            href="#about"
                            sx={{
                                color: TEXT_MUTED,
                                textDecoration: 'none',
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                fontWeight: 300,
                                transition: 'all 0.3s ease-in-out',
                                ...icelandFont,
                                '&:hover': {
                                    color: TEXT_LIGHT,
                                    textShadow: `0 0 8px rgba(255, 192, 0, 0.3)`,
                                }
                            }}
                        >
                            About
                        </Typography>

                        <Typography
                            component="a"
                            href="#projects"
                            sx={{
                                color: TEXT_MUTED,
                                textDecoration: 'none',
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                fontWeight: 300,
                                transition: 'all 0.3s ease-in-out',
                                ...icelandFont,
                                '&:hover': {
                                    color: TEXT_LIGHT,
                                    textShadow: `0 0 8px rgba(255, 192, 0, 0.3)`,
                                }
                            }}
                        >
                            Projects
                        </Typography>

                        <Typography
                            component="a"
                            href="#writing"
                            sx={{
                                color: TEXT_MUTED,
                                textDecoration: 'none',
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                fontWeight: 300,
                                transition: 'all 0.3s ease-in-out',
                                ...icelandFont,
                                '&:hover': {
                                    color: TEXT_LIGHT,
                                    textShadow: `0 0 8px rgba(255, 192, 0, 0.3)`,
                                }
                            }}
                        >
                            Writing
                        </Typography>
                    </Box>
                </Box>

                {/* Divider */}
                <Divider
                    sx={{
                        my: 4,
                        background: 'linear-gradient(90deg, transparent, rgba(255, 192, 0, 0.08), transparent)',
                        height: '1px',
                        border: 'none',
                    }}
                />

                {/* Bottom section - Copyright */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            color: TEXT_MUTED,
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            fontWeight: 300,
                            ...icelandFont,
                        }}
                    >
                        © {new Date().getFullYear()} Daniyal Khan. Built with passion and precision.
                    </Typography>

                    <Typography
                        variant="caption"
                        sx={{
                            color: TEXT_MUTED,
                            fontSize: { xs: '0.8rem', sm: '0.85rem' },
                            fontWeight: 300,
                            opacity: 0.7,
                            ...icelandFont,
                        }}
                    >
                        Made with Love & Creativity
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
