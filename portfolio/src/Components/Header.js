import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import '../App.css';


function Header() {
    return (
        <Stack direction="row" justifyContent="space-between" className="header_style glass-background">
            <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
                <h1
                    sx={{
                        fontSize: '50px',
                        fontWeight: 'bold',
                        marginTop: '10px',
                        color: 'white'
                    }}
                >
                    Daniyal{' '}
                    <span className="gradient-text" style={{ color: '#FF5733' }}>
                        Khan
                    </span>
                </h1>
            </a>
            <Stack direction="row" className="menu_style" spacing={2}>
                <p>Home</p>
                <p>CV</p>
                <p>Project</p>
                <p>Gallery</p>
            </Stack>
        </Stack>
    );
}

export default Header;