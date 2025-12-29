"use client"
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import ArticleCard from '@/components/news/ArticleCard';
import CategorySidebar from '@/components/news/CategorySidebar';
import SocialFollowCard from '@/components/news/SocialFollowCard';
import NewsletterCard from '@/components/news/NewsletterCard';
import TopStoriesSidebar from '@/components/news/TopStoriesSidebar';
import { getCityArticles } from '@/lib/api';
import { ChevronRight, ArrowRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateSlug } from '@/lib/utils';

const ITEMS_PER_PAGE = 10;

const CityPage = () => {
  const { cityname } = useParams<{ cityname: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  const [cityArticles, setCityArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  
  // Format city name for display
  const getCityDisplayName = (citySlug: string): string => {
    if (!citySlug) return '';
    return citySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const cityDisplayName = cityname ? getCityDisplayName(cityname as string) : '';

  const allArticles = cityArticles.length > 0 ? cityArticles : [];

  // Calculate pagination - ensure currentPage is valid
  const totalPages = Math.max(1, Math.ceil(allArticles.length / ITEMS_PER_PAGE));
  const validPage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedArticles = allArticles.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const current = validPage;
      pages.push(1);
      
      let start = Math.max(2, current - 2);
      let end = Math.min(totalPages - 1, current + 2);
      
      if (current <= 4) {
        start = 2;
        end = Math.min(5, totalPages - 1);
      }
      
      if (current >= totalPages - 3) {
        start = Math.max(2, totalPages - 4);
        end = totalPages - 1;
      }
      
      if (start > 2) {
        pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Fetch city articles
  useEffect(() => {
    const fetchCityArticles = async () => {
      if (!cityname) {
        setCityArticles([]);
        setLoadingArticles(false);
        return;
      }
      
      try {
        setLoadingArticles(true);
        const decodedCityName = decodeURIComponent(cityname as string);
        const data = await getCityArticles(decodedCityName, 100); // Fetch more for pagination
        setCityArticles(data);
      } catch (error) {
        console.error('Error fetching city articles:', error);
        setCityArticles([]);
      } finally {
        setLoadingArticles(false);
      }
    };

    fetchCityArticles();
  }, [cityname]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== validPage) {
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', page.toString());
      }
      router.push(`/city/${cityname}${params.toString() ? `?${params.toString()}` : ''}`);
    }
  };
  
  // Redirect if page is out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0 && cityname && allArticles.length > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', totalPages.toString());
      router.push(`/city/${cityname}?${params.toString()}`);
    }
  }, [currentPage, totalPages, cityname, router, searchParams, allArticles.length]);
  
  // Show message if no articles (only when not loading)
  if (!loadingArticles && allArticles.length === 0) {
    return (
      <Layout>
        <div className="bg-secondary">
          <div className="news-container py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground text-orange-600 font-medium">
                {cityDisplayName}
              </span>
            </nav>
          </div>
        </div>
        <div className="news-container py-16 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">No Articles Found</h1>
          <p className="text-muted-foreground mb-6">There are no articles available for {cityDisplayName} yet.</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary">
        <div className="news-container py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-orange-600 font-medium">
              {cityDisplayName}
            </span>
          </nav>
        </div>
      </div>

      <div className="news-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            <CategorySidebar />
            <SocialFollowCard />
            
            {/* Recent News */}
            <TopStoriesSidebar title="Recent News" limit={5} type="latest" />
            
            <NewsletterCard />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 order-1 lg:order-2">
            <h1 className="section-title text-2xl mb-8">
              {loadingArticles ? 'Loading...' : `${cityDisplayName} News`}
            </h1>

            {loadingArticles ? (
              <div className="space-y-8">
                {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-6 pb-8 border-b border-border animate-pulse">
                    <div className="md:w-1/3 shrink-0 aspect-4/3 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {paginatedArticles.map((article) => (
                <article
                  key={article.id}
                  className="flex flex-col md:flex-row gap-6 pb-8 border-b border-border"
                >
                  {/* Image */}
                  <Link
                    href={`/article/${article.slug || generateSlug(article.title)}`}
                    className="md:w-1/3 shrink-0"
                  >
                    <div className="aspect-4/3 overflow-hidden rounded-lg relative">
                      {article.image ? (
                        <Image
                          src={article.image}
                          alt={article.title || ''}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="flex-1">
                    <span className="category-badge mb-3">
                      {typeof article.category === 'object' 
                        ? article.category.name || article.category.title || ''
                        : article.category || 'News'}
                    </span>
                    <Link href={`/article/${article.slug || generateSlug(article.title)}`}>
                      <h2 className="font-serif text-xl font-bold text-black hover:text-primary transition-colors mb-3">
                        {article.title}
                      </h2>
                    </Link>
                    <div className="news-meta mb-3">
                      <span>{new Date(article.created_at || article.date).toLocaleDateString("en-IN",{
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}</span>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt || article.description}
                    </p>
                    <Link
                      href={`/article/${article.slug || generateSlug(article.title)}`}
                      className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
                    >
                      READ MORE
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mt-12">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Showing {startIndex + 1}-{Math.min(endIndex, allArticles.length)} of {allArticles.length} {allArticles.length === 1 ? 'article' : 'articles'}
                  </span>
                </div>
                <div className="flex items-center gap-1 flex-wrap justify-center">
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(validPage - 1)}
                    disabled={validPage === 1}
                    className="gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  {/* Page Numbers */}
                  {pageNumbers.map((page, index) => {
                    if (page === '...') {
                      return (
                        <span key={`ellipsis-${index}`} className="px-2 py-1 text-muted-foreground">
                          ...
                        </span>
                      );
                    }
                    const pageNum = page as number;
                    return (
                      <Button
                        key={pageNum}
                        variant={validPage === pageNum ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className={validPage === pageNum ? 'bg-primary' : ''}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  {/* Next Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(validPage + 1)}
                    disabled={validPage === totalPages}
                    className="gap-1"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default CityPage;


