import React, { useEffect, useMemo, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Box,
    CardActionArea,
    Stack,
    Skeleton,
    alpha,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// --------------------------- Helpers ---------------------------------

// Random grid span for a masonry-ish layout (kept subtle)
const getRandomGridProps = () => {
    const sizes = [3, 4, 6];
    const xs = sizes[Math.floor(Math.random() * sizes.length)];
    const sm = sizes[Math.floor(Math.random() * sizes.length)];
    return { xs, sm };
};

// Load all .md files except TEMPLATE.md (same behavior)
const writingsContext = require.context('./writings', false, /^(?!.*TEMPLATE).*\.md$/);

// Parse frontmatter like:
// ---
// title: Example
// cover: images/cover.png
// date: 2025-08-12
// tags: react, ui, tips
// excerpt: Custom excerpt...
// ---
function extractFrontmatter(md) {
    const fm = md.match(/^---([\s\S]*?)---/);
    if (!fm) return {};
    const block = fm[1];
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    const obj = {};
    for (const line of lines) {
        const idx = line.indexOf(':');
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        const raw = line.slice(idx + 1).trim();
        obj[key] = raw;
    }
    // Normalize tags: comma or semicolon separated
    if (obj.tags) {
        obj.tags = obj.tags
            .split(/[;,]/)
            .map(t => t.trim())
            .filter(Boolean);
    }
    return obj;
}

function stripFrontmatter(md) {
    return md.replace(/^---([\s\S]*?)---/, '').trim();
}

function getExcerpt(md, fallbackLen = 160) {
    const body = stripFrontmatter(md);
    const firstMeaningful = body.split('\n').find(line => line && line.length > 40);
    if (firstMeaningful) return firstMeaningful.slice(0, 220);
    return body.slice(0, fallbackLen);
}

function safeRequireCover(cover) {
    try {
        return require(`./writings/${cover}`);
    } catch {
        // fallback (your binary cover)
        try {
            return require(`./writings/images/binary-cover.jpg`);
        } catch {
            return '';
        }
    }
}

// Slight random tilt for that organic look
const randTilt = () => (Math.random() - 0.5) * 1.2; // -0.6deg to 0.6deg

// --------------------------- Component ---------------------------------

const WritingsList = () => {
    const [writings, setWritings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const files = writingsContext.keys();
        const data = files.map((file) => {
            const md = writingsContext(file).default || writingsContext(file);
            const front = extractFrontmatter(md);
            const title = front.title || file.replace('./', '').replace('.md', '');
            const cover = front.cover || 'images/binary-cover.png';
            const date = front.date || '';
            const tags = Array.isArray(front.tags) ? front.tags : [];
            const excerpt = front.excerpt || getExcerpt(md);

            return {
                title,
                coverSrc: safeRequireCover(cover),
                excerpt,
                date,
                tags,
                file,
            };
        });

        // Optional: sort by date desc if dates exist, else leave as-is
        const sorted = data.sort((a, b) => {
            const da = a.date ? Date.parse(a.date) : 0;
            const db = b.date ? Date.parse(b.date) : 0;
            return db - da;
        });

        setWritings(sorted);
        setLoading(false);
    }, []);

    const handleClick = (file) => {
        navigate(`/writing/${encodeURIComponent(file.replace('./', '').replace('.md', ''))}`);
    };

    // brand colors
    const PRIMARY = '#FFC000';
    const GLASS_BG = 'rgba(255, 255, 255, 0.06)';
    const GLASS_BORDER = 'rgba(255, 191, 0, 0.22)';

    const skeletons = useMemo(() => new Array(6).fill(null), []);

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="stretch" sx={{ py: 3 }}>
            {(loading ? skeletons : writings).map((w, idx) => {
                const gridProps = getRandomGridProps();

                if (loading) {
                    return (
                        <Grid
                            item
                            key={`s-${idx}`}
                            {...gridProps}
                            sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <Card
                                sx={{
                                    width: '100%',
                                    maxWidth: 420,
                                    bgcolor: GLASS_BG,
                                    border: `1px solid ${alpha(PRIMARY, 0.15)}`,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
                                }}
                            >
                                <Skeleton variant="rectangular" height={180} />
                                <Box sx={{ p: 2 }}>
                                    <Skeleton width="70%" />
                                    <Skeleton width="40%" />
                                    <Skeleton width="90%" />
                                </Box>
                            </Card>
                        </Grid>
                    );
                }

                const tilt = randTilt();

                return (
                    <Grid
                        item
                        key={w.title + idx}
                        {...gridProps}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}
                    >
                        <Card
                            sx={{
                                width: '100%',
                                maxWidth: 460,
                                bgcolor: GLASS_BG,
                                color: 'white',
                                borderRadius: 2,
                                overflow: 'hidden',
                                border: `1px solid ${GLASS_BORDER}`,
                                boxShadow: '0 12px 36px rgba(0,0,0,0.35)',
                                transform: `rotate(${tilt}deg)`,
                                transition: 'transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease',
                                position: 'relative',
                                '&:before': {
                                    content: '""',
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: 8,
                                    pointerEvents: 'none',
                                    border: `1px solid ${alpha(PRIMARY, 0.18)}`,
                                    boxShadow: `0 0 0 1px ${alpha(PRIMARY, 0.05)} inset`,
                                },
                                '&:hover': {
                                    transform: `translateY(-4px) rotate(${tilt}deg)`,
                                    boxShadow: '0 18px 48px rgba(0,0,0,0.45)',
                                    borderColor: alpha(PRIMARY, 0.35),
                                },
                            }}
                        >
                            <CardActionArea onClick={() => handleClick(w.file)} sx={{ display: 'block' }}>
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={w.coverSrc}
                                        alt={w.title}
                                        sx={{
                                            objectFit: 'cover',
                                            filter: 'saturate(0.9) contrast(1.05)',
                                        }}
                                        loading="lazy"
                                    />
                                    {/* gold fade + label strip */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: `linear-gradient(180deg, rgba(10,10,10,0) 40%, rgba(10,10,10,0.65) 100%)`,
                                        }}
                                    />
                                    {w.date ? (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                px: 1,
                                                py: 0.25,
                                                borderRadius: 1,
                                                fontSize: 12,
                                                bgcolor: alpha('#000', 0.45),
                                                border: `1px solid ${alpha(PRIMARY, 0.35)}`,
                                                backdropFilter: 'blur(6px)',
                                            }}
                                        >
                                            {new Date(w.date).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: '2-digit',
                                            })}
                                        </Box>
                                    ) : null}
                                </Box>

                                <CardContent
                                    sx={{
                                        position: 'relative',
                                        background:
                                            'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.03) 100%)',
                                        borderTop: `1px solid ${alpha(PRIMARY, 0.12)}`,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: 1,
                                            lineHeight: 1.25,
                                            fontWeight: 700,
                                            textShadow: '0 0 12px rgba(0,0,0,0.35)',
                                        }}
                                    >
                                        {w.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: alpha('#fff', 0.85),
                                            mb: 1.25,
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 3,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {w.excerpt}
                                    </Typography>

                                    {w.tags && w.tags.length > 0 ? (
                                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                                            {w.tags.slice(0, 4).map((t, i) => (
                                                <Chip
                                                    key={t + i}
                                                    label={t}
                                                    size="small"
                                                    sx={{
                                                        height: 22,
                                                        color: PRIMARY,
                                                        borderColor: alpha(PRIMARY, 0.6),
                                                        borderWidth: 1,
                                                        borderStyle: 'solid',
                                                        bgcolor: alpha(PRIMARY, 0.10),
                                                        '&:hover': {
                                                            bgcolor: alpha(PRIMARY, 0.16),
                                                        },
                                                    }}
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Stack>
                                    ) : null}
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default WritingsList;
