import Layout from '@/components/layout/Layout';
import ArticleCard from '@/components/news/ArticleCard';
import TopStoriesSidebar from '@/components/news/TopStoriesSidebar';
import NewsSection from '@/components/news/NewsSection';
import NewsletterCard from '@/components/news/NewsletterCard';
import { articles, getArticlesByCategory } from '@/data/newsData';
import Image from 'next/image';

const Index = () => {
  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 3);
  const topStories = articles.slice(3, 8);
  const politicsArticles = getArticlesByCategory('politics');
  const todaysHotSpot = articles.slice(0, 4);
  const editorsPost = articles.slice(4, 8);
  const worldNews = articles.filter(a => a.category === 'World').slice(0, 4);
  const businessNews = getArticlesByCategory('business');
  const travelNews = getArticlesByCategory('travel');

  return (
    <Layout>
      {/* Hero Section */}
      <section className="news-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Featured Area */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Main Featured Article */}
              <div className="md:col-span-2">
                <ArticleCard article={featuredArticle} variant="featured" />
              </div>
              {/* Secondary Articles */}
              {secondaryArticles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="featured" />
              ))}
            </div>
          </div>

          {/* Top Stories Sidebar */}
          <div className="lg:col-span-4">
            <TopStoriesSidebar articles={topStories} />
          </div>
        </div>
      </section>

      {/* Politics Section */}
      <section className="news-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <h2 className="section-title">Politics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Politics Article */}
              {politicsArticles[0] && (
                <div className="md:col-span-1">
                  <ArticleCard article={politicsArticles[0]} />
                </div>
              )}
              {/* Politics List */}
              <div className="space-y-4">
                {articles.slice(2, 5).map((article) => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <TopStoriesSidebar articles={topStories.slice(0, 4)} title="Top Stories" />
          </div>
        </div>
      </section>

      {/* Today's Hot Spot */}
      <section className="bg-secondary py-8">
        <div className="news-container">
          <NewsSection title="Today's Hot Spot" articles={todaysHotSpot} columns={4} />
        </div>
      </section>

      {/* Editors' Post */}
      <section className="news-container py-8">
        <div className="bg-primary/5 rounded-lg p-6">
          <NewsSection title="Editors' Post" articles={editorsPost} columns={4} />
        </div>
      </section>

      {/* World Top News with Newsletter */}
      <section className="news-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <h2 className="section-title">World Top News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Featured World Article */}
              {worldNews[0] && (
                <ArticleCard article={worldNews[0]} variant="featured" />
              )}
              {/* World News Grid */}
              <div className="grid grid-cols-2 gap-3">
                {articles.slice(5, 9).map((article) => (
                  <ArticleCard key={article.id} article={article} variant="small" />
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter & More */}
          <div className="lg:col-span-4 space-y-6">
            <NewsletterCard />
            
            {/* Business Section */}
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <h3 className="section-title">Business</h3>
              {businessNews.slice(0, 2).map((article) => (
                <ArticleCard key={article.id} article={article} variant="small" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Travel Banner */}
      <section className="news-container py-4">
        <div className="relative rounded-lg overflow-hidden h-32">
          <Image
            src="https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80"
            alt="Travel"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/60 flex items-center justify-center z-10">
            <div className="text-center text-primary-foreground">
              <p className="text-3xl font-serif font-bold">It's time to Travel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Hot Spot 2 */}
      <section className="news-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <NewsSection title="Today's Hot Spot" articles={articles.slice(8, 12)} columns={2} />
          </div>
          
          {/* Travel & More Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <h3 className="section-title">Travel</h3>
              {travelNews.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} variant="small" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
