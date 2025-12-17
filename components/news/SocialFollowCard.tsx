import { Facebook, Youtube, Twitter, Instagram, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SocialFollowCard = () => {
  return (
    <div className="bg-gradient-to-b from-[#F8F4E9] to-[#F0E6D3] rounded-2xl p-5 shadow-xl border border-[#172C64]/20">
      {/* Compact header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-[#172C64]" />
          <h3 className="text-lg font-bold text-[#172C64] font-serif">
            Follow Us
          </h3>
        </div>
      </div>

      {/* Super simple one-line icons */}
      <div className="flex gap-2">
        <a
          href="https://facebook.com/rajasthannews"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button
            className="w-full h-10 bg-[#172C64] hover:bg-[#2D4A8C] text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Facebook className="w-4 h-4" />
          </Button>
        </a>

        <a
          href="https://youtube.com/c/rajasthannews"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button
            className="w-full h-10 bg-[#9A1C20] hover:bg-[#F05C03] text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Youtube className="w-4 h-4" />
          </Button>
        </a>

        <a
          href="https://twitter.com/rajasthannews"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button
            className="w-full h-10 bg-[#F05C03] hover:bg-[#F0C24C] text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Twitter className="w-4 h-4" />
          </Button>
        </a>

        <a
          href="https://instagram.com/rajasthannews"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button
            className="w-full h-10 bg-gradient-to-r from-[#D62976] to-[#FA7E1E] hover:from-[#FA7E1E] hover:to-[#D62976] text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Instagram className="w-4 h-4" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default SocialFollowCard;