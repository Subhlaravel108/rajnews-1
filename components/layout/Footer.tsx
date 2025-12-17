"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, Send } from 'lucide-react';
import { categories } from '@/data/newsData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const cities = [
  'Jaipur', 'Udaipur', 'Jodhpur', 'Ajmer', 'Bikaner', 'Jaisalmer',
  'Kota', 'Alwar', 'Bharatpur', 'Sikar', 'Pali', 'Barmer'
];

const Footer = () => {
  const [lastUpdated, setLastUpdated] = useState<string>('');
  
  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-IN', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }));
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
  };

  return (
    <footer className="bg-gradient-to-b from-[#172C64] to-[#0A1A40] text-white">
      {/* Newsletter Section - Minimal */}
      <div className="bg-gradient-to-r from-[#9A1C20] via-[#F05C03] to-[#9A1C20] py-6 px-5">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white mb-1">
                Daily News Updates
              </h3>
              <p className="text-white/80 text-sm">
                Get Rajasthan's trusted news in your inbox
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-2 max-w-md md:max-w-none">
                <div className="relative flex-1 min-w-[200px]">
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-white text-[#1A1A1A] pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-1 focus:ring-[#F0C24C] text-sm"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#4A5568]" />
                </div>
                <Button 
                  type="submit"
                  className="bg-[#172C64] hover:bg-[#2D4A8C] text-white font-medium py-3 px-4 rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer - Minimal */}
      <div className="py-8 px-5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & About */}
            <div>
              <Link href="/" className="inline-block mb-4">
                <div className="flex items-end gap-2">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">
                      Rajasthan
                    </span>
                    <span className="text-lg font-bold text-[#F0C24C]">
                      News
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#F05C03] text-white rounded">
                    LIVE
                  </span>
                </div>
              </Link>
              
              <p className="text-white/70 text-sm mb-4">
                Rajasthan's trusted news source since 1995
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <MapPin className="w-4 h-4 text-[#F0C24C]" />
                  <span>Jaipur, Rajasthan</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Phone className="w-4 h-4 text-[#F0C24C]" />
                  <span>+91 141 123 4567</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Mail className="w-4 h-4 text-[#F0C24C]" />
                  <span>contact@rajasthannews.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-base">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {categories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-white/70 hover:text-[#F0C24C] transition-colors text-sm"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/about" className="text-white/70 hover:text-[#F0C24C] transition-colors text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/70 hover:text-[#F0C24C] transition-colors text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Popular Categories */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-base">
                Popular News
              </h4>
              <ul className="space-y-2">
                <li><Link href="/category/politics" className="text-white/70 hover:text-[#F0C24C] transition-colors text-sm">Politics</Link></li>
                <li><Link href="/category/business" className="text-white/70 hover:text-[#F0C24C] transition-colors text-sm">Business</Link></li>
                <li><Link href="/category/tourism" className="text-white/70 hover:text-[#F0C24C] transition-colors text-sm">Tourism</Link></li>
                <li><Link href="/category/sports" className="text-white/70 hover:text-[#F0C24C] transition-colors text-sm">Sports</Link></li>
                <li><Link href="/live-tv" className="text-white/70 hover:text-[#F0C24C] transition-colors text-sm">Live TV</Link></li>
                <li><Link href="/e-paper" className="text-white/70 hover:text-[#F0C24C] transition-colors text-sm">E-Paper</Link></li>
              </ul>
            </div>

            {/* Social & Cities */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-base">
                Follow Us
              </h4>
              
              {/* Social Media */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Cities */}
              <div>
                <h5 className="font-medium text-white mb-2 text-sm">
                  Cities
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {cities.map((city, index) => (
                    <Link
                      key={index}
                      href={`/city/${city.toLowerCase()}`}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs rounded transition-colors"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-6"></div>

          {/* Cities Grid - Minimal */}
          <div className="mb-6">
            <h4 className="font-semibold text-white mb-3 text-center">
              Rajasthan Districts Coverage
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {cities.map((city, index) => (
                <Link
                  key={index}
                  href={`/city/${city.toLowerCase()}`}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-sm rounded-lg text-center transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar - Minimal */}
      <div className="bg-[#0A1A40] border-t border-white/10 py-4 px-5">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-white/60 text-xs" suppressHydrationWarning>
                © {new Date().getFullYear()} Rajasthan News. All rights reserved.
              </p>
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              <Link href="/privacy" className="text-white/60 hover:text-[#F0C24C] transition-colors">
                Privacy
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/terms" className="text-white/60 hover:text-[#F0C24C] transition-colors">
                Terms
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/disclaimer" className="text-white/60 hover:text-[#F0C24C] transition-colors">
                Disclaimer
              </Link>
              <span className="text-white/30 hidden sm:inline">•</span>
              <Link href="/sitemap" className="text-white/60 hover:text-[#F0C24C] transition-colors hidden sm:inline">
                Sitemap
              </Link>
            </div>
            
            {/* Update Status */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white/50 text-xs">
                Updated: {lastUpdated || 'Today'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;