// Writing.jsx (replace your component with this version)
import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MuiLink from "@mui/material/Link";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./blog.css";
import rehypeHighlight from "rehype-highlight";
import { Divider } from "@mui/material";
import { Helmet } from "react-helmet-async";

// Import JetBrains Mono font for better readability
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
`;

// Inject font styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = fontStyles;
  document.head.appendChild(styleSheet);
}

// Define consistent font family
const BRAND_FONT = '"JetBrains Mono", "Iceland", monospace';

// All markdown files in ./writings (except TEMPLATE)
const writingsContext = require.context(
  "./writings",
  false,
  /^(?!.*TEMPLATE).*\.md$/
);
// Any images/assets referenced from markdown frontmatter (e.g. cover: images/foo.png)
const assetsContext = require.context(
  "./writings",
  true,
  /\.(png|jpe?g|webp|gif|svg)$/
);

/** --- Minimal frontmatter parsing (browser only) --- */
function parseFrontmatter(md) {
  if (!md || typeof md !== "string") return { data: {}, content: "" };
  const match = md.match(/^---\s*([\s\S]*?)\s*---\s*/);
  if (!match) return { data: {}, content: md.trim() };
  const fmText = match[1];
  const content = md.slice(match[0].length).trim();
  const data = {};

  fmText.split("\n").forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) return;
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    } else if (value.startsWith("[") && value.endsWith("]")) {
      const inner = value.slice(1, -1).trim();
      value = inner
        ? inner.split(",").map((t) => {
          const s = t.trim();
          if (
            (s.startsWith('"') && s.endsWith('"')) ||
            (s.startsWith("'") && s.endsWith("'"))
          )
            return s.slice(1, -1);
          if (/^(true|false)$/i.test(s)) return /^true$/i.test(s);
          if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
          return s;
        })
        : [];
    } else if (/^(true|false)$/i.test(value)) {
      value = /^true$/i.test(value);
    } else if (/^-?\d+(\.\d+)?$/.test(value)) {
      value = Number(value);
    }

    data[key] = value;
  });

  return { data, content };
}

function normalizePost({ data, content }) {
  const tags = Array.isArray(data.tags)
    ? data.tags
    : typeof data.tags === "string"
      ? data.tags
        .replace(/\[|\]|'/g, "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
      : [];
  return {
    slug: data.slug || "",
    title: data.Title || data.title || "",
    date: data.date || "",
    description: data.description || "",
    tags,
    cover: data.cover || "",
    author: data.author || "",
    readingTime: data.readingTime || "",
    body: (content || "").trim(),
  };
}

/** Validate & resolve cover; return null to skip rendering */
function resolveCover(cover) {
  if (!cover) return null;
  // reject obvious non-image values (e.g., .md paths)
  const looksLikeImage = /\.(png|jpe?g|webp|gif|svg)$/i.test(cover);
  if (!looksLikeImage) return null;

  // external URL or absolute path under /public
  if (/^https?:\/\//i.test(cover) || cover.startsWith("/")) return cover;

  // try to resolve via bundled asset in ./writings/**
  try {
    const key = cover.startsWith("./") ? cover : `./${cover}`;
    const resolved = assetsContext(key);
    return resolved?.default || resolved;
  } catch (e) {
    // fall back to treating as /public path
    return `/${cover.replace(/^\.\//, "")}`;
  }
}

