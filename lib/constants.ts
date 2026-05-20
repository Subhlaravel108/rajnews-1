// Global Contact Information Constants

export const CONTACT_INFO = {
  // Email addresses
  email:  'info@rajasthaninews.com',
   
  
  // Phone numbers
  phone: "+91 25635 25658",
  
  
 
} as const;

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/people/Rajasthani-News/61574936255326/',
  youtube: 'https://www.youtube.com/@rajasthani-news-info',
} as const;

/** Public site URL — short links must use this host, not the Laravel API port. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';






