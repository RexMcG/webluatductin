import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site';
import { SERVICES_DATA } from '@/data/servicesData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.baseUrl;

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/appointment`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-form-library`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-chatbot`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },

    {
      url: `${baseUrl}/court-fee-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/salary-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pit-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Core Service slugs
  // Hình sự và Sở hữu trí tuệ chưa hiển thị trên trang /services nên không đưa vào sitemap
  const HIDDEN_SERVICE_SLUGS = ['hinh-su-bao-chua', 'so-huu-tri-tue'];
  const serviceSlugs = Object.keys(SERVICES_DATA).filter((slug) => !HIDDEN_SERVICE_SLUGS.includes(slug));

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // News articles slugs
  const newsSlugs = [
    'so-do-tu-duy-4-quyen-loi-nguoi-lao-dong-khi-nghi-viec-2026',
    'luat-dat-dai-2024-nhung-diem-moi-can-biet',
    'huong-dan-thanh-lap-doanh-nghiep-fdi',
    'thu-tuc-ly-hon-thuan-tinh-nhanh-nhat',
    'cach-tinh-tien-luong-lam-them-gio',
    'bao-ve-nhan-hieu-va-ban-quyen-tac-gia',
    'kinh-nghiem-tham-gia-phien-toa-so-tham',
  ];

  const newsRoutes: MetadataRoute.Sitemap = newsSlugs.map((slug) => ({
    url: `${baseUrl}/news/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...newsRoutes];
}
