import React from 'react';
import Stack from '@mui/material/Stack';
import '../App.css';
import { BusinessCenter } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Stack id="header" direction="row" justifyContent="space-between" className="header_style glass-background">
            <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
                <img
                    src={`${process.env.PUBLIC_URL}/assets/logo.svg`} // Use PUBLIC_URL for dynamic path resolution
                    alt="Logo"
                    style={{
                        width: 'auto', // Adjust size as needed
                        height: '50px', // Adjust size as needed
                        margin: '10px 20px', // Add some margin for spacing
                    }}
                    />
                {/* <p
                    style={{
                        padding: '0 20px',it 
                        margin: '0',
                        transition: 'all 0.5s ease-in-out,  border-bottom 0.2s ease-in-out',
                        height: '100%',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: 'clamp(2rem, 5vw, 5rem)', // Responsive font size
                        fontWeight: 'bold',
                        color: 'white',
                        margin: '0',
                    }}
                >
                    Daniyal{' '}
                    <span className="gradient-text" style={{ color: '#FF5733' }}>
                        Khan
                    </span>
                </p> */}
            </a>
            <div className="menu_small">
                {/* BusinessCenter icon as a button */}
                <button
                    onClick={handleClick}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: '2rem', // Adjust size as needed
                    }}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <BusinessCenter fontSize='3rem'/>
                </button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    sx={{
                        '& .MuiPaper-root': {
                            background: 'rgba(104, 103, 103, 0.25)', // semi-transparent white background
                            backdropFilter: 'blur(10px)', // frosted glass effect
                            WebkitBackdropFilter: 'blur(10px)', // for Safari compatibility
                            borderRadius: '10px', // rounded corners
                            border: '1px solid #ffbf0031', // subtle border for depth
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // soft shadow for depth
                            color: 'white', // text color
                        },
                    }}
                    slotProps={{
                        list: {
                            'aria-labelledby': 'basic-button',
                            sx: {
                                '& .MuiMenuItem-root': {
                                    color: 'white', // text color
                                    padding: '10px 40px 10px 10px', // padding
                                    '&:hover': {
                                        backgroundColor: '#ffbf0031', // hover effect
                                    },
                                },
                            },
                        },
                    }}
                >
                    <MenuItem component="a" href="#hero">Home</MenuItem>
                    <MenuItem component="a" href="#cv">Resume</MenuItem>
                    <MenuItem component="a" href="#projects">Projects</MenuItem>
                    <MenuItem component="a" href="#Writings">Writings</MenuItem>
                    <MenuItem component="a" href="#gallery">Gallery</MenuItem>
                </Menu>
            </div>

            <div className="menu_large menu_style" direction="row" spacing={1}>
                <a href="#hero">Home</a>
                <a href="#cv">Resume</a>
                <a href="#projects">Projects</a>
                <a href="#Writings">Writings</a>
                <a href="#gallery">Gallery</a>
            </div>
        </Stack >
    );
}

export default Header;