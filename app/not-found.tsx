"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home } from 'lucide-react';

const NotFound = () => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Camel Silhouette */}
        <div className="flex justify-center">
          <svg 
            className="w-32 h-24 text-orange-600/40" 
            viewBox="0 0 200 100" 
            fill="currentColor"
          >
            <path d="M30,50 Q40,30 60,40 Q80,50 100,45 Q120,40 140,50 Q160,60 170,50 Q180,40 190,60" 
                  strokeWidth="2" 
                  stroke="currentColor" 
                  fill="none" />
          </svg>
        </div>

        {/* Content */}
        <div>
          <h1 className="text-6xl font-bold text-white mb-2">404</h1>
          <p className="text-gray-400 mb-4">Page not found</p>
          
         
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <Link 
            href="/"
            className="block w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              Return Home
            </div>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full text-gray-400 hover:text-gray-300 py-2"
          >
            Go Back
          </button>
        </div>

        {/* Simple footer */}
        <div className="pt-6">
          <p className="text-gray-600 text-sm">Rajasthan News</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;