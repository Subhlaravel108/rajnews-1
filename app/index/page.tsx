import type { Metadata } from "next";
import Index from '../client';

export const metadata: Metadata = {
  title: 'Rajasthani News - Latest News, Breaking News, India News',
  description: 'Stay updated with the latest news, breaking news, politics, business, technology, sports, entertainment, and more from Rajasthan and across India. Your trusted source for comprehensive news coverage.',
  keywords: ['rajasthani news', 'india news', 'breaking news', 'latest news', 'politics', 'business', 'sports', 'entertainment', 'technology'],
  authors: [{ name: 'Rajasthani News' }],
  openGraph: {
    title: 'Rajasthani News - Latest News & Breaking News',
    description: 'Stay updated with the latest news, breaking news, and comprehensive coverage from Rajasthan and across India.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajasthani News - Latest News & Breaking News',
    description: 'Stay updated with the latest news, breaking news, and comprehensive coverage from Rajasthan and across India.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <Index />;
}