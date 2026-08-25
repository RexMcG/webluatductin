import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://webluatductin.vercel.app';

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
      url: `${baseUrl}/salary-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/court-fee-calculator`,
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
    {
      url: `${baseUrl}/ai-form-checker`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Core Service slugs
  const serviceSlugs = [
    'dan-su-thoa-thuan',
    'hon-nhan-gia-dinh',
    'dat-dai-nha-o',
    'doanh-nghiep-dau-tu',
    'lao-dong-tien-luong',
    'so-huu-tri-tue',
    'hinh-su-bao-chua',
    'thu-tuc-phap-ly-giay-phep',
    'tranh-tung-toa-an',
  ];

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
