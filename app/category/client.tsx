"use client"
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import ArticleCard from '@/components/news/ArticleCard';
import CategorySidebar from '@/components/news/CategorySidebar';
import SocialFollowCard from '@/components/news/SocialFollowCard';
import NewsletterCard from '@/components/news/NewsletterCard';
import TopStoriesSidebar from '@/components/news/TopStoriesSidebar';
import { getCategories, getCategoryArticles, ARTICLE_FALLBACK_IMAGE, isApiMediaOrigin, resolveArticleImageUrl } from '@/lib/api';
import { ChevronRight, ArrowRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { articleHref, htmlToPlainText } from '@/lib/utils';

const ITEMS_PER_PAGE = 10;

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryArticles, setCategoryArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  
  // Helper function to get category name from object or string
  const getCategoryName = (category: any): string => {
    if (!category) return '';
    if (typeof category === 'string') return category;
    if (typeof category === 'object') {
      return category.name || category.title || category.slug || '';
    }
    return '';
  };

  const category = categories.find((c) => c.slug === slug);
  const allArticles = categoryArticles.length > 0 ? categoryArticles : [];

  // Calculate pagination - ensure currentPage is valid
  const totalPages = Math.max(1, Math.ceil(allArticles.length / ITEMS_PER_PAGE));
  const validPage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedArticles = allArticles.slice(startIndex, endIndex);

  // Generate page numbers to display - improved logic
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // Show up to 7 page numbers
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const current = validPage;
      
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of visible range
      let start = Math.max(2, current - 2);
      let end = Math.min(totalPages - 1, current + 2);
      
      // Adjust if we're near the beginning
      if (current <= 4) {
        start = 2;
        end = Math.min(5, totalPages - 1);
      }
      
      // Adjust if we're near the end
      if (current >= totalPages - 3) {
        start = Math.max(2, totalPages - 4);
        end = totalPages - 1;
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add pages in the visible range
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Fetch categories and category articles
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    const fetchCategoryArticles = async () => {
      if (!slug) {
        setCategoryArticles([]);
        setLoadingArticles(false);
        return;
      }
      
      try {
        setLoadingArticles(true);
        const data = await getCategoryArticles(slug, 100); // Fetch more for pagination
        setCategoryArticles(data);
      } catch (error) {
        console.error('Error fetching category articles:', error);
        setCategoryArticles([]);
      } finally {
        setLoadingArticles(false);
      }
    };

    fetchCategories();
    fetchCategoryArticles();
  }, [slug]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== validPage) {
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', page.toString());
      }
      router.push(`/category/${slug}${params.toString() ? `?${params.toString()}` : ''}`);
    }
  };
  
  // Redirect if page is out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0 && slug && allArticles.length > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', totalPages.toString());
      router.push(`/category/${slug}?${params.toString()}`);
    }
  }, [currentPage, totalPages, slug, router, searchParams, allArticles.length]);
  
  // Show message if no articles (only when not loading)
  if (!loadingArticles && !loadingCategories && allArticles.length === 0) {
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
                {category?.name || 'All News'}
              </span>
            </nav>
          </div>
        </div>
        <div className="news-container py-16 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">No Articles Found</h1>
          <p className="text-muted-foreground mb-6">There are no articles in this category yet.</p>
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
              {category?.name || 'All News'}
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
              {loadingCategories ? 'Loading...' : (category?.name || 'All News')}
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
                {paginatedArticles.map((article) => {
                const listImg = resolveArticleImageUrl(article) || ARTICLE_FALLBACK_IMAGE
                return (
                <article
                  key={article.id}
                  className="flex flex-col md:flex-row gap-6 pb-8 border-b border-border min-w-0"
                >
                  {/* Image */}
                  <Link
                    href={articleHref(article)}
                    className="md:w-1/3 shrink-0 min-w-0"
                  >
                    <div className="aspect-4/3 overflow-hidden rounded-lg relative bg-[#172C64]/10">
                      <Image
                        src={listImg}
                        alt={htmlToPlainText(String(article.title || '')).slice(0, 200)}
                        fill
                        unoptimized={isApiMediaOrigin(listImg)}
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <span className="category-badge mb-3">{getCategoryName(article.category)}</span>
                    <Link href={articleHref(article)}>
                      <h2 className="font-serif text-xl font-bold  text-black hover:text-primary transition-colors mb-3 break-words line-clamp-3 [overflow-wrap:anywhere]">
                        {article.title}
                      </h2>
                    </Link>
                    <div className="news-meta mb-3">
                      <span>{new Date(article.created_at).toLocaleDateString("en-IN",{
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}</span>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-3 break-words [overflow-wrap:anywhere]">
                      {article.excerpt || htmlToPlainText(article.description || '')}
                    </p>
                    <Link
                      href={articleHref(article)}
                      className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
                    >
                      READ MORE
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
                );
                })}
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
                    className="gap-1 text-white cursor-pointer"
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
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className={
                          validPage === pageNum
                            ? 'min-w-9 shrink-0 border-[#F05C03] bg-[#F05C03] text-white hover:bg-[#F05C03]/90 hover:text-white cursor-pointer'
                            : 'min-w-9 shrink-0 border-[#172C64] bg-[#172C64] text-white hover:bg-[#172C64]/90 hover:text-white cursor-pointer'
                        }
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
                    className="gap-1 text-white cursor-pointer"
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

export default CategoryPage;
