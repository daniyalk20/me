import React, { useState } from 'react';
import {
  Popper,
  Paper,
  Typography,
  Fade,
  Box,
} from '@mui/material';

const PRIMARY = "#FFC000";
const TEXT_LIGHT = "#E0E0E0";

// Iceland font consistency
const icelandFont = {
  fontFamily: '"Iceland", monospace',
  fontOpticalSizing: 'auto',
};

const SkillPopper = ({ skill, definition, children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  // If no definition is provided, render children as-is
  if (!definition) {
    return children;
  }

  return (
    <Box 
      className="skill-popper-container" 
      sx={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          cursor: 'default',
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        }}
      >
        {children}
      </Box>
      
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="top"
        transition
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
              padding: 8,
            },
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['bottom', 'top', 'right', 'left'],
            },
          },
        ]}
        sx={{ zIndex: 2000 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={300}>
            <Paper
              className="skill-popper-paper"
              elevation={8}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{
                maxWidth: 320,
                p: 2,
                background: 'linear-gradient(135deg, rgba(20, 24, 28, 0.97) 0%, rgba(30, 35, 40, 0.95) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${PRIMARY}40`,
                borderRadius: '0.875rem',
                boxShadow: `
                  0 8px 32px rgba(0,0,0,0.4), 
                  0 0 0 1px ${PRIMARY}20,
                  inset 0 1px 0 rgba(255,255,255,0.1)
                `,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)`,
                  borderRadius: '0.875rem 0.875rem 0 0',
                },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: PRIMARY,
                  fontWeight: 800,
                  mb: 1.25,
                  fontSize: { xs: '1.5rem', sm: '1.7rem' },
                  letterSpacing: '0.5px',
                  ...icelandFont,
                }}
              >
                {skill}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: TEXT_LIGHT,
                  lineHeight: 1.6,
                  fontSize: { xs: '1.1rem', sm: '1.3rem' },
                  fontWeight: 400,
                  ...icelandFont,
                }}
              >
                {definition}
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default SkillPopper;
