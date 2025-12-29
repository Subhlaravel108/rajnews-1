"use client"
import Layout from '@/components/layout/Layout';
import ArticleCard from '@/components/news/ArticleCard';
import TopStoriesSidebar from '@/components/news/TopStoriesSidebar';
import NewsSection from '@/components/news/NewsSection';
import NewsletterCard from '@/components/news/NewsletterCard';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getFeaturedArticles, getLatestArticles, getPoliticsArticles, getWorldArticles, getTravelArticles } from '@/lib/api';

const Index = () => {
  const [featuredArticle, setFeaturedArticle] = useState<any>(null);
  const [secondaryArticles, setSecondaryArticles] = useState<any[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [politicsArticles, setPoliticsArticles] = useState<any[]>([]);
  const [loadingPolitics, setLoadingPolitics] = useState(true);
  const [worldNews, setWorldNews] = useState<any[]>([]);
  const [loadingWorldNews, setLoadingWorldNews] = useState(true);
  const [todaysHotSpot, setTodaysHotSpot] = useState<any[]>([]);
  const [loadingTodaysHotSpot, setLoadingTodaysHotSpot] = useState(true);
  const [editorsPost, setEditorsPost] = useState<any[]>([]);
  const [loadingEditorsPost, setLoadingEditorsPost] = useState(true);
  const [travelNews, setTravelNews] = useState<any[]>([]);
  const [loadingTravelNews, setLoadingTravelNews] = useState(true);

  useEffect(() => {
    const fetchFeaturedHero = async () => {
      try {
        setLoadingFeatured(true);
        const data = await getLatestArticles(3);
        if (data && data.length > 0) {
          setFeaturedArticle(data[0]);
          setSecondaryArticles(data.slice(1, 3));
        } else {
          setFeaturedArticle(null);
          setSecondaryArticles([]);
        }
      } catch (error) {
        console.error('Error fetching featured articles:', error);
        setFeaturedArticle(null);
        setSecondaryArticles([]);
      } finally {
        setLoadingFeatured(false);
      }
    };

    const fetchTodaysHotSpot = async () => {
      try {
        setLoadingTodaysHotSpot(true);
        const data = await getLatestArticles(4);
        setTodaysHotSpot(data);
      } catch (error) {
        console.error('Error fetching today\'s hot spot:', error);
        setTodaysHotSpot([]);
      } finally {
        setLoadingTodaysHotSpot(false);
      }
    };

    const fetchEditorsPost = async () => {
      try {
        setLoadingEditorsPost(true);
        const data = await getFeaturedArticles(4);
        setEditorsPost(data);
      } catch (error) {
        console.error('Error fetching editors post:', error);
        setEditorsPost([]);
      } finally {
        setLoadingEditorsPost(false);
      }
    };

    const fetchPoliticsArticles = async () => {
      try {
        setLoadingPolitics(true);
        const data = await getPoliticsArticles(5);
        setPoliticsArticles(data);
      } catch (error) {
        console.error('Error fetching politics articles:', error);
        setPoliticsArticles([]);
      } finally {
        setLoadingPolitics(false);
      }
    };

    const fetchWorldNews = async () => {
      try {
        setLoadingWorldNews(true);
        const data = await getWorldArticles(5);
        setWorldNews(data);
      } catch (error) {
        console.error('Error fetching world news:', error);
        setWorldNews([]);
      } finally {
        setLoadingWorldNews(false);
      }
    };

    const fetchTravelNews = async () => {
      try {
        setLoadingTravelNews(true);
        const data = await getTravelArticles(5);
        setTravelNews(data);
      } catch (error) {
        console.error('Error fetching travel news:', error);
        setTravelNews([]);
      } finally {
        setLoadingTravelNews(false);
      }
    };

    fetchFeaturedHero();
    fetchTodaysHotSpot();
    fetchEditorsPost();
    fetchPoliticsArticles();
    fetchWorldNews();
    fetchTravelNews();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="news-container py-6 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Main Featured Area */}
          <div className="lg:col-span-8">
            {loadingFeatured ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <div className="animate-pulse aspect-video bg-gray-200 rounded-lg"></div>
                </div>
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="animate-pulse aspect-video bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            ) : featuredArticle ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Main Featured Article */}
                <div className="md:col-span-2">
                  <ArticleCard article={featuredArticle} variant="featured" />
                </div>
                {/* Secondary Articles */}
                {secondaryArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="featured-secondary" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No featured articles available</div>
            )}
          </div>

          {/* Top Stories Sidebar */}
          <div className="lg:col-span-4">
            <TopStoriesSidebar />
          </div>
        </div>
      </section>

      {/* Politics Section */}
      <section className="bg-gray-50/50 py-8 md:py-12">
        <div className="news-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            <div className="lg:col-span-8">
              <h2 className="section-title text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 pb-3 border-b-2 border-[#172C64]">Politics</h2>
              {loadingPolitics ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-1">
                    <div className="animate-pulse aspect-video bg-gray-200 rounded-lg"></div>
                  </div>
                  <div className="space-y-4 md:space-y-5">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="animate-pulse h-24 bg-gray-200 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              ) : politicsArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Main Politics Article */}
                  {politicsArticles[0] && (
                    <div className="md:col-span-1">
                      <ArticleCard article={politicsArticles[0]} />
                    </div>
                  )}
                  {/* Politics List */}
                  <div className="space-y-4 md:space-y-5">
                    {politicsArticles.slice(1, 4).map((article) => (
                      <ArticleCard key={article.id} article={article} variant="horizontal" />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No politics articles available</p>
              )}
            </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <TopStoriesSidebar title="Top Stories" limit={4} />
          </div>
          </div>
        </div>
      </section>

      {/* Today's Hot Spot */}
      <section className="bg-white py-8 md:py-12">
        <div className="news-container">
          <div className="mb-6 md:mb-8">
            <h2 className="section-title text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#172C64]">Today's Hot Spot</h2>
            {loadingTodaysHotSpot ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : todaysHotSpot.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {todaysHotSpot.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No latest articles available</p>
            )}
          </div>
        </div>
      </section>

      {/* Editors' Post */}
      <section className="bg-gradient-to-br from-[#F8F4E9] to-white py-8 md:py-12">
        <div className="news-container">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
            <h2 className="section-title text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#F05C03]">Editors' Post</h2>
            {loadingEditorsPost ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : editorsPost.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {editorsPost.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No featured articles available</p>
            )}
          </div>
        </div>
      </section>

      {/* World Top News with Newsletter */}
      <section className="bg-gray-50 py-8 md:py-12">
        <div className="news-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            <div className="lg:col-span-8">
              <h2 className="section-title text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 pb-3 border-b-2 border-[#172C64]">World Top News</h2>
              {loadingWorldNews ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-pulse aspect-video bg-gray-200 rounded-lg"></div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="animate-pulse aspect-video bg-gray-200 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              ) : worldNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Featured World Article */}
                  {worldNews[0] && (
                    <ArticleCard article={worldNews[0]} variant="featured-secondary" />
                  )}
                  {/* World News Grid */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {worldNews.slice(1, 5).map((article) => (
                      <ArticleCard key={article.id} article={article} variant="small" />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No world news available</p>
              )}
            </div>

            {/* Newsletter & More */}
            <div className="lg:col-span-4 space-y-6">
              <NewsletterCard />
              
            </div>
          </div>
        </div>
      </section>

      {/* Travel Banner */}
      <section className="news-container py-6 md:py-8">
        <div className="relative rounded-2xl overflow-hidden h-40 md:h-48 lg:h-56 shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80"
            alt="Travel"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#172C64]/80 to-[#F05C03]/70 flex items-center justify-center z-10">
            <div className="text-center text-white px-4">
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold drop-shadow-lg">It's time to Travel</p>
              <p className="text-sm md:text-base mt-2 text-white/90">Explore the world with us</p>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Hot Spot 2 */}
      <section className="bg-white py-8 md:py-12">
        <div className="news-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Top News / Today's Hot Spot */}
            <div className="lg:col-span-8">
              <h2 className="section-title text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 pb-3 border-b-2 border-[#172C64]">Top News</h2>
              {loadingTodaysHotSpot ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : todaysHotSpot.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {todaysHotSpot.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No latest articles available</p>
              )}
            </div>
            
            {/* Travel Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-md border border-gray-100">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 pb-2 border-b-2 border-[#172C64]">Travel</h3>
                {loadingTravelNews ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className="animate-pulse h-24 bg-gray-200 rounded-lg"></div>
                    ))}
                  </div>
                ) : travelNews.length > 0 ? (
                  <div className="space-y-4">
                    {travelNews.slice(0, 5).map((article) => (
                      <ArticleCard key={article.id} article={article} variant="small" />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4 text-sm">No travel articles available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
