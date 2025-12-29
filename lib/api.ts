import axios from 'axios'

const api = axios.create({
    baseURL: "http://10.50.109.86:8000/api"
})

// Fetch top stories from API
export const getTopStories = async (limit: number = 5) => {
    try {
        const response = await api.get("/NewsFront/index");
        if (response.data.success && response.data.data?.top) {
            return response.data.data.top.slice(0, limit);
        }
        return [];
    } catch (error) {
        console.error('Error fetching top stories:', error);
        return [];
    }
}

// Fetch featured articles from API
export const getFeaturedArticles = async (limit: number = 4) => {
    try {
        const response = await api.get("/NewsFront/index");
        if (response.data.success && response.data.data?.featured) {
            return response.data.data.featured.slice(0, limit);
        }
        return [];
    } catch (error) {
        console.error('Error fetching featured articles:', error);
        return [];
    }
}

// Fetch latest articles from API
export const getLatestArticles = async (limit: number = 4) => {
    try {
        const response = await api.get("/NewsFront/index");
        if (response.data.success && response.data.data?.latest.data) {
            return response.data.data.latest.data.slice(0, limit);
        }
        return [];
    } catch (error) {
        console.error('Error fetching latest articles:', error);
        return [];
    }
}

// Fetch category articles from API (generic function for politics, world, etc.)
export const getCategoryArticles = async (category: string, limit: number = 5) => {
    try {
        const response = await api.get(`/NewsFront/category/${category}/news`);
        if (response.data.success && response.data.data) {
            const articles = Array.isArray(response.data.data) ? response.data.data : response.data.data.data || [];
            return articles.slice(0, limit);
        }
        return [];
    } catch (error) {
        console.error(`Error fetching ${category} articles:`, error);
        return [];
    }
}

// Convenience function for politics articles
export const getPoliticsArticles = async (limit: number = 5) => {
    return getCategoryArticles('politics', limit);
}

// Convenience function for world articles
export const getWorldArticles = async (limit: number = 4) => {
    return getCategoryArticles('world', limit);
}

// Convenience function for travel articles
export const getTravelArticles = async (limit: number = 3) => {
    return getCategoryArticles('travel', limit);
}

// Convenience function for business articles
export const getBusinessArticles = async (limit: number = 5) => {
    return getCategoryArticles('business', limit);
}

// Fetch categories from API
export const getCategories = async (includeSubcategories: boolean = false) => {
    try {
        const response = await api.get("/NewsFront/categories");
        if (response.data.success && response.data.data) {
            let categories = Array.isArray(response.data.data) ? response.data.data : [];
            // Filter out subcategories if not needed (subcategories have parent_id)
            if (!includeSubcategories) {
                categories = categories.filter((cat: any) => !cat.parent_id);
            }
            return categories;
        }
        return [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Fetch city articles from API
export const getCityArticles = async (cityName: string, limit: number = 100) => {
    try {
        const response = await api.get(`/NewsFront/city/${cityName}`);
        if (response.data.success && response.data.data) {
            const articles = Array.isArray(response.data.data) ? response.data.data : response.data.data.data || [];
            return articles.slice(0, limit);
        }
        return [];
    } catch (error) {
        console.error(`Error fetching ${cityName} articles:`, error);
        return [];
    }
}

// Fetch article by slug from API
export const getArticleBySlug = async (slug: string) => {
    try {
        const response = await api.get(`/NewsFront/news/${slug}`);
        console.log('API Response for slug:', slug, response.data);
        
        // Handle different response structures
        if (response.data.success) {
            // Check if data is directly in response.data.data
            if (response.data.data) {
                return response.data.data;
            }
            // Check if data is directly in response.data
            if (response.data.article) {
                return response.data.article;
            }
            // If success is true but no data field, return the whole response.data
            if (response.data.title || response.data.id) {
                return response.data;
            }
        }
        
        // If no success flag, check if data exists directly
        if (response.data.title || response.data.id) {
            return response.data;
        }
        
        console.warn('Article not found for slug:', slug);
        return null;
    } catch (error: any) {
        console.error('Error fetching article by slug:', slug, error);
        if (error.response) {
            console.error('Error response:', error.response.status, error.response.data);
        }
        return null;
    }
}

// Submit contact form
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await api.post('/NewsFront/contact', formData);
    if (response.data.success) {
      return {
        success: true,
        message: response.data.message || 'Thank you for contacting us! We will get back to you soon.',
        data: response.data.data
      };
    }
    return {
      success: false,
      message: response.data.message || 'Failed to submit contact form. Please try again.',
      errors: response.data.errors || {}
    };
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'An error occurred. Please try again later.',
      errors: error.response?.data?.errors || {}
    };
  }
}

export default api