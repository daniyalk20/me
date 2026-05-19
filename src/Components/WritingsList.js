import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Robust tag parsing
function parseTags(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value.map((t) => String(t).trim()).filter(Boolean);
    let v = String(value).trim();
    if (v.startsWith("[") && v.endsWith("]")) {
        try {
            const arr = JSON.parse(v.replace(/'/g, '"'));
            if (Array.isArray(arr)) return arr.map((t) => String(t).trim()).filter(Boolean);
        } catch {
            v = v.slice(1, -1);
        }
    }
    return v.split(",").map((s) => s.trim()).filter(Boolean);
}

// Custom frontmatter parser
function parseFrontmatter(markdown) {
    const lines = markdown.split("\n");
    let s = -1, e = -1;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === "---") {
            if (s === -1) s = i;
            else { e = i; break; }
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
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        data[key] = value;
    }

    const title = data.Title || data.title;
    const description = data.description || data.excerpt;
    const date = data.updated || data.date;
    const tags = parseTags(data.tags);

    return { data: { title, description, date, tags }, content };
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
    return cleaned.slice(0, fallbackLen) + (cleaned.length > fallbackLen ? "…" : "");
}

const writingsContext = require.context("./writings", false, /^(?!.*TEMPLATE).*\.md$/);

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
                    if (typeof maybe === "string" && maybe.includes("---") && !maybe.startsWith("http")) {
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

                    return { title, excerpt, date, tags, file };
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
        return () => { mounted = false; };
    }, []);

    const handleClick = (file) => {
        navigate(`/writing/${encodeURIComponent(file.replace("./", "").replace(".md", ""))}`);
    };

    if (loading) {
        return (
            <div className="writings-grid">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="writing-card" style={{ opacity: 0.5 }}>
                        <div style={{ height: '1.2rem', width: '70%', background: 'var(--bg-card-hover)', borderRadius: '4px' }} />
                        <div style={{ height: '0.9rem', width: '100%', background: 'var(--bg-card-hover)', borderRadius: '4px' }} />
                        <div style={{ height: '0.9rem', width: '40%', background: 'var(--bg-card-hover)', borderRadius: '4px' }} />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="writings-grid">
            {writings.map((w, idx) => (
                <div key={w.title + idx} className="writing-card" onClick={() => handleClick(w.file)}>
                    <h3 className="writing-card-title">{w.title}</h3>
                    <p className="writing-card-excerpt">{w.excerpt}</p>
                    <div className="writing-card-meta">
                        {w.date && (
                            <span>{new Date(w.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        )}
                    </div>
                    {w.tags.length > 0 && (
                        <div className="writing-card-tags">
                            {w.tags.slice(0, 4).map((t, i) => (
                                <span key={t + i} className="chip">{t}</span>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default WritingsList;
