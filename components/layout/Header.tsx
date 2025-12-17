"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Facebook, Twitter, Instagram, Youtube, Search, User, ChevronDown, Bell, Newspaper, Globe, Phone } from 'lucide-react';
import { categories } from '@/data/newsData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update date and time on client side only
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString('en-IN', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }));
      setCurrentTime(now.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      }));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Rajasthani breaking news items
  const breakingNews = [
    "राजस्थान विधानसभा का विशेष सत्र आज से",
    "जयपुर में मेट्रो का विस्तार",
    "राजस्थान बजट 2024 का विश्लेषण"
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Breaking News Bar */}
      <div className="bg-gradient-to-r from-[#9A1C20] via-[#F05C03] to-[#9A1C20] text-white overflow-hidden">
        <div className="container mx-auto px-5">
          <div className="flex items-center py-2 text-sm">
            <div className="flex items-center gap-2 bg-[#172C64] px-3 py-1 rounded-r-full">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="font-bold tracking-wide">LIVE</span>
              </div>
              <Bell className="w-3.5 h-3.5" />
            </div>
            
            <div className="flex-1 mx-4 overflow-hidden">
              <div className="whitespace-nowrap animate-marquee">
                {breakingNews.map((news, index) => (
                  <span key={index} className="mx-8">
                    {news}
                    {index < breakingNews.length - 1 && <span className="mx-8">•</span>}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-3">
                <a href="#" className="hover:text-[#F0C24C] transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#F0C24C] transition-colors" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#F0C24C] transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#F0C24C] transition-colors" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header with Logo */}
      <div className={`bg-white transition-all duration-300 ${isScrolled ? 'py-2 shadow-xl' : 'py-4'} border-b border-[#172C64]/10`}>
        <div className="container mx-auto px-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <div className="flex flex-col items-start">
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#172C64] via-[#9A1C20] to-[#F05C03] bg-clip-text text-transparent font-serif">
                    Rajasthan
                  </span>
                  <div className="flex items-center gap-2 -mt-2">
                    <span className="text-xl sm:text-2xl font-black text-[#1A1A1A] tracking-wider">
                      समाचार
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-gradient-to-r from-[#F05C03] to-[#F0C24C] text-white rounded-full">
                      LIVE
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-[#F05C03] transition-all duration-300"></div>
              </div>
            </Link>

            {/* Date & Time - Rajasthani Style */}
            <div className="hidden lg:flex flex-col items-center">
              <div className="text-sm font-medium text-[#172C64]">
                {currentDate || 'Loading...'}
              </div>
              <div className="text-xs text-[#4A5568] font-medium flex items-center gap-2 mt-1">
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  {currentTime || ''}
                </span>
                <span>•</span>
                <span className="text-[#F05C03]">जयपुर, राजस्थान</span>
              </div>
            </div>

            {/* Right Section - Search & Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="p-2 hover:bg-[#F8F4E9] rounded-full transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-[#172C64]" />
                </button>
                
                {showSearch && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-2xl rounded-xl border border-[#172C64]/20 p-4 animate-in slide-in-from-top-5">
                    <form onSubmit={handleSearch} className="space-y-3">
                      <div className="relative">
                        <Input
                          type="search"
                          placeholder="समाचार खोजें..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pr-10 border-[#172C64]/30 focus:border-[#F05C03]"
                          autoFocus
                        />
                        <Search className="absolute right-3 top-2.5 h-5 w-5 text-[#4A5568]" />
                      </div>
                      <div className="text-xs text-[#4A5568]">
                        Try: "विधानसभा", "पर्यटन", "मौसम"
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* E-Paper Button */}
              <Button
                size="sm"
                className="hidden md:flex h-10 bg-gradient-to-r from-[#172C64] to-[#2D4A8C] hover:from-[#2D4A8C] hover:to-[#172C64] text-white text-sm font-semibold gap-2"
              >
                <Newspaper className="w-4 h-4" />
                E-Paper
              </Button>

              {/* User Login */}
              <Button 
                variant="outline" 
                size="sm" 
                className="h-10 border-[#172C64]/30 text-[#172C64] hover:bg-[#172C64] hover:text-white text-sm gap-2"
                asChild
              >
                <Link href="/login">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              </Button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-[#F8F4E9] rounded-md transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-[#172C64]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#172C64]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`bg-gradient-to-r from-[#172C64] via-[#2D4A8C] to-[#172C64] text-white shadow-lg transition-all duration-300 ${isScrolled ? 'sticky top-0' : ''}`}>
        <div className="container mx-auto px-5">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/"
                className={`nav-link px-4 py-3 font-medium ${pathname === '/' ? 'bg-[#F05C03] text-white' : 'hover:bg-[#F05C03]/20'}`}
              >
                Home
              </Link>
              
              {/* Main Categories */}
              {categories.slice(0, 8).map((category) => (
                <div key={category.id} className="relative group">
                  <Link
                    href={`/category/${category.slug}`}
                    className={`nav-link px-4 py-3 font-medium flex items-center gap-1 ${
                      pathname === `/category/${category.slug}` ? 'bg-[#F05C03] text-white' : 'hover:bg-[#F05C03]/20'
                    }`}
                  >
                    {category.name}
                    {category.hasSubmenu && (
                      <ChevronDown className="w-3 h-3 opacity-70" />
                    )}
                  </Link>
                  
                  {/* Dropdown */}
                  {category.hasSubmenu && (
                    <div className="absolute left-0 top-full hidden group-hover:block bg-white text-gray-800 shadow-2xl rounded-b-xl min-w-52 border border-[#172C64]/20">
                      <div className="p-3">
                        <div className="mb-2 pb-2 border-b border-[#172C64]/10">
                          <span className="text-xs font-semibold text-[#172C64] uppercase">More in {category.name}</span>
                        </div>
                        <Link 
                          href={`/category/${category.slug}/latest`} 
                          className="block px-4 py-2.5 hover:bg-[#F8F4E9] rounded-lg text-sm text-[#1A1A1A] hover:text-[#F05C03] transition-colors"
                        >
                          Latest Updates
                        </Link>
                        <Link 
                          href={`/category/${category.slug}/videos`} 
                          className="block px-4 py-2.5 hover:bg-[#F8F4E9] rounded-lg text-sm text-[#1A1A1A] hover:text-[#F05C03] transition-colors"
                        >
                          Videos
                        </Link>
                        <Link 
                          href={`/category/${category.slug}/photos`} 
                          className="block px-4 py-2.5 hover:bg-[#F8F4E9] rounded-lg text-sm text-[#1A1A1A] hover:text-[#F05C03] transition-colors"
                        >
                          Photo Gallery
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Special Sections */}
              
              
              <Link
                href="/contact"
                className="nav-link px-4 py-3 font-medium flex items-center gap-2 hover:bg-[#F05C03]/20"
              >
                <Phone className="w-4 h-4" />
                Contact
              </Link>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                className="h-9 bg-gradient-to-r from-[#F05C03] to-[#F0C24C] hover:from-[#F0C24C] hover:to-[#F05C03] text-white text-sm font-semibold"
              >
                Subscribe Now
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white text-gray-800 shadow-2xl rounded-b-xl border-t border-[#172C64]/20">
              {/* Search in Mobile */}
              <div className="p-4 border-b border-[#172C64]/10">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder="समाचार खोजें..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 border-[#172C64]/30"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-2.5"
                  >
                    <Search className="h-5 w-5 text-[#4A5568]" />
                  </button>
                </form>
              </div>
              
              {/* Categories */}
              <div className="max-h-[60vh] overflow-y-auto">
                <div className="p-2">
                  <Link
                    href="/"
                    className="mobile-nav-link flex items-center px-4 py-3 hover:bg-[#F8F4E9] rounded-lg text-[#1A1A1A] hover:text-[#F05C03] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="mobile-nav-link flex items-center px-4 py-3 hover:bg-[#F8F4E9] rounded-lg text-[#1A1A1A] hover:text-[#F05C03] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                  
                  <div className="border-t border-[#172C64]/10 mt-4 pt-4">
                    <Link
                      href="/live-tv"
                      className="mobile-nav-link flex items-center px-4 py-3 hover:bg-[#F8F4E9] rounded-lg text-[#F05C03] font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                      Live TV
                    </Link>
                    <Link
                      href="/e-paper"
                      className="mobile-nav-link flex items-center px-4 py-3 hover:bg-[#F8F4E9] rounded-lg text-[#1A1A1A] hover:text-[#F05C03] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      E-Paper
                    </Link>
                    <Link
                      href="/subscribe"
                      className="mobile-nav-link flex items-center px-4 py-3 hover:bg-[#F8F4E9] rounded-lg text-[#1A1A1A] hover:text-[#F05C03] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Subscribe
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Mobile Social Links */}
              <div className="p-4 bg-[#F8F4E9] border-t border-[#172C64]/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#172C64]">Follow us:</span>
                  <div className="flex items-center gap-3">
                    <Facebook className="w-5 h-5 text-[#172C64] hover:text-[#F05C03] cursor-pointer" />
                    <Twitter className="w-5 h-5 text-[#172C64] hover:text-[#F05C03] cursor-pointer" />
                    <Instagram className="w-5 h-5 text-[#172C64] hover:text-[#F05C03] cursor-pointer" />
                    <Youtube className="w-5 h-5 text-[#172C64] hover:text-[#F05C03] cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Add CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .nav-link {
          transition: all 0.2s ease;
          position: relative;
        }
        .nav-link:hover::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 20%;
          width: 60%;
          height: 2px;
          background: #F0C24C;
        }
      `}</style>
    </header>
  );
};

export default Header;