// Styled code block having background/border with copy button
function PreBlock({ children }) {
  const PRIMARY = "#FFC000";
  const [copied, setCopied] = useState(false);
  const codeContainerRef = useRef(null);

  const onCopy = async () => {
    try {
      const text = codeContainerRef.current
        ? codeContainerRef.current.textContent || ""
        : "";
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch { }
  };

  return (
    <Box sx={{ position: "relative", my: 2 }}>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2,
          fontFamily: BRAND_FONT,
          fontSize: "1.3rem",
          fontWeight: 400,
          background:
            "linear-gradient(135deg, rgba(20, 24, 28, 0.97) 0%, rgba(30, 35, 40, 0.95) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,192,0,0.25)",
          borderRadius: "0.875rem",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,192,0,0.12) inset",
          position: "relative",
          color: "#E0E0E0",
          overflowX: "auto",
          lineHeight: 1.6,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #FFC000, transparent)",
            borderRadius: "0.875rem 0.875rem 0 0",
          },
        }}
      >
  <Box ref={codeContainerRef} component="div" sx={{ fontFamily: BRAND_FONT }}>
          {children}
        </Box>
      </Box>
      <Tooltip title={copied ? "Copied!" : "Copy"} placement="left">
        <IconButton
          size="small"
          onClick={onCopy}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: PRIMARY,
            bgcolor: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,192,0,0.35)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
          }}
        >
          <ContentCopyIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default function Writing() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const PRIMARY = "#FFC000";

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const files = writingsContext.keys();
      for (const f of files) {
        const url = writingsContext(f).default || writingsContext(f);
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const text = await res.text();
          const parsed = normalizePost(parseFrontmatter(text));
          const fileSlug = f.replace("./", "").replace(".md", "");
          if ((parsed.slug && parsed.slug === slug) || fileSlug === slug) {
            if (!cancelled) setPost(parsed);
            break;
          }
        } catch (_) {
          // ignore and try next
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!post) return (
    <Typography 
      sx={{ 
        fontFamily: BRAND_FONT,
        fontSize: "1.2rem",
        textAlign: "center",
        mt: 4
      }}
    >
      Loading...
    </Typography>
  );

  const coverSrc = resolveCover(post.cover);

  return (
    <Box mx="auto" mt={4}>
      <Helmet>
        <title>{post.title ? `${post.title} | Daniyal Khan - Portfolio` : 'Article | Daniyal Khan - Portfolio'}</title>
        <meta name="description" content={post.description || post.excerpt || `Read "${post.title}" by Daniyal Khan - A technical article about ${post.tags ? post.tags.join(', ') : 'software development'}.`} />
        <meta name="keywords" content={post.tags ? post.tags.join(', ') : 'technical writing, programming, software development'} />
        <meta property="og:title" content={post.title ? `${post.title} | Daniyal Khan - Portfolio` : 'Article | Daniyal Khan - Portfolio'} />
        <meta property="og:description" content={post.description || post.excerpt || `Read "${post.title}" by Daniyal Khan - A technical article about ${post.tags ? post.tags.join(', ') : 'software development'}.`} />
        <meta property="og:url" content={`https://daniyalk20.github.io/me/writing/${slug}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title ? `${post.title} | Daniyal Khan - Portfolio` : 'Article | Daniyal Khan - Portfolio'} />
        <meta name="twitter:description" content={post.description || post.excerpt || `Read "${post.title}" by Daniyal Khan - A technical article about ${post.tags ? post.tags.join(', ') : 'software development'}.`} />
        <link rel="canonical" href={`https://daniyalk20.github.io/me/writing/${slug}`} />
      </Helmet>
      {coverSrc && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Card sx={{ borderRadius: "1rem", maxWidth: "80%" }}>
            <CardMedia
              component="img"
              image={coverSrc}
              alt={post.title || slug}
              sx={{ objectFit: "cover" }}
            />
          </Card>
        </Box>
      )}

      <Typography 
        variant="h1" 
        gutterBottom 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          mb: 3,
          fontSize: "3.5rem",
          fontFamily: BRAND_FONT,
          fontWeight: 500,
          letterSpacing: "0.3px"
        }}
      >
        {post.title || slug}
      </Typography>

      {/* Meta chips for author/date/reading time */}
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap", maxWidth: "80%", mx: "auto", justifyContent: "center" }}>
        {post.author ? (
          <Chip
            icon={<PersonIcon sx={{ color: PRIMARY, fontSize: "1.1rem" }} />}
            label={post.author}
            variant="outlined"
            sx={{
              color: PRIMARY,
              borderColor: "rgba(255,192,0,0.35)",
              bgcolor: "rgba(255,192,0,0.10)",
              fontFamily: BRAND_FONT,
              fontSize: "1rem",
              fontWeight: 400,
              "& .MuiChip-icon": { color: PRIMARY },
              "& .MuiChip-label": { fontFamily: BRAND_FONT }
            }}
          />
        ) : null}
        {post.date ? (
          <Chip
            icon={<CalendarMonthIcon sx={{ color: PRIMARY, fontSize: "1.1rem" }} />}
            label={new Date(post.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
            variant="outlined"
            sx={{
              color: PRIMARY,
              borderColor: "rgba(255,192,0,0.35)",
              bgcolor: "rgba(255,192,0,0.10)",
              fontFamily: BRAND_FONT,
              fontSize: "1rem",
              fontWeight: 400,
              "& .MuiChip-icon": { color: PRIMARY },
              "& .MuiChip-label": { fontFamily: BRAND_FONT }
            }}
          />
        ) : null}
        {post.readingTime ? (
          <Chip
            icon={<ScheduleIcon sx={{ color: PRIMARY, fontSize: "1.1rem" }} />}
            label={`${post.readingTime} min read`}
            variant="outlined"
            sx={{
              color: PRIMARY,
              borderColor: "rgba(255,192,0,0.35)",
              bgcolor: "rgba(255,192,0,0.10)",
              fontFamily: BRAND_FONT,
              fontSize: "1rem",
              fontWeight: 400,
              "& .MuiChip-icon": { color: PRIMARY },
              "& .MuiChip-label": { fontFamily: BRAND_FONT }
            }}
          />
        ) : null}
      </Stack>

      <Box mb={3} sx={{ justifyContent: "center", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {post.tags.map((tag) => (
          <Chip 
            key={tag} 
            label={tag} 
            sx={{ 
              mr: 1, 
              mb: 1, 
              color: 'white', 
              backgroundColor: 'rgba(255,192,0,0.10)',
              fontFamily: BRAND_FONT,
              fontSize: "0.9rem",
              fontWeight: 400,
              "& .MuiChip-label": { fontFamily: BRAND_FONT }
            }} 
          />
        ))}
      </Box>

      <Link 
        to="/blog" 
        style={{ 
          justifyContent: "center", 
          display: "flex", 
          flexDirection: "row", 
          color: '#FFC000', 
          marginBottom: 24,
          fontFamily: BRAND_FONT.replace(/"/g, ''),
          fontSize: "1.1rem",
          fontWeight: 400,
          textDecoration: "none"
        }}
      >
        ← Back to Blog
      </Link>

      <Box sx={{ 
        typography: "body1", 
        maxWidth: "60%", 
        mx: "auto", 
        fontSize: "1.4rem", 
        lineHeight: 1.7, 
        fontFamily: BRAND_FONT
      }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: (props) => (
              <Typography 
                variant="h3" 
                gutterBottom 
                sx={{ 
                  fontSize: "2.2rem", 
                  fontFamily: BRAND_FONT,
                  fontWeight: 500,
                  mt: 3,
                  mb: 2
                }} 
                {...props} 
              />
            ),
            h2: (props) => (
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontSize: "1.9rem", 
                  fontFamily: BRAND_FONT,
                  fontWeight: 500,
                  mt: 3,
                  mb: 2
                }} 
                {...props} 
              />
            ),
            h3: (props) => (
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontSize: "1.6rem", 
                  fontFamily: BRAND_FONT,
                  fontWeight: 500,
                  mt: 2.5,
                  mb: 1.5
                }} 
                {...props} 
              />
            ),
            p: (props) => (
              <Typography 
                paragraph 
                sx={{ 
                  fontSize: "1.4rem", 
                  lineHeight: 1.7,
                  fontFamily: BRAND_FONT,
                  fontWeight: 400,
                  mb: 2
                }} 
                {...props} 
              />
            ),
            hr: (props) => (
              <Box
                component="hr"
                sx={{
                  my: 4,
                  border: 'none',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,192,0,0.6), transparent)',
                  borderRadius: '1px',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-1px',
                    left: '25%',
                    right: '25%',
                    height: '1px',
                    background: 'rgba(255,255,255,0.1)',
                  }
                }}
                {...props}
              />
            ),
            // Blockquotes with enhanced styling
            blockquote: (props) => (
              <Box
                component="blockquote"
                sx={{
                  my: 3,
                  mx: 0,
                  pl: 3,
                  pr: 2,
                  py: 2,
                  background: 'linear-gradient(135deg, rgba(255,192,0,0.08) 0%, rgba(30,35,40,0.15) 100%)',
                  borderLeft: '4px solid rgba(255,192,0,0.6)',
                  borderRadius: '0 12px 12px 0',
                  fontStyle: 'italic',
                  fontSize: '1.35rem',
                  lineHeight: 1.8,
                  fontFamily: BRAND_FONT,
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.9)',
                  position: 'relative',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  '&::before': {
                    content: '"\\201C"',
                    position: 'absolute',
                    left: '8px',
                    top: '-8px',
                    fontSize: '3rem',
                    color: 'rgba(255,192,0,0.3)',
                    fontFamily: 'serif',
                  }
                }}
                {...props}
              />
            ),
            // Unordered lists with custom bullets
            ul: (props) => (
              <Box
                component="ul"
                sx={{
                  my: 2,
                  pl: 3,
                  fontFamily: BRAND_FONT,
                  fontSize: '1.4rem',
                  lineHeight: 1.7,
                  '& li': {
                    mb: 1,
                    position: 'relative',
                    listStyle: 'none',
                    '&::before': {
                      content: '"▶"',
                      position: 'absolute',
                      left: '-20px',
                      color: '#FFC000',
                      fontSize: '0.8em',
                    },
                    '&:hover::before': {
                      transform: 'scale(1.2)',
                      transition: 'transform 0.2s ease',
                    }
                  }
                }}
                {...props}
              />
            ),
            // Ordered lists with custom styling
            ol: (props) => (
              <Box
                component="ol"
                sx={{
                  my: 2,
                  pl: 3,
                  fontFamily: BRAND_FONT,
                  fontSize: '1.4rem',
                  lineHeight: 1.7,
                  counterReset: 'custom-counter',
                  '& li': {
                    mb: 1,
                    position: 'relative',
                    listStyle: 'none',
                    counterIncrement: 'custom-counter',
                    '&::before': {
                      content: 'counter(custom-counter)',
                      position: 'absolute',
                      left: '-25px',
                      top: '0',
                      background: 'linear-gradient(135deg, #FFC000, #FFD700)',
                      color: '#000',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8em',
                      fontWeight: 600,
                      border: '1px solid rgba(255,192,0,0.3)',
                    }
                  }
                }}
                {...props}
              />
            ),
            // List items
            li: (props) => (
              <Typography
                component="li"
                sx={{
                  fontFamily: BRAND_FONT,
                  fontSize: 'inherit',
                  fontWeight: 400,
                  // Handle checkboxes for task lists
                  '& input[type="checkbox"]': {
                    accentColor: '#FFC000',
                    marginRight: '8px',
                    transform: 'scale(1.2)',
                    cursor: 'pointer',
                  }
                }}
                {...props}
              />
            ),
            // Tables with enhanced styling
            table: (props) => (
              <Box
                component="table"
                sx={{
                  width: '100%',
                  my: 3,
                  borderCollapse: 'separate',
                  borderSpacing: 0,
                  background: 'rgba(20,24,28,0.6)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,192,0,0.2)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  fontFamily: BRAND_FONT,
                  fontSize: '1.2rem',
                }}
                {...props}
              />
            ),
            thead: (props) => (
              <Box
                component="thead"
                sx={{
                  background: 'linear-gradient(135deg, rgba(255,192,0,0.15), rgba(255,192,0,0.08))',
                }}
                {...props}
              />
            ),
            th: (props) => (
              <Typography
                component="th"
                sx={{
                  p: 2,
                  textAlign: 'left',
                  fontFamily: BRAND_FONT,
                  fontWeight: 600,
                  color: '#FFC000',
                  borderBottom: '2px solid rgba(255,192,0,0.3)',
                  fontSize: '1.1rem',
                }}
                {...props}
              />
            ),
            td: (props) => (
              <Typography
                component="td"
                sx={{
                  p: 2,
                  fontFamily: BRAND_FONT,
                  fontWeight: 400,
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '1.2rem',
                  '&:hover': {
                    background: 'rgba(255,192,0,0.05)',
                  }
                }}
                {...props}
              />
            ),
            tbody: (props) => (
              <Box
                component="tbody"
                sx={{
                  '& tr:nth-of-type(even)': {
                    background: 'rgba(255,255,255,0.02)',
                  },
                  '& tr:hover': {
                    background: 'rgba(255,192,0,0.08)',
                    transition: 'background 0.2s ease',
                  }
                }}
                {...props}
              />
            ),
            code: ({ inline, className, children, ...props }) =>
              inline ? (
                <Box
                  component="code"
                  className={className}
                  sx={{
                    px: 0.75,
                    py: 0.25,
                    borderRadius: "0.375rem",
                    border: "1px solid rgba(255,192,0,0.35)",
                    bgcolor: "rgba(30,35,40,0.35)",
                    color: "#E0E0E0",
                    fontSize: "1.3rem",
                    fontFamily: BRAND_FONT,
                    fontWeight: 400,
                  }}
                  {...props}
                >
                  {children}
                </Box>
              ) : (
                <code 
                  className={className} 
                  style={{ 
                    fontSize: "1.3rem", 
                    fontFamily: BRAND_FONT.replace(/"/g, ''),
                    fontWeight: 400
                  }} 
                  {...props}
                >
                  {children}
                </code>
              ),
            pre: (props) => <PreBlock {...props} />,
            a: ({ href, ...props }) => (
              <MuiLink 
                href={href} 
                sx={{ 
                  color: "#FFC000", 
                  fontFamily: BRAND_FONT,
                  fontSize: "inherit",
                  fontWeight: 500,
                  textDecoration: "none",
                  position: "relative",
                  transition: "all 0.3s ease",
                  borderBottom: "2px solid transparent",
                  paddingBottom: "2px",
                  "&:hover": {
                    color: "#FFD700",
                    borderBottom: "2px solid rgba(255,192,0,0.6)",
                    transform: "translateY(-1px)",
                    textShadow: "0 0 8px rgba(255,192,0,0.4)",
                  },
                  "&::after": {
                    content: '"↗"',
                    marginLeft: "4px",
                    fontSize: "0.8em",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover::after": {
                    opacity: 1,
                  }
                }} 
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                {...props} 
              />
            ),
            // Enhanced styling for emphasis and strong
            em: (props) => (
              <Box
                component="em"
                sx={{
                  fontStyle: 'italic',
                  color: 'rgba(255,192,0,0.9)',
                  fontFamily: BRAND_FONT,
                  position: 'relative',
                  '&::before, &::after': {
                    content: '"✦"',
                    fontSize: '0.7em',
                    color: 'rgba(255,192,0,0.4)',
                    margin: '0 2px',
                  }
                }}
                {...props}
              />
            ),
            strong: (props) => (
              <Box
                component="strong"
                sx={{
                  fontWeight: 700,
                  color: '#FFC000',
                  fontFamily: BRAND_FONT,
                  textShadow: '0 0 4px rgba(255,192,0,0.3)',
                  background: 'linear-gradient(135deg, rgba(255,192,0,0.1), transparent)',
                  padding: '1px 3px',
                  borderRadius: '3px',
                }}
                {...props}
              />
            ),
            // Image styling with captions and proper asset resolution
            img: ({ src, alt, ...props }) => {
              // Resolve image path using the same logic as cover images
              let resolvedSrc = src;
              if (src && !src.startsWith('http') && !src.startsWith('/')) {
                try {
                  const key = src.startsWith('./') ? src : `./${src}`;
                  const resolved = assetsContext(key);
                  resolvedSrc = resolved?.default || resolved || src;
                } catch (e) {
                  // Fall back to treating as /public path
                  resolvedSrc = `/${src.replace(/^\.\//, '')}`;
                }
              }

              return (
                <Box
                  sx={{
                    my: 3,
                    textAlign: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={resolvedSrc}
                    alt={alt}
                    sx={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '12px',
                      border: '2px solid rgba(255,192,0,0.2)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 12px 48px rgba(0,0,0,0.4)',
                        border: '2px solid rgba(255,192,0,0.4)',
                      }
                    }}
                    {...props}
                  />
                  {alt && (
                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: '0.9rem',
                        fontStyle: 'italic',
                        color: 'rgba(255,255,255,0.6)',
                        fontFamily: BRAND_FONT,
                      }}
                    >
                      {alt}
                    </Typography>
                  )}
                </Box>
              );
            },
          }}
        >
          {post.body}
        </ReactMarkdown>
      </Box>

    </Box>
  );
}
