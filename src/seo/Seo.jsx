import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteMetadata, getStructuredData, PROFILE_IMAGE, SITE_NAME } from './siteMetadata';

const setMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
};

const setLink = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
};

const setJsonLd = (data) => {
  let element = document.head.querySelector('script[data-seo-jsonld="route"]');
  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.dataset.seoJsonld = 'route';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
};

const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = getRouteMetadata(pathname);
    const keywords = metadata.keywords.join(', ');

    document.title = metadata.title;
    setMeta('meta[name="description"]', { name: 'description', content: metadata.description });
    setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
    setMeta('meta[name="robots"]', { name: 'robots', content: metadata.robots });
    setMeta('meta[name="thumbnail"]', { name: 'thumbnail', content: PROFILE_IMAGE });
    setLink('link[rel="canonical"]', { rel: 'canonical', href: metadata.canonical });

    setMeta('meta[property="og:type"]', { property: 'og:type', content: metadata.ogType });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: metadata.canonical });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: metadata.title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: metadata.description });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: PROFILE_IMAGE });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });

    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: metadata.title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: metadata.description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: PROFILE_IMAGE });

    setJsonLd(getStructuredData(pathname));
  }, [pathname]);

  return null;
};

export default Seo;
