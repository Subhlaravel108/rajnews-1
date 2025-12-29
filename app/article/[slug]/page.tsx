import type { Metadata } from "next";
import ArticlePage from '../client';
import { getArticleBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    
    // Decode slug in case it's URL encoded
    const decodedSlug = decodeURIComponent(slug);
    const article = await getArticleBySlug(decodedSlug);

    if (!article) {
      return {
        title: 'Article | Rajasthani News',
        description: 'Loading article...',
      };
    }

  // Helper to get category name
  const getCategoryName = (category: any): string => {
    if (!category) return '';
    if (typeof category === 'string') return category;
    if (typeof category === 'object') {
      return category.name || category.title || category.slug || '';
    }
    return '';
  };

  // Helper to get author name
  const getAuthorName = (author: any): string => {
    if (!author) return 'Unknown';
    if (typeof author === 'string') return author;
    if (typeof author === 'object') {
      return author.name || author.username || author.full_name || 'Unknown';
    }
    return 'Unknown';
  };

  const categoryName = getCategoryName(article.category);
  const authorName = getAuthorName(article.author);

  return {
    title: `${article.title} | Rajasthani News`,
    description: article.excerpt || article.description || '',
    keywords: [categoryName, authorName, 'news', 'rajasthani news'],
    authors: [{ name: authorName }],
    openGraph: {
      title: article.title,
      description: article.excerpt || article.description || '',
      type: 'article',
      publishedTime: article.date || article.created_at,
      authors: [authorName],
      images: [
        {
          url: article.image,
          width: 800,
          height: 600,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || article.description || '',
      images: [article.image],
    },
  };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Article | Rajasthani News',
      description: 'Loading article...',
    };
  }
}

export default async function Page({ params }: PageProps) {
  try {
    const { slug } = await params;
    
    // Decode slug in case it's URL encoded
    const decodedSlug = decodeURIComponent(slug);
    
    // Don't call notFound() here - let the client component handle the loading and error states
    // This allows the page to render and show loading/error states properly
    return <ArticlePage />;
  } catch (error) {
    console.error('Error in article page:', error);
    return <ArticlePage />;
  }
}

