export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
  duration?: string;
  views?: number;
  isBreaking?: boolean;
  index?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  hasSubmenu?: boolean;
}
