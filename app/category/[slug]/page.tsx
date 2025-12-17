import type { Metadata } from "next";
import CategoryPage from '../client';
import { categories } from '@/data/newsData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: 'Category Not Found | Rajasthani News',
      description: 'The category you are looking for does not exist.',
    };
  }

  return {
    title: `${category.name} News | Rajasthani News`,
    description: `Latest ${category.name} news, articles, and updates from Rajasthani News. Stay informed with the most recent ${category.name.toLowerCase()} stories.`,
    keywords: [category.name, 'news', 'rajasthani news', category.slug],
    openGraph: {
      title: `${category.name} News | Rajasthani News`,
      description: `Latest ${category.name} news and articles`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${category.name} News | Rajasthani News`,
      description: `Latest ${category.name} news and articles`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  return <CategoryPage />;
}

