import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  imageUrl?: string;
  type?: 'website' | 'article';
  schemaData?: Record<string, unknown>;
}

export function SEO({ 
  title, 
  description, 
  keywords = [], 
  canonicalUrl,
  imageUrl = 'https://hesaplama.app/calculator.png',
  type = 'website',
  schemaData
}: SEOProps) {
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description,
    url: canonicalUrl,
    image: imageUrl
  };

  const schema = schemaData || defaultSchema;

  return (
    <Helmet>
      {/* Temel Meta Etiketleri */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph Meta Etiketleri */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={imageUrl} />

      {/* Twitter Meta Etiketleri */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}