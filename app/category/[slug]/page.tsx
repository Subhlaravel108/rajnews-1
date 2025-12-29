import type { Metadata } from "next";
import CategoryPage from '../client';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Generate metadata based on slug (can be enhanced with API call if needed)
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: `${categoryName} News | Rajasthani News`,
    description: `Latest ${categoryName} news, articles, and updates from Rajasthani News. Stay informed with the most recent ${categoryName.toLowerCase()} stories.`,
    keywords: [categoryName, 'news', 'rajasthani news', slug],
    openGraph: {
      title: `${categoryName} News | Rajasthani News`,
      description: `Latest ${categoryName} news and articles`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${categoryName} News | Rajasthani News`,
      description: `Latest ${categoryName} news and articles`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  return <CategoryPage />;
}

