"use client"
// import { useParams, Link } from 'react-router-dom';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import CategorySidebar from '@/components/news/CategorySidebar';
import SocialFollowCard from '@/components/news/SocialFollowCard';
import NewsletterCard from '@/components/news/NewsletterCard';
import TopStoriesSidebar from '@/components/news/TopStoriesSidebar';
import ArticleCard from '@/components/news/ArticleCard';
import { getArticleBySlug } from '@/lib/api';
import { getCategoryArticles } from '@/lib/api';
import { Calendar, User, Clock, ChevronRight, Facebook, Twitter, Linkedin, Share2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateSlug } from '@/lib/utils';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [prevArticle, setPrevArticle] = useState<any>(null);
  const [nextArticle, setNextArticle] = useState<any>(null);

  // Helper functions
  const getCategoryName = (category: any): string => {
    if (!category) return '';
    if (typeof category === 'string') return category;
    if (typeof category === 'object') {
      return category.name || category.title || category.slug || '';
    }
    return '';
  };

  const getAuthorName = (author: any): string => {
    if (!author) return 'Unknown';
    if (typeof author === 'string') return author;
    if (typeof author === 'object') {
      return author.name || author.username || author.full_name || 'Unknown';
    }
    return 'Unknown';
  };

  const getTimeAgo = (dateValue: any): string => {
    let dateString: string;
    if (typeof dateValue === 'string') {
      dateString = dateValue;
    } else if (dateValue && typeof dateValue === 'object' && dateValue.created_at) {
      dateString = dateValue.created_at;
    } else if (dateValue && typeof dateValue === 'object' && dateValue.date) {
      dateString = dateValue.date;
    } else {
      return 'Recently';
    }

    const dateParts = dateString.split(' ');
    if (dateParts.length >= 3) {
      return dateString;
    }
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Helper function to strip HTML tags from text (works in browser)
  const stripHtmlTags = (html: string): string => {
    if (!html || typeof window === 'undefined') {
      // Server-side or no HTML: use regex to strip tags
      if (!html) return '';
      return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    }
    // Client-side: use DOM method
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Helper function to check if string contains HTML
  const containsHtml = (str: string): boolean => {
    if (!str) return false;
    return /<[a-z][\s\S]*>/i.test(str);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Decode slug in case it's URL encoded
        const decodedSlug = decodeURIComponent(slug as string);
        // console.log('Fetching article for slug:', decodedSlug);
        const articleData = await getArticleBySlug(decodedSlug);
        // console.log('Article data received:', articleData);
        
        if (articleData) {
          setArticle(articleData);
          
          // Fetch related articles from the same category
          const categorySlug = typeof articleData.category === 'object' 
            ? articleData.category.slug || articleData.category.name?.toLowerCase() 
            : articleData.category?.toLowerCase() || '';
          
          if (categorySlug) {
            const categoryArticles = await getCategoryArticles(categorySlug, 10);
            // Decode slug for comparison
            const decodedSlug = decodeURIComponent(slug as string);
            // Filter out current article and get related ones
            const related = categoryArticles
              .filter((a: any) => {
                const articleSlug = a.slug || generateSlug(a.title);
                return articleSlug !== decodedSlug && articleSlug !== slug;
              })
              .slice(0, 3);
            setRelatedArticles(related);
            
            // Find previous and next articles
            const currentIndex = categoryArticles.findIndex((a: any) => {
              const articleSlug = a.slug || generateSlug(a.title);
              return articleSlug === decodedSlug || articleSlug === slug;
            });
            
            if (currentIndex > 0) {
              setPrevArticle(categoryArticles[currentIndex - 1]);
            }
            if (currentIndex < categoryArticles.length - 1 && currentIndex >= 0) {
              setNextArticle(categoryArticles[currentIndex + 1]);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="news-container py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="news-container py-16 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const categoryName = getCategoryName(article.category);
  const authorName = getAuthorName(article.author);
  const articleDate = getTimeAgo(article.date || article.created_at);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary">
        <div className="news-container py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link
              href={`/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-black hover:text-primary"
            >
              {categoryName}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-orange-600 font-medium line-clamp-1">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="news-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-8">
            <article>
              {/* Category Badge */}
              <span className="category-badge mb-4">{categoryName}</span>

              {/* Title */}
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-tight mb-6">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  By {authorName}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {articleDate}
                </span>
                {article.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                )}
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-2 mb-6">
                <Button  className="bg-[#1877f2] hover:bg-[#1877f2]/90">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button  className="bg-[#1da1f2] hover:bg-[#1da1f2]/90">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button  className="bg-[#0077b5] hover:bg-[#0077b5]/90">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button  >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Featured Image */}
              <div className="mb-8 rounded-lg overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {article.content ? (
                  // Check if content is HTML
                  containsHtml(article.content) ? (
                    <div 
                      className="text-black leading-relaxed article-content"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  ) : (
                    // Handle plain text content
                    article.content.split('\n\n').map((paragraph: string, index: number) => {
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={index} className="font-serif text-xl font-bold text-black mt-8 mb-4">
                            {paragraph.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (paragraph.startsWith('- ')) {
                        const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                        return (
                          <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-black">
                            {items.map((item, i) => (
                              <li key={i}>{item.replace('- ', '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={index} className="text-black leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      );
                    })
                  )
                ) : (
                  <div className="text-black leading-relaxed mb-4">
                    {article.description || article.excerpt ? (
                      containsHtml(article.description || article.excerpt || '') ? (
                        <div 
                          className="article-content"
                          dangerouslySetInnerHTML={{ __html: article.description || article.excerpt }}
                        />
                      ) : (
                        <p>{article.description || article.excerpt}</p>
                      )
                    ) : (
                      <p>No content available.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Share Section */}
              <div className="flex items-center gap-4 py-6 border-t border-b border-border mt-8">
                <span className="text-sm font-medium">Share:</span>
                <div className="flex gap-2">
                  <Button  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Previous/Next Navigation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
                {prevArticle && (
                  <Link
                    href={`/article/${prevArticle.slug || generateSlug(prevArticle.title)}`}
                    className="flex items-center gap-3 p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-xs text-muted-foreground">Previous Post</span>
                      <p className="text-sm font-medium text-black line-clamp-2">{prevArticle.title}</p>
                    </div>
                  </Link>
                )}
                {nextArticle && (
                  <Link
                    href={`/article/${nextArticle.slug || generateSlug(nextArticle.title)}`}
                    className="flex items-center gap-3 p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors md:text-right md:flex-row-reverse"
                  >
                    <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-xs text-muted-foreground">Next Post</span>
                      <p className="text-sm font-medium text-black line-clamp-2">{nextArticle.title}</p>
                    </div>
                  </Link>
                )}
              </div>
            </article>

            {/* Related Posts */}
            {relatedArticles.length > 0 && (
              <section className="mt-12">
                <h2 className="section-title text-xl mb-6">Related Post</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((related) => (
                    <ArticleCard key={related.id} article={related} />
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <CategorySidebar />
            <SocialFollowCard />
            <TopStoriesSidebar title="Recent News" limit={5} />
            <NewsletterCard />
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default ArticlePage;
