import React, { memo, useCallback, useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { FiExternalLink, FiMaximize2, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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

const overlayButton =
    'flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-xs transition-opacity hover:bg-black/75 cursor-pointer sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100';

/**
 * Image card: the picture first, one short title line under it.
 * Several images become a swipeable set with small dots (no thumbnail strip,
 * no source badges).
 */
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

    const closeLightbox = useCallback(() => setLightboxOpen(false), []);

    useEffect(() => {
        if (!lightboxOpen) return undefined;
        const onKey = e => {
            if (e.key === 'Escape') closeLightbox();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightboxOpen, closeLightbox]);

    if (loading) {
        return (
            <div className="my-3 w-full animate-pulse overflow-hidden rounded-2xl border border-(--border-light) bg-(--pixel2)">
                <div className="aspect-[16/10] max-h-[320px] w-full bg-(--pixel)" />
                <div className="px-3.5 py-3">
                    <div className="h-3 w-40 rounded bg-(--pixel)" />
                </div>
            </div>
        );
    }

    if (!images || images.length === 0) {
        return null;
    }

    const currentImg = images[activeIdx] || images[0];
    const heading = title || currentImg.title || query;
    const subtext = caption || currentImg.caption;
    const showArrows = images.length > 1;

    const step = delta => setActiveIdx(prev => (prev + delta + images.length) % images.length);

    return (
        <>
            <motion.figure
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="my-3 w-full max-w-full overflow-hidden rounded-2xl border border-(--border-light) bg-(--pixel2)"
            >
                <div className="group relative aspect-[16/10] max-h-[320px] w-full overflow-hidden bg-(--pixel)">
                    <img
                        src={currentImg.url}
                        alt={currentImg.title || title || query}
                        loading="lazy"
                        onClick={() => setLightboxOpen(true)}
                        className="h-full w-full cursor-zoom-in object-cover"
                    />

                    <div className="absolute right-2.5 top-2.5 flex gap-1.5">
                        {currentImg.sourceUrl && (
                            <a
                                href={currentImg.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open image source"
                                title="Open source"
                                className={overlayButton}
                            >
                                <FiExternalLink size={14} />
                            </a>
                        )}
                        <button
                            type="button"
                            onClick={() => setLightboxOpen(true)}
                            aria-label="Expand image"
                            title="Expand"
                            className={overlayButton}
                        >
                            <FiMaximize2 size={14} />
                        </button>
                    </div>

                    {showArrows && (
                        <>
                            <button
                                type="button"
                                onClick={() => step(-1)}
                                aria-label="Previous image"
                                className={`${overlayButton} absolute left-2.5 top-1/2 -translate-y-1/2`}
                            >
                                <FiChevronLeft size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => step(1)}
                                aria-label="Next image"
                                className={`${overlayButton} absolute right-2.5 top-1/2 -translate-y-1/2`}
                            >
                                <FiChevronRight size={16} />
                            </button>
                            <div className="absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5">
                                {images.map((img, i) => (
                                    <button
                                        key={img.url}
                                        type="button"
                                        onClick={() => setActiveIdx(i)}
                                        aria-label={`Show image ${i + 1}`}
                                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                            i === activeIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/55 hover:bg-white/80'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {(heading || subtext) && (
                    <figcaption className="px-3.5 py-2.5">
                        {heading && <p className="truncate text-sm font-medium text-(--text-light)">{heading}</p>}
                        {subtext && <p className="mt-0.5 line-clamp-1 text-xs text-(--text-gray)">{subtext}</p>}
                    </figcaption>
                )}
            </motion.figure>

            {lightboxOpen && typeof document !== 'undefined' && createPortal(
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label={heading || 'Image preview'}
                    className="fixed inset-0 z-70 flex cursor-zoom-out items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
                >
                    <button
                        type="button"
                        onClick={closeLightbox}
                        aria-label="Close preview"
                        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
                    >
                        <FiX size={18} />
                    </button>
                    <div onClick={e => e.stopPropagation()} className="flex max-h-full max-w-4xl cursor-default flex-col items-center gap-3">
                        <img
                            src={currentImg.url}
                            alt={currentImg.title || title || query}
                            className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain"
                        />
                        {heading && <p className="max-w-full truncate text-sm text-white/80">{heading}</p>}
                    </div>
                </motion.div>,
                document.body
            )}
        </>
    );
});

export default VisualCard;
