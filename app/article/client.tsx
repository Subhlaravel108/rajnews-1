"use client"
// import { useParams, Link } from 'react-router-dom';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import CategorySidebar from '@/components/news/CategorySidebar';
import SocialFollowCard from '@/components/news/SocialFollowCard';
import NewsletterCard from '@/components/news/NewsletterCard';
import TopStoriesSidebar from '@/components/news/TopStoriesSidebar';
import ArticleCard from '@/components/news/ArticleCard';
import { getArticleById, getRelatedArticles, articles } from '@/data/newsData';
import { Calendar, User, Clock, ChevronRight, Facebook, Twitter, Linkedin, Share2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const article = id ? getArticleById(id) : undefined;
  const relatedArticles = article ? getRelatedArticles(article.id, article.category, 3) : [];
  const recentNews = articles.slice(0, 4);

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

  // Find previous and next articles
  const currentIndex = articles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

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
              href={`/category/${article.category.toLowerCase()}`}
              className="text-black hover:text-primary"
            >
              {article.category}
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
              <span className="category-badge mb-4">{article.category}</span>

              {/* Title */}
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-tight mb-6">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  By {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
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
                {article.content.split('\n\n').map((paragraph, index) => {
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
                })}
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
                    href={`/article/${prevArticle.id}`}
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
                    href={`/article/${nextArticle.id}`}
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
            <TopStoriesSidebar articles={recentNews} title="Recent News" />
            <NewsletterCard />
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default ArticlePage;
