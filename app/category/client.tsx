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
import { articles, categories, getArticlesByCategory } from '@/data/newsData';
import { ChevronRight, ArrowRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 10;

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  const category = categories.find((c) => c.slug === slug);
  const categoryArticles = slug ? getArticlesByCategory(slug) : [];
  const allArticles = categoryArticles.length > 0 ? categoryArticles : articles;
  const recentNews = articles.slice(0, 4);

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
    if (currentPage > totalPages && totalPages > 0 && slug) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', totalPages.toString());
      router.push(`/category/${slug}?${params.toString()}`);
    }
  }, [currentPage, totalPages, slug, router, searchParams]);
  
  // Show message if no articles
  if (allArticles.length === 0) {
    return (
      <Layout>
        <div className="bg-secondary">
          <div className="news-container py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium">
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
            <span className="text-foreground font-medium">
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
            <TopStoriesSidebar articles={recentNews} title="Recent News" />
            
            <NewsletterCard />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 order-1 lg:order-2">
            <h1 className="section-title text-2xl mb-8">
              {category?.name || 'All News'}
            </h1>

            <div className="space-y-8">
              {paginatedArticles.map((article) => (
                <article
                  key={article.id}
                  className="flex flex-col md:flex-row gap-6 pb-8 border-b border-border"
                >
                  {/* Image */}
                  <Link
                    href={`/article/${article.id}`}
                    className="md:w-1/3 shrink-0"
                  >
                    <div className="aspect-4/3 overflow-hidden rounded-lg relative">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="flex-1">
                    <span className="category-badge mb-3">{article.category}</span>
                    <Link href={`/article/${article.id}`}>
                      <h2 className="font-serif text-xl font-bold text-foreground hover:text-primary transition-colors mb-3">
                        {article.title}
                      </h2>
                    </Link>
                    <div className="news-meta mb-3">
                      <span>{article.date}</span>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Link
                      href={`/article/${article.id}`}
                      className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
                    >
                      READ MORE
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

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

export default CategoryPage;
