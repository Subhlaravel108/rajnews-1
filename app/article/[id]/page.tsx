import type { Metadata } from "next";
import ArticlePage from '../client';
import { getArticleById } from '@/data/newsData';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    return {
      title: 'Article Not Found | Rajasthani News',
      description: 'The article you are looking for does not exist.',
    };
  }

  return {
    title: `${article.title} | Rajasthani News`,
    description: article.excerpt,
    keywords: [article.category, article.author, 'news', 'rajasthani news'],
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
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
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  return <ArticlePage />;
}

