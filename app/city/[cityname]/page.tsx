import type { Metadata } from "next";
import CityPage from '../client';

interface PageProps {
  params: Promise<{ cityname: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cityname } = await params;
  
  // Decode city name and format it
  const decodedCityName = decodeURIComponent(cityname);
  const cityNameFormatted = decodedCityName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${cityNameFormatted} News | Rajasthani News`,
    description: `Latest news, articles, and updates from ${cityNameFormatted}. Stay informed with the most recent local news and stories.`,
    keywords: [cityNameFormatted, 'news', 'rajasthani news', 'local news', decodedCityName],
    openGraph: {
      title: `${cityNameFormatted} News | Rajasthani News`,
      description: `Latest news and articles from ${cityNameFormatted}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${cityNameFormatted} News | Rajasthani News`,
      description: `Latest news and articles from ${cityNameFormatted}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  return <CityPage />;
}
