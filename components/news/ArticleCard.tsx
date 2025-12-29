import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock, Eye, ArrowRight, Play } from 'lucide-react';
import { Article } from '@/data/newsData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { generateSlug } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'horizontal' | 'small' | 'featured' | 'featured-secondary' | 'breaking' | 'video';
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
}: any) => {
  
  // Helper functions to safely extract string values from API response
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
      return date.toLocaleDateString('en-IN',  {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
    } catch {
      return dateString;
    }
  };

  // Video variant
  if (variant === 'video') {
    return (
      <Link 
        href={`/article/${article.slug || generateSlug(article.title)}`} 
        className="group block relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#172C64] to-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200"
      >
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-18 h-18 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-[#F05C03] to-[#F0C24C] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
            </div>
          </div>
          
          {/* Duration badge */}
          {article.duration && (
            <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm text-[#F0C24C] px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
              {article.duration}
            </div>
          )}
        </div>
        
        <div className="p-5 md:p-6 bg-white">
          {showCategory && (
            <div className="flex items-center gap-2 mb-3">
              <Badge 
                variant="outline" 
                className="bg-[#9A1C20]/10 text-[#9A1C20] border-[#9A1C20]/30 text-[10px] font-bold px-2.5 py-0.5"
              >
                VIDEO
              </Badge>
              <Badge 
                variant="secondary" 
                className="text-[10px] bg-[#172C64] text-white font-semibold px-2.5 py-0.5"
              >
                {getCategoryName(article.category)}
              </Badge>
            </div>
          )}
          
          <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-[#F05C03] transition-colors line-clamp-2 mb-3 leading-tight">
            {article.title}
          </h3>
          
          {showMeta && (
            <div className="flex items-center justify-between text-xs md:text-sm text-gray-600 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium">
                  <Eye className="w-3.5 h-3.5 text-gray-400" />
                  {article.views?.toLocaleString() || '2.5K'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {getTimeAgo(article.date || article.created_at)}
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Featured Secondary variant - Compact version for secondary cards
  if (variant === 'featured-secondary') {
    return (
      <Link 
        href={`/article/${article.slug || generateSlug(article.title)}`} 
        className="group block relative overflow-hidden rounded-xl md:rounded-xl lg:rounded-2xl shadow-lg md:shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-[#172C64]/20 md:border-[#172C64]/30 h-full"
      >
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/30" />
          
          {article.isBreaking && (
            <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
              <Badge className="bg-gradient-to-r from-[#9A1C20] to-[#F05C03] text-white animate-pulse px-2 py-0.5 md:px-2.5 md:py-1 text-[9px] md:text-[10px] font-bold shadow-lg">
                BREAKING
              </Badge>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 lg:p-4 xl:p-5 ">
          <div className="w-full">
            {showCategory && (
              <Badge 
                variant="secondary" 
                className="mb-1.5 md:mb-2 bg-[#F0C24C] text-[#172C64] border-none hover:bg-[#F0C24C]/90 font-bold px-2 py-0.5 md:px-2.5 md:py-0.5 text-[9px] md:text-[10px] shadow-md"
              >
                {getCategoryName(article.category)}
              </Badge>
            )}
            
            <h2 className="text-sm md:text-base lg:text-sm xl:text-base font-serif font-bold text-white group-hover:text-[#F0C24C] transition-colors mb-1.5 md:mb-2 line-clamp-2 leading-[1.25] md:leading-[1.3] drop-shadow-lg">
              {article.title}
            </h2>
            
            {showMeta && (
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2 text-white/90 text-[9px] md:text-[10px] mb-2 md:mb-2.5">
                <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full font-medium shadow-sm border border-white/10">
                  <User className="w-2.5 h-2.5 md:w-3 md:h-3 shrink-0" />
                  <span className="truncate max-w-[60px] md:max-w-[80px] lg:max-w-[70px] xl:max-w-none">{getAuthorName(article.author)}</span>
                </span>
                <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full font-medium shadow-sm border border-white/10">
                  <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3 shrink-0" />
                  <span className="whitespace-nowrap">{getTimeAgo(article.date || article.created_at)}</span>
                </span>
                {article.readTime && (
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full font-medium shadow-sm border border-white/10">
                    <Clock className="w-2.5 h-2.5 md:w-3 md:h-3 shrink-0" />
                    <span className="whitespace-nowrap">{article.readTime}</span>
                  </span>
                )}
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm"
              className="bg-[#F05C03] text-white border-[#F05C03] hover:bg-[#F05C03]/90 hover:text-white font-semibold px-3 py-1 md:px-3.5 md:py-1.5 text-[10px] md:text-xs shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full"
            >
              Read More
              <ArrowRight className="ml-1 md:ml-1.5 w-2.5 h-2.5 md:w-3 md:h-3 group-hover:translate-x-1 transition-transform shrink-0" />
            </Button>
          </div>
        </div>
      </Link>
    );
  }

  // Featured variant
  if (variant === 'featured') {
    return (
      <Link 
        href={`/article/${article.slug || generateSlug(article.title)}`} 
        className="group block relative overflow-hidden rounded-lg md:rounded-xl lg:rounded-2xl shadow-xl md:shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:-translate-y-1 border border-[#172C64]/20 md:border-2 md:border-[#172C64]/30 h-full"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30" />
          
          {/* Breaking news indicator */}
          {article.isBreaking && (
            <div className="absolute top-2 left-2 md:top-3 md:left-3 lg:top-4 lg:left-4 z-10">
              <Badge className="bg-gradient-to-r from-[#9A1C20] to-[#F05C03] text-white animate-pulse px-2 py-0.5 md:px-3 md:py-1 lg:px-4 lg:py-1.5 text-[9px] md:text-[10px] lg:text-xs font-bold shadow-lg md:shadow-2xl">
                BREAKING
              </Badge>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-3.5 lg:p-3 xl:p-5 2xl:p-6 ">
          <div className="w-full">
            {showCategory && (
              <Badge 
                variant="secondary" 
                className="mb-1 md:mb-1.5 lg:mb-1 xl:mb-2 bg-[#F0C24C] text-[#172C64] border-none hover:bg-[#F0C24C]/90 font-bold px-1.5 py-0.5 md:px-2 md:py-0.5 lg:px-1.5 lg:py-0.5 xl:px-3 xl:py-1 text-[9px] md:text-[9px] lg:text-[9px] xl:text-xs shadow-md"
              >
                {getCategoryName(article.category)}
              </Badge>
            )}
            
            <h2 className="text-sm md:text-sm lg:text-xs xl:text-base 2xl:text-lg font-serif font-bold text-white group-hover:text-[#F0C24C] transition-colors mb-1 md:mb-1.5 lg:mb-1 xl:mb-2 line-clamp-2 leading-[1.2] md:leading-[1.25] lg:leading-[1.2] xl:leading-tight drop-shadow-lg">
              {article.title}
            </h2>
            
            {showExcerpt && (
              <p className="text-white/95 text-xs md:text-sm lg:text-xs xl:text-sm mb-1.5 md:mb-2 lg:mb-1.5 xl:mb-2 line-clamp-2 leading-relaxed drop-shadow-md hidden 2xl:block">
                {article.excerpt}
              </p>
            )}
            
            {showMeta && (
              <div className="flex flex-wrap items-center gap-1 md:gap-1 lg:gap-0.5 xl:gap-1.5 text-white/90 text-[8px] md:text-[9px] lg:text-[8px] xl:text-[10px] mb-1 md:mb-1.5 lg:mb-1 xl:mb-2">
                <span className="flex items-center gap-0.5 bg-white/20 backdrop-blur-sm px-1 py-0.5 md:px-1.5 md:py-0.5 lg:px-1 lg:py-0.5 xl:px-2 xl:py-0.5 rounded-full font-medium shadow-sm border border-white/10">
                  <User className="w-2 h-2 md:w-2 md:h-2 lg:w-1.5 lg:h-1.5 xl:w-2.5 xl:h-2.5 shrink-0" />
                  <span className="truncate max-w-[40px] md:max-w-[55px] lg:max-w-[45px] xl:max-w-[75px] 2xl:max-w-none">{getAuthorName(article.author)}</span>
                </span>
                <span className="flex items-center gap-0.5 bg-white/20 backdrop-blur-sm px-1 py-0.5 md:px-1.5 md:py-0.5 lg:px-1 lg:py-0.5 xl:px-2 xl:py-0.5 rounded-full font-medium shadow-sm border border-white/10">
                  <Calendar className="w-2 h-2 md:w-2 md:h-2 lg:w-1.5 lg:h-1.5 xl:w-2.5 xl:h-2.5 shrink-0" />
                  <span className="whitespace-nowrap">{getTimeAgo(article.date || article.created_at)}</span>
                </span>
                {article.readTime && (
                  <span className="flex items-center gap-0.5 bg-white/20 backdrop-blur-sm px-1 py-0.5 md:px-1.5 md:py-0.5 lg:px-1 lg:py-0.5 xl:px-2 xl:py-0.5 rounded-full font-medium shadow-sm border border-white/10">
                    <Clock className="w-2 h-2 md:w-2 md:h-2 lg:w-1.5 lg:h-1.5 xl:w-2.5 xl:h-2.5 shrink-0" />
                    <span className="whitespace-nowrap">{article.readTime}</span>
                  </span>
                )}
              </div>
            )}
            
            {/* Read more button */}
            <Button 
              variant="outline" 
              size="sm"
              className="bg-[#F05C03] text-white border-[#F05C03] hover:bg-[#F05C03]/90 hover:text-white font-semibold px-2 py-0.5 md:px-2.5 md:py-0.5 lg:px-2 lg:py-0.5 xl:px-4 xl:py-1.5 text-[9px] md:text-[10px] lg:text-[9px] xl:text-xs shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <span className="hidden lg:inline">Read Full Story</span>
              <span className="lg:hidden">Read More</span>
              <ArrowRight className="ml-0.5 md:ml-1 lg:ml-0.5 xl:ml-1.5 w-2.5 h-2.5 md:w-2.5 md:h-2.5 lg:w-2 lg:h-2 xl:w-3.5 xl:h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
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
        href={`/article/${article.slug || generateSlug(article.title)}`} 
        className="group block relative overflow-hidden rounded-xl bg-gradient-to-r from-[#9A1C20]/15 to-[#F05C03]/10 border-l-4 border-[#9A1C20] p-5 hover:border-[#F05C03] transition-all duration-300 hover:shadow-lg bg-white hover:bg-gray-50"
      >
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0 pt-1">
            <div className="w-3 h-3 bg-[#9A1C20] rounded-full animate-pulse shadow-lg" />
            <div className="w-3 h-3 bg-[#9A1C20] rounded-full animate-pulse absolute inset-0 opacity-75" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <Badge 
                variant="outline" 
                className="bg-[#9A1C20] text-white border-[#9A1C20] text-[10px] px-3 py-1 font-bold"
              >
                LIVE
              </Badge>
              {showCategory && (
                <span className="text-xs text-[#172C64] font-semibold uppercase tracking-wide">
                  {getCategoryName(article.category)}
                </span>
              )}
            </div>
            
            <h3 className="text-base font-bold text-gray-900 group-hover:text-[#F05C03] transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
            
            {showMeta && (
              <div className="flex items-center gap-3 mt-3 text-xs text-gray-600">
                <span className="font-medium">{getTimeAgo(article.date || article.created_at)}</span>
                <span className="text-gray-300">•</span>
                <span className="font-medium">{getAuthorName(article.author)}</span>
              </div>
            )}
          </div>
          
          <ArrowRight className="w-5 h-5 text-[#172C64] group-hover:text-[#F05C03] group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1" />
        </div>
      </Link>
    );
  }

  // Horizontal variant - Updated
  if (variant === 'horizontal') {
    return (
      <Link 
        href={`/article/${article.slug || generateSlug(article.title)}`} 
        className="group flex gap-4 items-start p-4 rounded-xl bg-white hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-[#F05C03]/40 hover:shadow-md"
      >
        <div className="w-32 md:w-36 h-24 md:h-28 shrink-0 overflow-hidden rounded-lg relative border border-gray-200">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="144px"
          />
          {article.isBreaking && (
            <div className="absolute top-2 left-2">
              <div className="w-2.5 h-2.5 bg-[#9A1C20] rounded-full animate-pulse shadow-lg" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          {showCategory && (
            <Badge 
              variant="secondary" 
              className="mb-2 text-[10px] px-2.5 py-0.5 h-5 bg-[#172C64] text-white font-semibold"
            >
              {getCategoryName(article.category)}
            </Badge>
          )}
          
          <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-[#F05C03] transition-colors mb-2 line-clamp-2 leading-snug">
            {article.title}
          </h3>
          
          {showExcerpt && (
            <p className="text-gray-600 text-xs md:text-sm mb-2 line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          )}
          
          {showMeta && (
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-gray-400" />
                {getTimeAgo(article.date || article.created_at)}
              </span>
              {/* <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3 h-3 text-gray-400" />
                {article.views?.toLocaleString() || '1.2K'}
              </span> */}
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
        href={`/article/${article.slug || generateSlug(article.title)}`} 
        className="group flex gap-3 items-start py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 px-2 rounded-lg transition-colors duration-200"
      >
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#F05C03] transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h4>
          
          {showMeta && (
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
  <Clock className="w-3 h-3 text-gray-400" />
  {new Date(article.created_at).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
</span>
              {showCategory && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="text-[#172C64] text-[10px] font-semibold">
                    {getCategoryName(article.category)}
                  </span>
                </>
              )}
            </div>
          )}
        </div> 
        
        {article.image && (
          <div className="w-20 h-14 shrink-0 overflow-hidden rounded-md relative border border-gray-200">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="80px"
            />
          </div>
        )}
      </Link>
    );
  }

  // Default variant - Updated
  return (
    <Link 
      href={`/article/${article.slug || generateSlug(article.title)}`} 
      className="group block relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
    >
      <div className="overflow-hidden relative aspect-[4/3]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {article.isBreaking && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-gradient-to-r from-[#9A1C20] to-[#F05C03] text-white animate-pulse px-3 py-1 text-xs font-bold shadow-lg">
              BREAKING
            </Badge>
          </div>
        )}
        
        {showCategory && (
          <div className="absolute bottom-4 left-4 z-10">
            <Badge 
              variant="secondary" 
              className="bg-[#172C64] text-white border-none hover:bg-[#172C64]/90 px-3 py-1 text-xs font-semibold shadow-lg"
            >
              {getCategoryName(article.category)}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#F05C03] transition-colors mb-3 line-clamp-2 leading-tight">
          {article.title}
        </h3>
        
        {showExcerpt && (
          <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        )}
        
        {showMeta && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
            <div className=" text-gray-600 text-xs md:text-sm">
              <div className="flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-gray-400" />
                {getAuthorName(article.author)}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {getTimeAgo(article.date || article.created_at)}
              </div>
            </div>
            
            {/* <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                {article.views?.toLocaleString() || '1.5K'}
              </span>
              <ArrowRight className="w-4 h-4 text-[#172C64] group-hover:text-[#F05C03] group-hover:translate-x-1 transition-all duration-300" />
            </div> */}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard;