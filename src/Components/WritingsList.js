import React, { useEffect, useMemo, useState } from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// --------------------------- Helpers ---------------------------------

// Robust tag parsing: supports [a, b], ["a", "b"], 'a, b', a,b
function parseTags(value) {
    if (!value) return [];
    if (Array.isArray(value))
        return value.map((t) => String(t).trim()).filter(Boolean);

    let v = String(value).trim();

    // JSON-like array
    if (v.startsWith("[") && v.endsWith("]")) {
        try {
            // Try JSON first
            const jsony = v
                .replace(/(['"])?([a-zA-Z0-9_\- ]+)(['"])?:/g, '"$2":') // yaml-ish to json-ish (not needed here but harmless)
                .replace(/'/g, '"');
            const arr = JSON.parse(jsony);
            if (Array.isArray(arr))
                return arr.map((t) => String(t).trim()).filter(Boolean);
        } catch {
            // fallback to manual split inside brackets
            v = v.slice(1, -1);
        }
    }

    // Simple comma-separated
    return v
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
}

// Custom frontmatter parser (single-line key: value pairs)
function parseFrontmatter(markdown) {
    const lines = markdown.split("\n");
    let s = -1,
        e = -1;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === "---") {
            if (s === -1) s = i;
            else {
                e = i;
                break;
            }
        }
    }
    if (s === -1 || e === -1) return { data: {}, content: markdown };

    const fmLines = lines.slice(s + 1, e);
    const content = lines.slice(e + 1).join("\n");

    const data = {};
    for (const raw of fmLines) {
        if (!raw.trim() || raw.trim().startsWith("#")) continue;
        const idx = raw.indexOf(":");
        if (idx <= 0) continue;
        const key = raw.slice(0, idx).trim();
        let value = raw.slice(idx + 1).trim();

        // Strip quotes
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }

        // Arrays or tags later
        data[key] = value;
    }

    // Normalize common fields
    const norm = (k) =>
        data[k] ??
        data[k?.toLowerCase?.()] ??
        data[k?.replace?.(/[A-Z]/g, (m) => m.toLowerCase())];
    const title = norm("Title") || norm("title");
    const description = norm("description") || norm("excerpt");
    const date = norm("updated") || norm("date");
    const cover = norm("cover");
    const readingTime = norm("readingTime");

    // Tags: try parsed array then fallback
    const tags = parseTags(data.tags);

    return {
        data: { title, description, date, cover, tags, readingTime, raw: data },
        content,
    };
}

// Better excerpt extraction
function getExcerpt(content, fallbackLen = 160) {
    const cleaned = content
        .replace(/^---[\s\S]*?---/, "") // remove any stray frontmatter
        .replace(/^#{1,6}\s+/gm, "") // headers
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
        .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
        .replace(/\*([^*]+)\*/g, "$1") // italic
        .replace(/`([^`]+)`/g, "$1") // inline code
        .replace(/^>\s?/gm, "") // blockquotes
        .replace(/!\[[^\]]*\]\([^)]+\)/g, "") // images
        .replace(/\n{2,}/g, " ") // collapse blank lines
        .trim();

    if (!cleaned) return "";

    const sentences = cleaned
        .split(/(?<=[.!?])\s+/)
        .filter((s) => s.trim().length > 20);
    if (sentences.length) {
        const first = sentences[0].trim();
        return first.length > fallbackLen
            ? first.slice(0, fallbackLen) + "…"
            : first;
    }
    return (
        cleaned.slice(0, fallbackLen) + (cleaned.length > fallbackLen ? "…" : "")
    );
}

// Random grid span for a subtle masonry look
const getRandomGridProps = () => {
    const sizes = [3, 4, 6];
    const xs = sizes[Math.floor(Math.random() * sizes.length)];
    const sm = sizes[Math.floor(Math.random() * sizes.length)];
    return { xs, sm };
};

// Load all .md files except TEMPLATE.md
const writingsContext = require.context(
    "./writings",
    false,
    /^(?!.*TEMPLATE).*\.md$/
);

// Images inside ./writings/images
let imagesContext;
try {
    imagesContext = require.context(
        "./writings/images",
        false,
        /\.(png|jpe?g|webp|svg)$/
    );
} catch {
    imagesContext = null;
}

const PLACEHOLDER =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#111"/>
          <stop offset="1" stop-color="#222"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#g)"/>
      <text x="50%" y="50%" fill="#FFC000" font-size="28" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">Cover</text>
    </svg>`
    );

function resolveCover(cover) {
    if (!cover) return PLACEHOLDER;
    const cleaned = String(cover)
        .replace(/^\.\/?/, "")
        .replace(/^writings\//, ""); // normalize
    // Expecting "images/..." relative to ./writings
    if (imagesContext) {
        const path = cleaned.startsWith("images/")
            ? `./${cleaned.replace(/^images\//, "")}`
            : `./${cleaned}`;
        try {
            return imagesContext(path);
        } catch {
            /* fallthrough */
        }
    }
    // Fallback: try direct require (may fail on dynamic)
    try {
        return require(`./writings/${cleaned}`);
    } catch {
        return PLACEHOLDER;
    }
}

// Slight random tilt for an organic look
const randTilt = () => (Math.random() - 0.5) * 1.2; // -0.6deg .. 0.6deg

// --------------------------- Component ---------------------------------

const WritingsList = () => {
    const [writings, setWritings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        async function loadAll() {
            const files = writingsContext.keys();

            const items = await Promise.all(
                files.map(async (file) => {
                    const mod = writingsContext(file);
                    const maybe = mod?.default ?? mod;

                    // Detect whether we already have raw content (raw-loader)
                    let rawMarkdown;
                    if (
                        typeof maybe === "string" &&
                        maybe.includes("---") &&
                        !maybe.startsWith("http")
                    ) {
                        rawMarkdown = maybe; // already raw text
                    } else if (typeof maybe === "string") {
                        // likely a URL -> fetch it
                        const res = await fetch(maybe);
                        rawMarkdown = await res.text();
                    } else {
                        // last resort, stringify
                        rawMarkdown = String(maybe ?? "");
                    }

                    const { data: fm, content } = parseFrontmatter(rawMarkdown);

                    const title =
                        fm.title || fm.Title || file.replace("./", "").replace(".md", "");

                    const coverSrc = resolveCover(
                        fm.cover || "./images/binary-cover.jpg"
                    );
                    const date = fm.date || "";
                    const tags = parseTags(fm.tags);

                    const excerpt = fm.description
                        ? fm.description
                        : getExcerpt(content, 160);

                    return {
                        title,
                        coverSrc,
                        excerpt,
                        date,
                        tags,
                        file,
                    };
                })
            );

            // Sort by date desc if present
            items.sort((a, b) => {
                const da = a.date ? new Date(a.date).getTime() : 0;
                const db = b.date ? new Date(b.date).getTime() : 0;
                return db - da;
            });

            if (mounted) {
                setWritings(items);
                setLoading(false);
            }
        }

        loadAll();
        return () => {
            mounted = false;
        };
    }, []);

    const handleClick = (file) => {
        navigate(
            `/writing/${encodeURIComponent(
                file.replace("./", "").replace(".md", "")
            )}`
        );
    };

    // brand colors - matching your overall theme
    const PRIMARY = "#FFC000";
    const GLASS_BG = "rgba(255, 255, 255, 0.04)";
    const GLASS_BORDER = "rgba(255, 192, 0, 0.18)";
    const CARD_HOVER_BG = "rgba(255, 255, 255, 0.08)";

    const skeletons = useMemo(() => new Array(6).fill(null), []);

    return (
        <Box
            sx={{ position: "relative", width: "100%", padding: "20px 0", zIndex: 1 }}
        >
            <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="stretch"
                sx={{ py: 3 }}
            >
                {(loading ? skeletons : writings).map((w, idx) => {
                    const gridProps = getRandomGridProps();

                    if (loading) {
                        return (
                            <Grid
                                item
                                key={`s-${idx}`}
                                {...gridProps}
                                sx={{ display: "flex", justifyContent: "center" }}
                            >
                                <Card
                                    sx={{
                                        width: "100%",
                                        maxWidth: 460,
                                        bgcolor: GLASS_BG,
                                        border: `1px solid ${alpha(PRIMARY, 0.12)}`,
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                                        backdropFilter: "blur(8px)",
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
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "stretch",
                            }}
                        >
                            <Card
                                sx={{
                                    width: "100%",
                                    maxWidth: 460,
                                    bgcolor: GLASS_BG,
                                    color: "white",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    border: `1px solid ${GLASS_BORDER}`,
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                                    transform: `rotate(${tilt}deg)`,
                                    transition: "all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                    position: "relative",
                                    backdropFilter: "blur(8px)",
                                    "&:before": {
                                        content: '""',
                                        position: "absolute",
                                        inset: 0,
                                        pointerEvents: "none",
                                        border: `1px solid ${alpha(PRIMARY, 0.12)}`,
                                        boxShadow: `0 0 0 1px ${alpha(PRIMARY, 0.05)} inset`,
                                    },
                                    "&:hover": {
                                        transform: `translateY(-6px) rotate(${tilt * 0.7
                                            }deg) scale(1.02)`,
                                        boxShadow: "0 16px 64px rgba(0,0,0,0.6)",
                                        borderColor: alpha(PRIMARY, 0.4),
                                        bgcolor: CARD_HOVER_BG,
                                        "&:before": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                                PRIMARY,
                                                0.15
                                            )} inset, 0 0 20px ${alpha(PRIMARY, 0.1)}`,
                                        },
                                    },
                                }}
                            >
                                <CardActionArea
                                    onClick={() => handleClick(w.file)}
                                    sx={{ display: "block" }}
                                >
                                    <Box sx={{ position: "relative" }}>
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={w.coverSrc}
                                            alt={w.title}
                                            sx={{
                                                objectFit: "cover",
                                                filter: "saturate(0.9) contrast(1.05)",
                                            }}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.currentTarget.src = PLACEHOLDER;
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                inset: 0,
                                                background: `linear-gradient(180deg, rgba(10,10,10,0) 40%, rgba(10,10,10,0.65) 100%)`,
                                            }}
                                        />
                                        {w.date ? (
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: 12,
                                                    right: 12,
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: 1.5,
                                                    fontSize: '1rem',
                                                    bgcolor: alpha("#000", 0.6),
                                                    border: `1px solid ${alpha(PRIMARY, 0.4)}`,
                                                    backdropFilter: "blur(8px)",
                                                    color: PRIMARY,
                                                    textShadow: "0 0 8px rgba(255, 192, 0, 0.3)",
                                                    boxShadow: `0 2px 8px rgba(0,0,0,0.3), 0 0 0 1px ${alpha(
                                                        PRIMARY,
                                                        0.1
                                                    )} inset`,
                                                }}
                                            >
                                                {new Date(w.date).toLocaleDateString(undefined, {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "2-digit",
                                                })}
                                            </Box>
                                        ) : null}
                                    </Box>

                                    <CardContent
                                        sx={{
                                            position: "relative",
                                            background:
                                                "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.05) 100%)",
                                            borderTop: `1px solid ${alpha(PRIMARY, 0.15)}`,
                                            p: 3,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                mb: 1.5,
                                                lineHeight: 1.3,
                                                fontWeight: 700,
                                                fontSize: "1.25rem",
                                                textShadow: "0 0 15px rgba(255, 192, 0, 0.2)",
                                                letterSpacing: "0.5px",
                                            }}
                                        >
                                            {w.title}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: alpha("#fff", 0.9),
                                                mb: 2,
                                                lineHeight: 1.5,
                                                fontSize: "0.9rem",
                                                display: "-webkit-box",
                                                WebkitBoxOrient: "vertical",
                                                WebkitLineClamp: 3,
                                                overflow: "hidden",
                                            }}
                                        >
                                            {w.excerpt}
                                        </Typography>

                                        {w.tags && w.tags.length > 0 ? (
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                sx={{ flexWrap: "wrap", gap: 1 }}
                                            >
                                                {w.tags.slice(0, 6).map((t, i) => (
                                                    <Chip
                                                        key={t + i}
                                                        label={t}
                                                        size="small"
                                                        sx={{
                                                            height: 24,
                                                            fontSize: "1rem",
                                                            // fontWeight: 600,
                                                            color: PRIMARY,
                                                            borderColor: alpha(PRIMARY, 0.7),
                                                            borderWidth: 1,
                                                            borderStyle: "solid",
                                                            bgcolor: alpha(PRIMARY, 0.12),
                                                            textShadow: "0 0 6px rgba(255, 192, 0, 0.2)",
                                                            transition: "all 200ms ease",
                                                            "&:hover": {
                                                                bgcolor: alpha(PRIMARY, 0.2),
                                                                borderColor: alpha(PRIMARY, 0.9),
                                                                transform: "translateY(-1px)",
                                                                boxShadow: `0 2px 8px ${alpha(PRIMARY, 0.2)}`,
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
        </Box>
    );
};

export default WritingsList;
