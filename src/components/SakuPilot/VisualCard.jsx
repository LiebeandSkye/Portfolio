import React, { memo, useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiImage, FiExternalLink, FiMaximize2, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Curated local project visuals for instant zero-latency rendering when discussing Kry's portfolio
import cambodiaThumb from '../../assets/DiscoverCambodia/WebsiteThumbnail.webp';
import Memory1 from '../../assets/AI_MemoryPorter/Memory1.png';
import Memory2 from '../../assets/AI_MemoryPorter/Memory2.png';
import nebulaThumb from '../../assets/Nebula/WebsiteThumbnail.jpg';
import nebulaScreenshot1 from '../../assets/Nebula/screenshot1.jpg';
import sakiKaraokeThumb from '../../assets/SakiKaraoke/WebsiteThumbnail.png';
import charmStoreThumb from '../../assets/charmstorekh/WebsiteThumbnail.png';
import sakuWebsiteScreenshot from '../../assets/Saku/Website_Screenshot.png';
import sakuCardsTab from '../../assets/Saku/cards_tab.png';
import sakuReadingTab from '../../assets/Saku/reading_tab.png';
import sakuJishoTab from '../../assets/Saku/jisho_tab.png';
import orgiThumb from '../../assets/Orgi/OrgiThumbnail.png';
import orgiHomepage from '../../assets/Orgi/Orgi_homepage.png';
import orgiFeedpage from '../../assets/Orgi/Orgi_feedpage.png';
import orgiBookpage from '../../assets/Orgi/Orgi_bookpage.png';

const PORTFOLIO_VISUAL_GALLERIES = [
    {
        keywords: ['saku app', 'saku widget', 'anki', 'flashcard', 'saku •', 'graded reader', 'jisho'],
        source: 'Portfolio • Saku App',
        images: [
            { url: sakuWebsiteScreenshot, title: 'Saku App Showcase & Simulator', caption: 'Android home screen & lock screen flashcard widget synced with AnkiDroid.' },
            { url: sakuCardsTab, title: 'Spaced Repetition Cards Tab', caption: 'Direct SQLite ContentProvider IPC card review interface.' },
            { url: sakuReadingTab, title: 'AI Graded Reader', caption: 'Tailored Japanese reading passages generated from due vocabulary.' },
            { url: sakuJishoTab, title: 'Offline Jisho Dictionary', caption: 'Instant offline Japanese dictionary lookup & furigana toggle.' },
        ],
    },
    {
        keywords: ['orgi', 'media curation', 'orgi picks', ' cinematic', 'mangadex', 'tmdb'],
        source: 'Portfolio • Orgi Platform',
        images: [
            { url: orgiThumb, title: 'Orgi — Cinematic & Literary Discovery', caption: 'Unified discovery platform for movies, TV, anime, and manga.' },
            { url: orgiHomepage, title: 'Orgi Homepage & Picks Wizard', caption: '3-step psychological recommendation wizard with Upstash Redis caching.' },
            { url: orgiFeedpage, title: 'Orgi Curated Feed & Verdicts', caption: 'AI-powered editorial verdicts and taste profiles.' },
            { url: orgiBookpage, title: 'Literary & Manga Overlay', caption: 'In-place modal overlays with score rings and synopses.' },
        ],
    },
    {
        keywords: ['nebula', 'project nebula', 'gnosia', 'social deduction'],
        source: 'Portfolio • Project Nebula',
        images: [
            { url: nebulaThumb, title: 'Project Nebula — Multiplayer Deduction', caption: 'Real-time Socket.IO social deduction game inspired by Gnosia.' },
            { url: nebulaScreenshot1, title: 'Nebula Live Discussion & Voting Loop', caption: 'Synchronized day discussion, voting, and night role abilities.' },
        ],
    },
    {
        keywords: ['sakikaraoke', 'karaoke', 'lyric sync', 'lrclib'],
        source: 'Portfolio • SakiKaraoke',
        images: [
            { url: sakiKaraokeThumb, title: 'SakiKaraoke — Collaborative Room', caption: 'Real-time WebSocket synchronized playback and timestamped lyrics.' },
        ],
    },
    {
        keywords: ['charm store', 'charmstore', 'e-commerce', 'stationery'],
        source: 'Portfolio • Charm Store KH',
        images: [
            { url: charmStoreThumb, title: 'Charm Store KH — Online Store & Builder', caption: 'Next.js e-commerce store with custom page-builder admin dashboard.' },
        ],
    },
    {
        keywords: ['memoryporter', 'memory porter', 'context packer'],
        source: 'Portfolio • AI MemoryPorter',
        images: [
            { url: Memory1, title: 'AI MemoryPorter Interface', caption: '100% client-side context packer converting JSON exports into token-optimized Markdown.' },
            { url: Memory2, title: 'Token-Optimized Markdown Export', caption: 'Zero external APIs — privacy-first browser File API processing.' },
        ],
    },
    {
        keywords: ['discover cambodia', 'cambodia tourism'],
        source: 'Portfolio • Discover Cambodia',
        images: [
            { url: cambodiaThumb, title: 'Discover Cambodia Tourism Portal', caption: 'Province guides, cultural heritage, and live OpenWeatherMap integration.' },
        ],
    },
];

// Simple in-memory cache so repeated queries never re-fetch
const webVisualCache = new Map();

function matchPortfolioGallery(query, title) {
    const combined = `${query || ''} ${title || ''}`.toLowerCase();
    for (const entry of PORTFOLIO_VISUAL_GALLERIES) {
        if (entry.keywords.some(k => combined.includes(k))) {
            return entry;
        }
    }
    return null;
}

async function fetchWebVisuals(query) {
    const cacheKey = query.trim().toLowerCase();
    if (webVisualCache.has(cacheKey)) {
        return webVisualCache.get(cacheKey);
    }

    const results = [];

    const wikiPromise = (async () => {
        try {
            const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
                query
            )}&gsrlimit=5&prop=pageimages|extracts|info&inprop=url&exintro=1&explaintext=1&exchars=150&piprop=thumbnail|original&pithumbsize=900&format=json&origin=*`;

            const res = await fetch(wikiUrl);
            if (!res.ok) return [];
            const data = await res.json();
            const pages = Object.values(data?.query?.pages || {});
            const items = [];
            for (const page of pages) {
                const imgUrl = page?.thumbnail?.source || page?.original?.source;
                if (imgUrl && !imgUrl.endsWith('.svg') && !imgUrl.includes('Commons-logo')) {
                    items.push({
                        url: imgUrl,
                        title: page.title || query,
                        caption: page.extract || '',
                        sourceUrl: page.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title || query)}`,
                        sourceName: 'Wikipedia Web Search',
                    });
                }
            }
            return items;
        } catch {
            return [];
        }
    })();

    const openversePromise = (async () => {
        try {
            const ovUrl = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page_size=6`;
            const res = await fetch(ovUrl);
            if (!res.ok) return [];
            const data = await res.json();
            const list = Array.isArray(data?.results) ? data.results : [];
            return list
                .filter(item => item?.thumbnail || item?.url)
                .map(item => ({
                    url: item.url || item.thumbnail,
                    title: item.title || query,
                    caption: item.creator ? `Photo by ${item.creator}` : '',
                    sourceUrl: item.foreign_landing_url || item.url,
                    sourceName: 'Web Image Search',
                }));
        } catch {
            return [];
        }
    })();

    const commonsPromise = (async () => {
        try {
            const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
                query
            )}&gsrnamespace=6&gsrlimit=4&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=900&format=json&origin=*`;

            const res = await fetch(commonsUrl);
            if (!res.ok) return [];
            const data = await res.json();
            const pages = Object.values(data?.query?.pages || {});
            const items = [];
            for (const page of pages) {
                const info = page?.imageinfo?.[0];
                const imgUrl = info?.thumburl || info?.url;
                if (imgUrl && /\.(jpg|jpeg|png|webp)$/i.test(imgUrl)) {
                    const cleanTitle = (page.title || query).replace(/^File:/i, '').replace(/\.[^.]+$/, '');
                    items.push({
                        url: imgUrl,
                        title: cleanTitle,
                        caption: info?.extmetadata?.ImageDescription?.value?.replace(/<[^>]+>/g, '')?.slice(0, 140) || '',
                        sourceUrl: info?.descriptionurl || 'https://commons.wikimedia.org',
                        sourceName: 'Wikimedia Web Search',
                    });
                }
            }
            return items;
        } catch {
            return [];
        }
    })();

    const [wikiItems, ovItems, commonsItems] = await Promise.all([
        wikiPromise,
        openversePromise,
        commonsPromise,
    ]);

    results.push(...wikiItems, ...ovItems, ...commonsItems);

    const deduped = [];
    const seenUrls = new Set();
    for (const item of results) {
        if (item?.url && !seenUrls.has(item.url)) {
            seenUrls.add(item.url);
            deduped.push(item);
        }
    }

    const finalItems = deduped.slice(0, 4);
    webVisualCache.set(cacheKey, finalItems);
    return finalItems;
}

