import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// --------------------------- Helpers ---------------------------------

// Robust tag parsing: supports [a, b], ["a", "b"], 'a, b', a,b
function parseTags(value) {
    if (!value) return [];
    if (Array.isArray(value))
        return value.map((t) => String(t).trim()).filter(Boolean);

    let v = String(value).trim();

    if (v.startsWith("[") && v.endsWith("]")) {
        try {
            const arr = JSON.parse(v.replace(/'/g, '"'));
            if (Array.isArray(arr))
                return arr.map((t) => String(t).trim()).filter(Boolean);
        } catch {
            v = v.slice(1, -1);
        }
    }

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
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }
        data[key] = value;
    }

    const title = data.Title || data.title;
    const description = data.description || data.excerpt;
    const date = data.updated || data.date;
    const cover = data.cover;
    const tags = parseTags(data.tags);

    return { data: { title, description, date, cover, tags }, content };
}

function getExcerpt(content, fallbackLen = 160) {
    const cleaned = content
        .replace(/^---[\s\S]*?---/, "")
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/^>\s?/gm, "")
        .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
        .replace(/\n{2,}/g, " ")
        .trim();
    if (!cleaned) return "";
    return (
        cleaned.slice(0, fallbackLen) + (cleaned.length > fallbackLen ? "…" : "")
    );
}

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

function resolveCover(cover) {
    if (!cover) return null;
    const cleaned = String(cover)
        .replace(/^\.\/?/, "")
        .replace(/^writings\//, "");
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
    return null;
}

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

                    let rawMarkdown;
                    if (
                        typeof maybe === "string" &&
                        maybe.includes("---") &&
                        !maybe.startsWith("http")
                    ) {
                        rawMarkdown = maybe;
                    } else if (typeof maybe === "string") {
                        const res = await fetch(maybe);
                        rawMarkdown = await res.text();
                    } else {
                        rawMarkdown = String(maybe ?? "");
                    }

                    const { data: fm, content } = parseFrontmatter(rawMarkdown);
                    const title = fm.title || file.replace("./", "").replace(".md", "");
                    const date = fm.date || "";
                    const tags = fm.tags || [];
                    const excerpt = fm.description || getExcerpt(content, 160);
                    const coverSrc = resolveCover(fm.cover || "./images/binary-cover.jpg");

                    return { title, excerpt, date, tags, coverSrc, file };
                })
            );

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

    const formatDate = (d) =>
        d
            ? new Date(d).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
              })
            : "";

    if (loading) {
        return <div className="article-loading">$ loading writings…</div>;
    }

    if (writings.length === 0) {
        return null;
    }

    const [featured, ...others] = writings;

    return (
        <div className="writings-layout">
            <article
                className="writings-featured"
                onClick={() => handleClick(featured.file)}
            >
                {featured.coverSrc && (
                    <div className="writings-featured-media">
                        <img src={featured.coverSrc} alt={featured.title} />
                    </div>
                )}
                <div className="writings-featured-body">
                    <span className="writings-featured-eyebrow">
                        Latest write-up{featured.date ? ` · ${formatDate(featured.date)}` : ""}
                    </span>
                    <h3 className="writings-featured-title">{featured.title}</h3>
                    {featured.excerpt && (
                        <p className="writings-featured-excerpt">{featured.excerpt}</p>
                    )}
                    {featured.tags.length > 0 && (
                        <div className="writings-tags">
                            {featured.tags.map((t, i) => (
                                <span key={t + i} className="chip">{t}</span>
                            ))}
                        </div>
                    )}
                </div>
            </article>

            {others.length > 0 && (
                <div className="writings-sidebar">
                    <span className="writings-sidebar-heading">More posts</span>
                    {others.map((w, idx) => (
                        <div
                            key={w.title + idx}
                            className="writings-sidebar-item"
                            onClick={() => handleClick(w.file)}
                        >
                            <span className="writings-sidebar-item-title">{w.title}</span>
                            <span className="writings-sidebar-item-meta">
                                {[w.tags[0], formatDate(w.date)].filter(Boolean).join(" · ")}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WritingsList;
