import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Send } from 'lucide-react';

const NewsletterCard = () => {
  return (
    <div className="bg-gradient-to-b from-[#F8F4E9] to-[#F0E6D3] rounded-xl p-5 shadow-lg border border-[#172C64]/20">
      {/* Simple header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-[#172C64]">Newsletter</h3>
        <p className="text-sm text-[#4A5568] mt-1">Get Rajasthan news daily</p>
      </div>

      {/* Compact form */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            type="email"
            placeholder="Your email"
            className="bg-white border border-[#172C64]/30 text-[#1A1A1A] pl-10 pr-4 py-3 rounded-lg"
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#4A5568]" />
        </div>
        
        <Button
          type="submit"
          className="bg-gradient-to-r from-[#F05C03] to-[#F0C24C] hover:from-[#F0C24C] hover:to-[#F05C03] text-white rounded-lg px-4"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

     
    </div>
  );
};

export default NewsletterCard;