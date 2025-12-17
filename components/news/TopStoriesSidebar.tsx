import { Article } from '@/data/newsData';
import ArticleCard from './ArticleCard';

interface TopStoriesSidebarProps {
  articles: Article[];
  title?: string;
}

const TopStoriesSidebar = ({ articles, title = 'Top Stories' }: TopStoriesSidebarProps) => {
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <h3 className="section-title">{title}</h3>
      <div className="space-y-1">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="small" />
        ))}
      </div>
    </div>
  );
};

export default TopStoriesSidebar;
