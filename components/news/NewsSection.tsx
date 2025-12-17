import { Article } from '@/data/newsData';
import ArticleCard from './ArticleCard';

interface NewsSectionProps {
  title: string;
  articles: Article[];
  variant?: 'grid' | 'horizontal';
  columns?: 2 | 3 | 4;
}

const NewsSection = ({ title, articles, variant = 'grid', columns = 4 }: NewsSectionProps) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-8">
      <h2 className="section-title">{title}</h2>
      <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            variant={variant === 'horizontal' ? 'horizontal' : 'default'}
          />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
