import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - var(--header-offset))',
  textAlign: 'center',
  padding: '2rem',
  color: 'white',
  fontFamily: '"Iceland", sans-serif',
  position: 'relative',
  zIndex: 1,
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 2px,
        rgba(255, 192, 0, 0.03) 2px,
        rgba(255, 192, 0, 0.03) 4px
      )
    `,
    animation: 'scanlines 0.1s linear infinite',
    pointerEvents: 'none',
    zIndex: -1,
  },

  '@keyframes scanlines': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(4px)' },
  },
}));

const GlitchText = styled(Typography)(({ theme }) => ({
  fontSize: '12rem',
  fontWeight: 'bold',
  fontFamily: '"Iceland", sans-serif',
  background: 'linear-gradient(to right, #b8860b, #ffbf00)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
  position: 'relative',
  marginBottom: '1rem',

  '&::before, &::after': {
    content: '"404"',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, #b8860b, #ffbf00)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  '&::before': {
    animation: 'glitch-1 0.5s infinite linear alternate-reverse',
    clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
  },

  '&::after': {
    animation: 'glitch-2 0.5s infinite linear alternate-reverse',
    clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
  },

  '@keyframes glitch-1': {
    '0%': { transform: 'translate(0)' },
    '20%': { transform: 'translate(-2px, 2px)', filter: 'hue-rotate(90deg)' },
    '40%': { transform: 'translate(-2px, -2px)' },
    '60%': { transform: 'translate(2px, 2px)', filter: 'hue-rotate(180deg)' },
    '80%': { transform: 'translate(2px, -2px)' },
    '100%': { transform: 'translate(0)' },
  },

  '@keyframes glitch-2': {
    '0%': { transform: 'translate(0)' },
    '20%': { transform: 'translate(2px, 0px)', filter: 'hue-rotate(45deg)' },
    '40%': { transform: 'translate(-2px, 0px)' },
    '60%': { transform: 'translate(0px, 2px)', filter: 'hue-rotate(270deg)' },
    '80%': { transform: 'translate(0px, -2px)' },
    '100%': { transform: 'translate(0)' },
  },

  animation: 'shake 3s ease-in-out infinite',
  '@keyframes shake': {
    '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
    '10%': { transform: 'translate(-1px, -2px) rotate(-0.5deg)' },
    '20%': { transform: 'translate(-3px, 0px) rotate(0.5deg)' },
    '30%': { transform: 'translate(3px, 2px) rotate(0deg)' },
    '40%': { transform: 'translate(1px, -1px) rotate(0.5deg)' },
    '50%': { transform: 'translate(-1px, 2px) rotate(-0.5deg)' },
    '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
    '70%': { transform: 'translate(3px, 1px) rotate(-0.5deg)' },
    '80%': { transform: 'translate(-1px, -1px) rotate(0.5deg)' },
    '90%': { transform: 'translate(1px, 2px) rotate(0deg)' },
  },

  '@media (max-width: 768px)': { fontSize: '6rem' },
  '@media (max-width: 480px)': { fontSize: '4rem' },
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontFamily: '"Iceland", sans-serif',
  color: 'white',
  marginBottom: '2rem',
  maxWidth: '600px',
  lineHeight: 1.6,
  opacity: 0.9,
  '@media (max-width: 768px)': {
    fontSize: '1.2rem',
    padding: '0 1rem',
  },
}));

const HomeButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#FFC000',
  border: '2px solid #FFC000',
  fontFamily: '"Iceland", sans-serif',
  fontSize: '1.2rem',
  padding: '12px 24px',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#FFC000',
    color: '#0a0a0a',
    boxShadow: '0 0 20px rgba(255, 192, 0, 0.4)',
    transform: 'scale(1.05)',
  },
}));

const CodeLine = styled(Typography)(({ theme }) => ({
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: '0.9rem',
  color: 'rgba(255, 192, 0, 0.6)',
  marginBottom: '0.5rem',
  '&::before': {
    content: '"$ "',
    color: '#FFC000',
  },
}));

// Floating glitchy URL that follows the cursor (JS + CSS only)
const GlitchURL = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  transform: 'translate3d(var(--x, -9999px), var(--y, -9999px), 0)',
  willChange: 'transform, clip-path, filter',
  pointerEvents: 'none',
  zIndex: 9999,
  padding: '6px 10px',
  border: '1px solid rgba(255,192,0,0.35)',
  borderRadius: '10px',
  background: 'rgba(0,0,0,0.35)',
  backdropFilter: 'blur(2px)',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: '12px',
  letterSpacing: '0.3px',
  color: '#fff',
  textShadow: `
    calc(var(--sx, 0px) * -1) calc(var(--sy, 0px) * -1) 0 rgba(255,0,0,0.65),
    var(--sx, 0px) var(--sy, 0px) 0 rgba(0,255,255,0.65)
  `,
  boxShadow: '0 0 0 1px rgba(255,192,0,0.08), 0 6px 20px rgba(0,0,0,0.35)',
  maxWidth: '70vw',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  '&::before, &::after': {
    content: 'attr(data-url)',
    position: 'absolute',
    inset: 0,
    padding: '6px 10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  // magenta slice
  '&::before': {
    color: 'rgba(255,0,255,0.8)',
    transform: 'translate(calc(var(--sx, 0px) * -1), calc(var(--sy, 0px) * -1))',
    clipPath: 'polygon(0 var(--clipTop, 0%), 100% var(--clipTop, 0%), 100% var(--clipMid, 0%), 0 var(--clipMid, 0%))',
    mixBlendMode: 'screen',
  },
  // lime slice
  '&::after': {
    color: 'rgba(144,238,144,0.85)',
    transform: 'translate(var(--sx, 0px), var(--sy, 0px))',
    clipPath: 'polygon(0 var(--clipMid, 0%), 100% var(--clipMid, 0%), 100% var(--clipBot, 0%), 0 var(--clipBot, 0%))',
    mixBlendMode: 'screen',
  },

  animation: 'glitchSlices 1.2s steps(6) infinite',
  '@keyframes glitchSlices': {
    '0%': { filter: 'none', '--clipTop': '0%', '--clipMid': '0%', '--clipBot': '0%' },
    '10%': { '--clipTop': '10%', '--clipMid': '17%', '--clipBot': '24%' },
    '20%': { '--clipTop': '35%', '--clipMid': '41%', '--clipBot': '48%' },
    '30%': { '--clipTop': '55%', '--clipMid': '59%', '--clipBot': '65%' },
    '40%': { '--clipTop': '70%', '--clipMid': '76%', '--clipBot': '82%' },
    '50%': { '--clipTop': '15%', '--clipMid': '25%', '--clipBot': '33%' },
    '60%': { '--clipTop': '0%',  '--clipMid': '0%',  '--clipBot': '0%'  },
    '70%': { '--clipTop': '62%', '--clipMid': '68%', '--clipBot': '74%' },
    '80%': { '--clipTop': '22%', '--clipMid': '29%', '--clipBot': '36%' },
    '90%': { '--clipTop': '44%', '--clipMid': '52%', '--clipBot': '59%' },
    '100%': { '--clipTop': '0%',  '--clipMid': '0%',  '--clipBot': '0%'  },
  },
}));

const NotFound = () => {
  const { pathname, search, hash } = useLocation();
  const urlRef = useRef(null);
  const rafRef = useRef(null);
  const targetPos = useRef({ x: -9999, y: -9999 });
  const viewPos = useRef({ x: -9999, y: -9999 });
  const shiftRef = useRef({ sx: 0, sy: 0 });

  useEffect(() => {
    const onMove = (e) => {
      targetPos.current.x = e.clientX + 16;
      targetPos.current.y = e.clientY + 24;
    };

    const loop = () => {
      // ease position
      viewPos.current.x += (targetPos.current.x - viewPos.current.x) * 0.18;
      viewPos.current.y += (targetPos.current.y - viewPos.current.y) * 0.18;

      // velocity-based RGB split
      const vx = targetPos.current.x - viewPos.current.x;
      const vy = targetPos.current.y - viewPos.current.y;
      const speed = Math.min(Math.hypot(vx, vy) / 25, 3);
      const t = performance.now() / 1000;
      shiftRef.current.sx = Math.cos(t * 13.37) * (0.6 + speed);
      shiftRef.current.sy = Math.sin(t * 11.11) * (0.6 + speed);

      if (urlRef.current) {
        urlRef.current.style.setProperty('--x', `${viewPos.current.x}px`);
        urlRef.current.style.setProperty('--y', `${viewPos.current.y}px`);
        urlRef.current.style.setProperty('--sx', `${shiftRef.current.sx}px`);
        urlRef.current.style.setProperty('--sy', `${shiftRef.current.sy}px`);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const fullRoute = `${pathname}${search}${hash}` || '/';

  return (
    <StyledBox>
      <Helmet>
        <title>404 - Page Not Found | Daniyal Khan - Portfolio</title>
        <meta name="description" content="Sorry, the page you are looking for could not be found. Please check the URL or navigate back to the homepage." />
        <meta name="keywords" content="404, page not found, error" />
        <meta property="og:title" content="404 - Page Not Found | Daniyal Khan - Portfolio" />
        <meta property="og:description" content="Sorry, the page you are looking for could not be found. Please check the URL or navigate back to the homepage." />
        <meta property="og:url" content="https://daniyalk20.github.io/me/404" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Floating glitchy URL that follows the cursor */}
      <GlitchURL ref={urlRef} data-url={fullRoute}>
        {fullRoute}
      </GlitchURL>

      <GlitchText variant="h1">404</GlitchText>

      <Box sx={{ marginBottom: '2rem', fontFamily: 'monospace' }}>
        <CodeLine>cat: {fullRoute}: No such file or directory</CodeLine>
        <CodeLine>ls: cannot access 'requested-resource': No such file or directory</CodeLine>
        <CodeLine>ERROR: Process terminated with exit code 404</CodeLine>
      </Box>

      <ErrorMessage>
        The page you're looking for seems to have gotten lost in the digital void.
        <br />
        Let's get you back to familiar territory.
      </ErrorMessage>

      <HomeButton component={Link} to="/" variant="outlined">
        Return Home
      </HomeButton>
    </StyledBox>
  );
};

export default NotFound;