const VisualCard = memo(function VisualCard({ query, title, caption }) {
    const portfolioMatch = useMemo(() => matchPortfolioGallery(query, title), [query, title]);
    const [images, setImages] = useState(() => (portfolioMatch ? portfolioMatch.images : []));
    const [loading, setLoading] = useState(!portfolioMatch);
    const [activeIdx, setActiveIdx] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {
        let cancelled = false;
        if (portfolioMatch) {
            setImages(portfolioMatch.images);
            setLoading(false);
            setActiveIdx(0);
            return;
        }

        if (!query) {
            setLoading(false);
            return;
        }

        setLoading(true);
        fetchWebVisuals(query).then(fetched => {
            if (cancelled) return;
            setImages(fetched);
            setActiveIdx(0);
            setLoading(false);
        });

        return () => {
            cancelled = true;
        };
    }, [query, portfolioMatch]);

    if (loading) {
        return (
            <div className="my-3.5 rounded-xl border border-(--border-light) bg-(--pixel2) p-3.5 animate-pulse">
                <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-4 h-4 rounded bg-(--border-light)" />
                    <div className="h-3 w-36 rounded bg-(--border-light)" />
                </div>
                <div className="h-44 sm:h-52 w-full rounded-lg bg-(--pixel)" />
            </div>
        );
    }

    if (!images || images.length === 0) {
        return null;
    }

    const currentImg = images[activeIdx] || images[0];
    const sourceBadge = portfolioMatch ? portfolioMatch.source : (currentImg.sourceName || 'Web Search Visual');

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="my-4 overflow-hidden rounded-xl border border-(--border-light) bg-(--pixel2) shadow-sm max-w-full"
            >
                {/* Header bar */}
                <div className="flex items-center justify-between gap-2 border-b border-(--border-light) bg-(--pixel) px-3.5 py-2 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                        <FiImage className="text-(--sucess) shrink-0" />
                        <span className="font-semibold text-(--text-light) truncate">
                            {title || currentImg.title || query}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="rounded-md bg-(--pixel2) border border-(--border-light) px-2 py-0.5 text-[10px] font-medium text-(--text-gray)">
                            {sourceBadge}
                        </span>
                        {currentImg.sourceUrl && (
                            <a
                                href={currentImg.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-(--text-gray) hover:text-(--text-light) transition-colors"
                                title="Open image source"
                            >
                                <FiExternalLink size={13} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Main Image Viewport */}
                <div className="relative group bg-black/20 flex items-center justify-center overflow-hidden aspect-[16/10] max-h-[300px] w-full">
                    <img
                        src={currentImg.url}
                        alt={currentImg.title || title || query}
                        loading="lazy"
                        onClick={() => setLightboxOpen(true)}
                        className="h-full w-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
                    />

                    {/* Expand button */}
                    <button
                        onClick={() => setLightboxOpen(true)}
                        className="absolute top-2.5 right-2.5 flex items-center gap-1.5 rounded-lg bg-black/65 backdrop-blur-xs border border-white/15 px-2.5 py-1.5 text-[11px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        aria-label="Inspect full visual"
                    >
                        <FiMaximize2 size={12} />
                        <span>Inspect</span>
                    </button>

                    {/* Carousel Arrows if multiple images */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={() => setActiveIdx((prev) => (prev - 1 + images.length) % images.length)}
                                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-black/80"
                                aria-label="Previous image"
                            >
                                <FiChevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => setActiveIdx((prev) => (prev + 1) % images.length)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-black/80"
                                aria-label="Next image"
                            >
                                <FiChevronRight size={16} />
                            </button>
                        </>
                    )}
                </div>

                {/* Thumbnail Strip for multiple visuals */}
                {images.length > 1 && (
                    <div className="flex items-center gap-2 px-3.5 pt-2.5 overflow-x-auto no-scrollbar">
                        {images.map((img, i) => (
                            <button
                                key={img.url}
                                onClick={() => setActiveIdx(i)}
                                className={`relative h-11 w-16 shrink-0 rounded-md overflow-hidden border transition-all cursor-pointer ${
                                    i === activeIdx
                                        ? 'border-(--sucess) ring-1 ring-(--sucess) opacity-100'
                                        : 'border-(--border-light) opacity-55 hover:opacity-90'
                                }`}
                            >
                                <img src={img.url} alt={img.title} className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}

                {/* Caption footer */}
                {(caption || currentImg.caption) && (
                    <div className="px-3.5 py-2.5 text-xs text-(--text-gray) leading-relaxed">
                        {caption || currentImg.caption}
                    </div>
                )}
            </motion.div>

            {/* Fullscreen Lightbox Portal */}
            {lightboxOpen && typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxOpen(false)}
                        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs cursor-zoom-out"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="relative flex flex-col max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden border border-white/15 bg-[#0d1117] shadow-2xl cursor-default"
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#161b22] text-white">
                                <div className="min-w-0">
                                    <h4 className="text-sm font-semibold truncate">{currentImg.title || title || query}</h4>
                                    <p className="text-[11px] text-gray-400 truncate">{sourceBadge}</p>
                                </div>
                                <button
                                    onClick={() => setLightboxOpen(false)}
                                    className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                                    aria-label="Close visual preview"
                                >
                                    <FiX size={18} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-auto flex items-center justify-center bg-black p-2 min-h-[280px] max-h-[75vh]">
                                <img
                                    src={currentImg.url}
                                    alt={currentImg.title || title}
                                    className="max-h-[70vh] w-auto object-contain rounded"
                                />
                            </div>
                            {(caption || currentImg.caption) && (
                                <div className="px-4 py-3 text-xs text-gray-300 border-t border-white/10 bg-[#161b22]">
                                    {caption || currentImg.caption}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>,
                document.body
            )}
        </>
    );
});

export default VisualCard;
