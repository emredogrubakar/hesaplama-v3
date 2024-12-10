import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { calculators } from '../src/config/calculatorCategories.js';

async function generateSitemap() {
  try {
    const sitemap = new SitemapStream({ hostname: 'https://hesaplama.app' });

    // Ana sayfa
    sitemap.write({
      url: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString()
    });

    // Hesaplama araçları
    calculators.forEach(calculator => {
      sitemap.write({
        url: calculator.path,
        changefreq: calculator.changefreq,
        priority: calculator.priority,
        lastmod: new Date().toISOString()
      });
    });

    sitemap.end();

    const xml = await streamToPromise(sitemap);
    createWriteStream('public/sitemap.xml').write(xml.toString());
    console.log('✅ Sitemap başarıyla oluşturuldu');
  } catch (error) {
    console.error('❌ Sitemap oluşturulurken hata:', error);
    process.exit(1);
  }
}

generateSitemap();