"use client"
import { useState, useEffect } from 'react';
import { Article } from '@/data/newsData';
import ArticleCard from './ArticleCard';
import { getTopStories, getLatestArticles } from '@/lib/api';

interface TopStoriesSidebarProps {
  title?: string;
  limit?: number;
  type?: 'top' | 'latest'; // Add type prop to distinguish between top stories and latest news
}

const TopStoriesSidebar = ({ title = 'Top Stories', limit = 5, type = 'top' }: TopStoriesSidebarProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = type === 'latest' 
          ? await getLatestArticles(limit)
          : await getTopStories(limit);
        setArticles(data || []);
      } catch (error) {
        console.error(`Error fetching ${type === 'latest' ? 'latest articles' : 'top stories'}:`, error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [limit, type]);

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <h3 className="section-title">{title}</h3>
      {loading ? (
        <div className="space-y-1">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className="space-y-1">
          {articles.map((article: any) => (
            <ArticleCard key={article.id} article={article} variant="small" />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm py-4">No {type === 'latest' ? 'latest news' : 'top stories'} available</p>
      )}
    </div>
  );
};

export default TopStoriesSidebar;
