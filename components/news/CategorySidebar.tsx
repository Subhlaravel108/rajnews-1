"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Hash, Flame, Zap, Newspaper } from 'lucide-react';
import { getCategories } from '@/lib/api';
import { Badge } from '@/components/ui/badge';

const CategorySidebar = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories(false); // false = exclude subcategories
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  // Updated Rajasthan/Indian themed category images
  // const categoryImages: Record<string, string> = {
  //   politics: 'https://images.unsplash.com/photo-1581985560556-83cddac94b23?w=300&h=200&fit=crop&q=80', // Indian parliament
  //   business: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop&q=80', // Jaipur markets
  //   technology: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop&q=80', // Indian tech
  //   health: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&h=200&fit=crop&q=80', // Indian hospital
  //   sports: 'https://images.unsplash.com/photo-1612872087727-0e4a2f34b6c7?w=300&h=200&fit=crop&q=80', // Cricket in Rajasthan
  //   entertainment: 'https://images.unsplash.com/photo-1548032885-b5e38734688a?w=300&h=200&fit=crop&q=80', // Bollywood/Rajasthani culture
  //   world: 'https://images.unsplash.com/photo-1587017539507-7c6c0e58a5b0?w=300&h=200&fit=crop&q=80', // Global with Indian context
  //   lifestyle: 'https://images.unsplash.com/photo-1556909114-ff6a48d6c48c?w=300&h=200&fit=crop&q=80', // Rajasthani lifestyle
  //   education: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop&q=80',
  //   environment: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop&q=80',
  //   crime: 'https://images.unsplash.com/photo-1563986768604-420e8d58a9dc?w=300&h=200&fit=crop&q=80',
  //   travel: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop&q=80',
  //   general: 'https://images.unsplash.com/photo-1591276323627-4c71d2e0e8a8?w=300&h=200&fit=crop&q=80', // Rajasthani landscape
  //   'rajasthan-news': 'https://images.unsplash.com/photo-1548013146-72479768bada?w=300&h=200&fit=crop&q=80', // Hawa Mahal
  //   'jaipur-news': 'https://images.unsplash.com/photo-1562976542-91fd6e3e5b68?w=300&h=200&fit=crop&q=80', // Amer Fort
  // };

  // Trending categories with Rajasthani focus
  const trendingCategories = ['rajasthan-news', 'jaipur-news', 'politics', 'sports'];
  const hotCategories = ['business', 'entertainment', 'crime', 'lifestyle'];
  
  // Get category icon
  const getCategoryIcon = (slug: string) => {
    if (trendingCategories.includes(slug)) return <TrendingUp className="w-3.5 h-3.5" />;
    if (hotCategories.includes(slug)) return <Flame className="w-3.5 h-3.5" />;
    return <Newspaper className="w-3.5 h-3.5" />;
  };

  // Get category color based on type
  const getCategoryColor = (slug: string) => {
    if (trendingCategories.includes(slug)) return 'from-[#F05C03] to-[#F0C24C]'; // Orange to Gold
    if (hotCategories.includes(slug)) return 'from-[#9A1C20] to-[#F05C03]'; // Maroon to Orange
    return 'from-[#172C64] to-[#2D4A8C]'; // Royal Indigo gradient
  };

  return (
    <div className="bg-gradient-to-b from-[#F8F4E9] to-[#F0E6D3] rounded-2xl p-6 shadow-xl border border-[#172C64]/20">
      {/* Header with Rajasthani design */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#172C64]/20">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-r from-[#172C64] to-[#2D4A8C] shadow-lg`}>
            <Zap className="w-6 h-6 text-white" fill="white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#172C64] font-serif tracking-tight">Categories</h3>
           
          </div>
        </div>
        {/* <Badge 
          className="bg-[#172C64] text-white border-[#172C64] hover:bg-[#172C64]/90 px-3 py-1"
        >
          {categories.length} Categories
        </Badge> */}
      </div>

      {/* Categories list with improved visual hierarchy */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#172C64]/10 animate-pulse">
                {/* <div className="w-20 h-20 bg-gray-200 rounded-xl"></div> */}
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : categories.length > 0 ? (
          categories.map((category, index) => {
          const isTrending = trendingCategories.includes(category.slug);
          const isHot = hotCategories.includes(category.slug);
          const gradientClass = getCategoryColor(category.slug);

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group flex items-center gap-4 p-4 rounded-xl bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-[#172C64]/10 hover:border-[#F05C03]/40"
            >
              
              
              {/* Category image with Rajasthani frame */}
             

              {/* Category info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1.5">
                  <h4 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#F05C03] transition-colors line-clamp-1">
                    {category.name}
                  </h4>
                  <ArrowRight className="w-4 h-4 text-[#4A5568] group-hover:text-[#F05C03] transition-colors group-hover:translate-x-1 flex-shrink-0" />
                </div>
              </div>
            </Link>
          );
        })
        ) : (
          <p className="text-gray-500 text-center py-4 text-sm">No categories available</p>
        )}
      </div>

      
      
    </div>
  );
};

export default CategorySidebar;