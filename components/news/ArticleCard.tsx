import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock, Eye, ArrowRight, Play } from 'lucide-react';
import { Article } from '@/data/newsData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'horizontal' | 'small' | 'featured' | 'breaking' | 'video';
  showExcerpt?: boolean;
  showCategory?: boolean;
  showMeta?: boolean;
}

const ArticleCard = ({ 
  article, 
  variant = 'default',
  showExcerpt = true,
  showCategory = true,
  showMeta = true
}: ArticleCardProps) => {
  
  const getTimeAgo = (dateString: string) => {
    const dateParts = dateString.split(' ');
    if (dateParts.length >= 3) {
      return dateString;
    }
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    } catch {
      return dateString;
    }
  };

  // Video variant
  if (variant === 'video') {
    return (
      <Link 
        href={`/article/${article.id}`} 
        className="group block relative overflow-hidden rounded-xl bg-gradient-to-b from-[#172C64] to-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
      >
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#F05C03] to-[#F0C24C] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
          </div>
          
          {/* Duration badge */}
          {article.duration && (
            <div className="absolute top-3 right-3 bg-black/80 text-[#F0C24C] px-2 py-1 rounded-md text-xs font-semibold">
              {article.duration}
            </div>
          )}
        </div>
        
        <div className="p-4 bg-[#F8F4E9]">
          {showCategory && (
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant="outline" 
                className="bg-[#9A1C20]/10 text-[#9A1C20] border-[#9A1C20]/20 text-[10px] font-semibold"
              >
                VIDEO
              </Badge>
              <Badge 
                variant="secondary" 
                className="text-[10px] bg-[#172C64] text-white"
              >
                {article.category}
              </Badge>
            </div>
          )}
          
          <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#F05C03] transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
          
          {showMeta && (
            <div className="flex items-center justify-between text-xs text-[#4A5568]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {article.views?.toLocaleString() || '2.5K'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {getTimeAgo(article.date)}
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Featured variant
  if (variant === 'featured') {
    return (
      <Link 
        href={`/article/${article.id}`} 
        className="group block relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:shadow-3xl border-2 border-[#172C64]"
      >
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#172C64]/90 via-[#172C64]/50 to-transparent" />
          
          {/* Breaking news indicator */}
          {article.isBreaking && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-gradient-to-r from-[#9A1C20] to-[#F05C03] text-white animate-pulse px-3 py-1">
                BREAKING
              </Badge>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/90 to-transparent">
          <div className="max-w-3xl">
            {showCategory && (
              <Badge 
                variant="secondary" 
                className="mb-3 bg-[#F0C24C] text-[#172C64] border-[#F0C24C] hover:bg-[#F0C24C]/90"
              >
                {article.category}
              </Badge>
            )}
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white group-hover:text-[#F0C24C] transition-colors mb-3 line-clamp-2">
              {article.title}
            </h2>
            
            {showExcerpt && (
              <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-2">
                {article.excerpt}
              </p>
            )}
            
            {showMeta && (
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  <User className="w-3 h-3" />
                  {article.author}
                </span>
                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Calendar className="w-3 h-3" />
                  {article.date}
                </span>
                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>
            )}
            
            {/* Read more button */}
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4 bg-[#F05C03] text-white border-[#F05C03] hover:bg-[#F05C03]/90 hover:text-white"
            >
              Read Full Story
              <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Link>
    );
  }

  // Breaking news variant - Updated
  if (variant === 'breaking') {
    return (
      <Link 
        href={`/article/${article.id}`} 
        className="group block relative overflow-hidden rounded-lg bg-gradient-to-r from-[#9A1C20]/20 to-[#F05C03]/10 border-l-4 border-[#9A1C20] p-4 hover:border-[#F05C03] transition-all duration-300 hover:shadow-lg bg-white"
      >
        <div className="flex items-start gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-[#9A1C20] rounded-full animate-pulse" />
            <div className="w-3 h-3 bg-[#9A1C20] rounded-full animate-pulse absolute inset-0" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant="outline" 
                className="bg-[#9A1C20] text-white border-[#9A1C20] text-[10px] px-2 py-0"
              >
                LIVE
              </Badge>
              {showCategory && (
                <span className="text-xs text-[#172C64] font-semibold">
                  {article.category}
                </span>
              )}
            </div>
            
            <h3 className="text-sm font-semibold text-[#1A1A1A] group-hover:text-[#F05C03] transition-colors line-clamp-2">
              {article.title}
            </h3>
            
            {showMeta && (
              <div className="flex items-center gap-3 mt-2 text-xs text-[#4A5568]">
                <span>{getTimeAgo(article.date)}</span>
                <span>•</span>
                <span>{article.author}</span>
              </div>
            )}
          </div>
          
          <ArrowRight className="w-4 h-4 text-[#172C64] group-hover:text-[#F05C03] transition-colors shrink-0 mt-1" />
        </div>
      </Link>
    );
  }

  // Horizontal variant - Updated
  if (variant === 'horizontal') {
    return (
      <Link 
        href={`/article/${article.id}`} 
        className="group flex gap-4 items-start p-4 rounded-xl bg-white hover:bg-[#F8F4E9] transition-all duration-300 border border-[#172C64]/20 hover:border-[#F05C03]/30"
      >
        <div className="w-32 h-24 shrink-0 overflow-hidden rounded-lg relative border border-[#172C64]/10">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="128px"
          />
          {article.isBreaking && (
            <div className="absolute top-2 left-2">
              <div className="w-2 h-2 bg-[#9A1C20] rounded-full animate-pulse" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          {showCategory && (
            <Badge 
              variant="secondary" 
              className="mb-2 text-[10px] px-2 py-0 h-5 bg-[#172C64] text-white"
            >
              {article.category}
            </Badge>
          )}
          
          <h3 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#F05C03] transition-colors mb-2 line-clamp-2">
            {article.title}
          </h3>
          
          {showExcerpt && (
            <p className="text-[#4A5568] text-xs mb-2 line-clamp-2">
              {article.excerpt}
            </p>
          )}
          
          {showMeta && (
            <div className="flex items-center gap-3 text-xs text-[#4A5568]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {getTimeAgo(article.date)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {article.views?.toLocaleString() || '1.2K'}
              </span>
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Small variant - Updated
  if (variant === 'small') {
    return (
      <Link 
        href={`/article/${article.id}`} 
        className="group flex gap-3 items-start py-3 border-b border-[#172C64]/10 last:border-b-0 hover:bg-[#F8F4E9] px-2 rounded-lg transition-colors"
      >
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#F05C03] transition-colors line-clamp-2">
            {article.title}
          </h4>
          
          {showMeta && (
            <div className="flex items-center gap-2 mt-1 text-xs text-[#4A5568]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {getTimeAgo(article.date)}
              </span>
              {showCategory && (
                <>
                  <span>•</span>
                  <span className="text-[#172C64] text-[10px] font-semibold">
                    {article.category}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
        
        {article.image && (
          <div className="w-16 h-12 shrink-0 overflow-hidden rounded relative border border-[#172C64]/10">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="64px"
            />
          </div>
        )}
      </Link>
    );
  }

  // Default variant - Updated
  return (
    <Link 
      href={`/article/${article.id}`} 
      className="group block relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-[#172C64]/20"
    >
      <div className="overflow-hidden relative aspect-4/3">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#172C64]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {article.isBreaking && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-gradient-to-r from-[#9A1C20] to-[#F05C03] text-white animate-pulse">
              BREAKING
            </Badge>
          </div>
        )}
        
        {showCategory && (
          <div className="absolute bottom-3 left-3 z-10">
            <Badge 
              variant="secondary" 
              className="bg-[#172C64] text-white border-[#172C64] hover:bg-[#172C64]/90"
            >
              {article.category}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#F05C03] transition-colors mb-3 line-clamp-2">
          {article.title}
        </h3>
        
        {showExcerpt && (
          <p className="text-[#4A5568] text-sm mb-4 line-clamp-3">
            {article.excerpt}
          </p>
        )}
        
        {showMeta && (
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-3 text-[#4A5568]">
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {article.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {getTimeAgo(article.date)}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#4A5568] flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {article.views?.toLocaleString() || '1.5K'}
              </span>
              <ArrowRight className="w-3 h-3 text-[#172C64] group-hover:text-[#F05C03] transition-colors" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard;