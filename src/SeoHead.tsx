import { useEffect } from 'react';
import { SITE } from './siteConfig';

const setMeta = (name: string, content: string, property = false) => {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE.siteUrl}/#website`,
      url: SITE.siteUrl,
      name: SITE.title,
      description: SITE.description,
      inLanguage: SITE.locale,
    },
    {
      '@type': 'Person',
      '@id': `${SITE.siteUrl}/#person`,
      name: SITE.name,
      url: SITE.siteUrl,
      email: SITE.email,
      jobTitle: 'Web Developer',
      address: {
        '@type': 'PostalAddress',
        addressCountry: SITE.country,
      },
      sameAs: [SITE.instagramUrl],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE.siteUrl}/#business`,
      name: `${SITE.name} — Web Development`,
      description: SITE.description,
      url: SITE.siteUrl,
      email: SITE.email,
      areaServed: {
        '@type': 'Country',
        name: SITE.country,
      },
      availableLanguage: SITE.language,
    },
  ],
};

export default function SeoHead() {
  useEffect(() => {
    document.documentElement.lang = SITE.locale.replace('_', '-');
    document.title = SITE.shortTitle;

    setMeta('description', SITE.description);
    setMeta('keywords', SITE.keywords.join(', '));
    setMeta('author', SITE.name);
    setMeta('robots', 'index, follow');
    setMeta('geo.region', SITE.geoRegion);
    setMeta('geo.placename', SITE.country);
    setMeta('language', SITE.language);

    setMeta('og:type', 'website', true);
    setMeta('og:title', SITE.title, true);
    setMeta('og:description', SITE.description, true);
    setMeta('og:url', SITE.siteUrl, true);
    setMeta('og:image', SITE.ogImage, true);
    setMeta('og:locale', SITE.locale, true);
    setMeta('og:site_name', SITE.name, true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', SITE.title);
    setMeta('twitter:description', SITE.description);
    setMeta('twitter:image', SITE.ogImage);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', SITE.siteUrl);
  }, []);

  return (
    <script type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </script>
  );
}
