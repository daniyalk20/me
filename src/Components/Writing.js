import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Helmet } from "react-helmet-async";
import { GitHub, LinkedIn, ContentCopy, Check } from "@mui/icons-material";
import cvData from "./cv.json";
import "./blog.css";

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

/** Minimal frontmatter parsing (browser only) */
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
            return s;
          })
        : [];
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
    author: data.author || "Daniyal Khan",
    readingTime: data.readingTime || "",
    body: (content || "").trim(),
  };
}

function resolveCover(cover) {
  if (!cover) return null;
  const looksLikeImage = /\.(png|jpe?g|webp|gif|svg)$/i.test(cover);
  if (!looksLikeImage) return null;
  if (/^https?:\/\//i.test(cover) || cover.startsWith("/")) return cover;
  try {
    const key = cover.startsWith("./") ? cover : `./${cover}`;
    const resolved = assetsContext(key);
    return resolved?.default || resolved;
  } catch (e) {
    return `/${cover.replace(/^\.\//, "")}`;
  }
}

function resolveInlineImage(src) {
  if (!src || src.startsWith("http") || src.startsWith("/")) return src;
  try {
    const key = src.startsWith("./") ? src : `./${src}`;
    const resolved = assetsContext(key);
    return resolved?.default || resolved || src;
  } catch (e) {
    return `/${src.replace(/^\.\//, "")}`;
  }
}

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  const onCopy = async () => {
    try {
      const text = ref.current ? ref.current.textContent || "" : "";
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore */
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <pre ref={ref}>{children}</pre>
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy code"
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "2px solid var(--border-accent)",
          background: "var(--bg-dark)",
          color: "var(--text-primary)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {copied ? <Check fontSize="inherit" /> : <ContentCopy fontSize="inherit" />}
      </button>
    </div>
  );
}

export default function Writing() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

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
          // try next file
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!post) {
    return <div className="article-loading">$ loading article…</div>;
  }

  const coverSrc = resolveCover(post.cover);
  const pageUrl = `https://daniyalk20.github.io/me/writing/${slug}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    pageUrl
  )}`;

  return (
    <div className="section" style={{ paddingTop: "var(--space-2xl)" }}>
      <div className="section-inner">
        <Helmet>
          <title>{post.title ? `${post.title} | Daniyal Khan - Portfolio` : "Article | Daniyal Khan - Portfolio"}</title>
          <meta name="description" content={post.description || `Read "${post.title}" by Daniyal Khan.`} />
          <meta name="keywords" content={post.tags.join(", ")} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.description} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:type" content="article" />
          <link rel="canonical" href={pageUrl} />
        </Helmet>

        <Link to="/" className="article-back">← back to writings</Link>

        <div className="article-layout">
          <aside className="article-meta-sidebar">
            <img
              className="article-author-avatar"
              src={`${process.env.PUBLIC_URL}/assets/headshots/daniyal-64.jpg`}
              alt={post.author}
            />
            <div>
              <div className="article-author-name">{post.author}</div>
              {post.date && (
                <div className="article-meta-line">
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </div>
              )}
              {post.readingTime && (
                <div className="article-meta-line">{post.readingTime} min read</div>
              )}
            </div>
            <div className="article-share">
              <a href={shareLinkedIn} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                <LinkedIn fontSize="small" />
              </a>
              <a href={cvData.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHub fontSize="small" />
              </a>
            </div>
          </aside>

          <div className="article-content-col">
            <h1 className="article-title">{post.title || slug}</h1>

            {coverSrc && (
              <div className="article-cover">
                <img src={coverSrc} alt={post.title || slug} />
              </div>
            )}

            {post.tags.length > 0 && (
              <div className="article-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </div>
            )}

            <div className="article-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
                  img: ({ src, alt, ...props }) => (
                    <img src={resolveInlineImage(src)} alt={alt} {...props} />
                  ),
                  a: ({ href, ...props }) => (
                    <a
                      href={href}
                      target={href?.startsWith("http") ? "_blank" : undefined}
                      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      {...props}
                    />
                  ),
                }}
              >
                {post.body}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
