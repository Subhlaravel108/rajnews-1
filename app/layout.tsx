import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Rajasthani News - Latest News, Breaking News, India News',
    template: '%s | Rajasthani News',
  },
  description: 'Stay updated with the latest news, breaking news, politics, business, technology, sports, entertainment, and more from Rajasthan and across India. Your trusted source for comprehensive news coverage.',
  keywords: ['rajasthani news', 'india news', 'breaking news', 'latest news', 'politics', 'business', 'sports', 'entertainment', 'technology', 'rajasthan'],
  authors: [{ name: 'Rajasthani News' }],
  creator: 'Rajasthani News',
  publisher: 'Rajasthani News',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'Rajasthani News',
    title: 'Rajasthani News - Latest News & Breaking News',
    description: 'Stay updated with the latest news, breaking news, and comprehensive coverage from Rajasthan and across India.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajasthani News - Latest News & Breaking News',
    description: 'Stay updated with the latest news, breaking news, and comprehensive coverage from Rajasthan and across India.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
