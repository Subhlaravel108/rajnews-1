import axios from 'axios'
import { Article } from '@/data/newsData'
import { htmlToPlainText } from '@/lib/utils'

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://10.95.4.86:8000'

/** Build shareable short link on the Next.js site (not the Laravel API host). */
export function buildShortLinkUrl(marketingSlug: string): string {
    const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
    return `${base}/q/${encodeURIComponent(marketingSlug)}`
}
const API_MEDIA_ORIGIN = API_BASE_URL

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
})

/** Use with next/image unoptimized — optimizer server-fetch often gets 403 from LAN APIs. */
export function isApiMediaOrigin(src: string | undefined | null): boolean {
    if (!src) return false
    try {
        return new URL(src).origin === new URL(API_MEDIA_ORIGIN).origin
    } catch {
        return false
    }
}

export function normalizeMediaUrl(url: string): string {
    if (!url) return ''
    let out = url
        .replace(/^https?:\/\/localhost:8000/i, API_MEDIA_ORIGIN)
        .replace(/^https?:\/\/127\.0\.0\.1:8000/i, API_MEDIA_ORIGIN)
    out = out.replace(/\/storage\/storage\//g, '/storage/')
    return out
}

/** Normalize image URL on single-article API payloads (nested or flat). */
function normalizeDetailArticle(data: any): any {
    if (!data || typeof data !== 'object') return data
    const out = { ...data }
    if (typeof out.image === 'string' && out.image) {
        out.image = normalizeMediaUrl(out.image)
    } else {
        const urls = out.main_image?.image_urls
        const raw = urls?.medium_url || urls?.thumb_url || urls?.image_url
        if (typeof raw === 'string' && raw) {
            out.image = normalizeMediaUrl(raw)
        }
    }
    if (typeof out.description === 'string' && out.description) {
        out.excerpt = htmlToPlainText(out.description)
    }
    if (typeof out.title === 'string' && out.title) {
        out.title = htmlToPlainText(out.title)
    }
    return out
}

type NewsApiItem = {
    id: number
    slug: string
    title: string
    description?: string
    image?: string
    is_featured?: boolean
    is_top?: boolean
    created_at: string
    clicks?: number
    category_data?: { name: string; slug: string }
    author_user?: { name: string }
    main_image?: {
        image_urls?: {
            image_url?: string
            medium_url?: string
            thumb_url?: string
        }
    }
}

const getNewsImageUrl = (item: NewsApiItem): string => {
    if (typeof item.image === 'string' && item.image.trim()) {
        return normalizeMediaUrl(item.image)
    }
    const urls = item.main_image?.image_urls
    const raw = urls?.medium_url || urls?.thumb_url || urls?.image_url || ''
    return normalizeMediaUrl(raw)
}

/** Public path when API returns no image — also use with `next/image`. */
export const ARTICLE_FALLBACK_IMAGE = '/article-placeholder.svg'

/** Resolve image from list/detail API shapes (flat `image` or nested `main_image`). */
export function resolveArticleImageUrl(article: any): string {
    if (!article || typeof article !== 'object') return ''
    return getNewsImageUrl(article as NewsApiItem)
}

export const mapNewsItemToArticle = (item: NewsApiItem): Article & { created_at: string } => ({
    id: String(item.id),
    slug: item.slug,
    title: htmlToPlainText(item.title || ''),
    excerpt: htmlToPlainText(item.description || ''),
    content: item.description || '',
    category: item.category_data?.name || '',
    category_data: item.category_data,
    author: item.author_user?.name || '',
    date: item.created_at,
    created_at: item.created_at,
    image: getNewsImageUrl(item),
    readTime: '5 min',
    views: item.clicks,
})

/** Query params for `newsListing` / `GET /NewsFront/index` (Laravel validates these). */
export type NewsListingParams = {
    page?: number
    per_page?: number
    is_featured?: boolean
    is_top?: boolean
    category?: number
    child_category?: number
    search?: string
    type?: string
    sort_by?: 'id' | 'created_at' | 'clicks'
    sort_dir?: 'asc' | 'desc'
}

async function fetchNewsListing(params: NewsListingParams = {}): Promise<NewsApiItem[]> {
    const page = params.page ?? 1
    const per_page = Math.min(Math.max(params.per_page ?? 12, 1), 100)

    const query: Record<string, string | number> = { page, per_page }

    if (params.is_featured === true) query.is_featured = 1
    if (params.is_top === true) query.is_top = 1
    if (params.category != null) query.category = params.category
    if (params.child_category != null) query.child_category = params.child_category
    if (params.search) query.search = params.search
    if (params.type) query.type = params.type
    if (params.sort_by) query.sort_by = params.sort_by
    if (params.sort_dir) query.sort_dir = params.sort_dir

    const response = await api.get('/NewsFront/index', { params: query })
    if (response.data.status && Array.isArray(response.data.data)) {
        return response.data.data
    }
    return []
}

// Fetch top stories from API (server filters `is_top`)
export const getTopStories = async (limit: number = 5) => {
    try {
        const per_page = Math.min(Math.max(limit, 1), 100)
        const items = await fetchNewsListing({
            is_top: true,
            per_page,
            page: 1,
            sort_by: 'created_at',
            sort_dir: 'desc',
        })
        return items.map(mapNewsItemToArticle)
    } catch (error) {
        console.error('Error fetching top stories:', error);
        return [];
    }
}

// Fetch featured articles from API (server filters `is_featured`)
export const getFeaturedArticles = async (limit: number = 4) => {
    try {
        const per_page = Math.min(Math.max(limit, 1), 100)
        const items = await fetchNewsListing({
            is_featured: true,
            per_page,
            page: 1,
            sort_by: 'created_at',
            sort_dir: 'desc',
        })
        return items.map(mapNewsItemToArticle)
    } catch (error) {
        console.error('Error fetching featured articles:', error);
        return [];
    }
}

// Fetch latest articles from API (sort on server)
export const getLatestArticles = async (limit: number = 4) => {
    try {
        const per_page = Math.min(Math.max(limit, 1), 100)
        const items = await fetchNewsListing({
            per_page,
            page: 1,
            sort_by: 'created_at',
            sort_dir: 'desc',
        })
        return items.map(mapNewsItemToArticle)
    } catch (error) {
        console.error('Error fetching latest articles:', error);
        return [];
    }
}

// Fetch category articles — `category` query is numeric id on the API
export const getCategoryArticles = async (category: string, limit: number = 5) => {
    try {
        const slug = category.toLowerCase().trim()
        const categories = await getCategories(true)
        const cat = categories.find((c: any) => String(c.slug ?? '').toLowerCase() === slug)
        if (!cat?.id) {
            return []
        }
        const per_page = Math.min(Math.max(limit, 1), 100)
        const items = await fetchNewsListing({
            category: Number(cat.id),
            per_page,
            page: 1,
            sort_by: 'created_at',
            sort_dir: 'desc',
        })
        return items.map(mapNewsItemToArticle)
    } catch (error) {
        console.error(`Error fetching ${category} articles:`, error);
        return [];
    }
}

/** Same as slug-based fetch, but when the API only gives `category: <id>`. */
export const getCategoryArticlesById = async (categoryId: number, limit: number = 100) => {
    try {
        if (categoryId == null || Number.isNaN(Number(categoryId))) return []
        const per_page = Math.min(Math.max(limit, 1), 100)
        const items = await fetchNewsListing({
            category: Number(categoryId),
            per_page,
            page: 1,
            sort_by: 'created_at',
            sort_dir: 'desc',
        })
        return items.map(mapNewsItemToArticle)
    } catch (error) {
        console.error('Error fetching articles by category id:', categoryId, error)
        return []
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
        if ((response.data.status || response.data.success) && response.data.data) {
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
        const response = await api.get(`/NewsFront/city/${encodeURIComponent(cityName)}`);
        if ((response.data.status || response.data.success) && response.data.data) {
            const articles = Array.isArray(response.data.data) ? response.data.data : response.data.data.data || [];
            return articles.slice(0, limit).map((item: NewsApiItem) => mapNewsItemToArticle(item))
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
        const response = await api.get(`/NewsFront/news/${encodeURIComponent(slug)}`);
        // console.log('API Response for slug:', slug, response.data);

        const body = response.data
        const ok =
            body.success === true ||
            body.status === true ||
            body.success === 1 ||
            body.status === 1

        if (ok && body.data && typeof body.data === 'object') {
            return normalizeDetailArticle(body.data)
        }

        if (ok && body.article) {
            return normalizeDetailArticle(body.article)
        }

        if (body.title || body.id) {
            return normalizeDetailArticle(body)
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

/** Map Laravel `redirect_to` (e.g. `/news/my-slug`) to Next.js article route. */
export function mapShortUrlRedirect(redirectTo: string): string {
    const trimmed = redirectTo.trim()
    const newsMatch = trimmed.match(/^\/news\/(.+)$/i)
    if (newsMatch) {
        return `/article/${decodeURIComponent(newsMatch[1])}`
    }
    if (trimmed.startsWith('/')) {
        return trimmed
    }
    return `/article/${trimmed}`
}

/** Homepage fallback when short URL is invalid or API fails. */
export const SHORT_URL_FALLBACK_PATH = '/'

/** Resolve marketing short URL → article path (`GET {API_BASE_URL}/q/{slug}`). */
export const resolveShortUrl = async (slug: string): Promise<string | null> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/q/${encodeURIComponent(slug)}`, {
            headers: { Accept: 'application/json' },
        })
        const redirectTo = response.data?.redirect_to
        if (typeof redirectTo === 'string' && redirectTo.trim()) {
            return mapShortUrlRedirect(redirectTo)
        }
        return null
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null
        }
        console.error('Error resolving short URL:', slug, error)
        return null
    }
}

export type AdItem = {
    id: number
    title: string
    link: string
    position: string
    description: string
    click_url?: string
    clicks?: number
    status?: string
}

export const AD_POSITIONS = {
    HOMEPAGE_MAIN: 'homepage_main',
    HOMEPAGE_MAIN_BOTTOM: 'homepage_main_bottom',
    HOMEPAGE_SIDEBAR: 'homepage_sidebar',
    HOMEPAGE_SIDEBAR_2: 'homepage_sidebar_2',
} as const

/** Extract first image URL from ad HTML description. */
export function extractAdImageUrl(description: string): string {
    if (!description) return ''
    const match = description.match(/<img[^>]+src=["']([^"']+)["']/i)
    return match?.[1] ? normalizeMediaUrl(match[1]) : ''
}

/** Prefer tracked click_url; normalize API host for current env. */
export function getAdClickHref(ad: AdItem): string {
    const raw = (ad.click_url || ad.link || '').trim()
    if (!raw) return '#'
    return raw
        .replace(/^https?:\/\/localhost:8000/i, API_BASE_URL)
        .replace(/^https?:\/\/127\.0\.0\.1:8000/i, API_BASE_URL)
}

export const getAds = async (): Promise<AdItem[]> => {
    try {
        const response = await api.get('/NewsFront/ads')
        if (response.data.status && Array.isArray(response.data.data)) {
            return response.data.data.filter(
                (ad: AdItem) => ad.status === 'active' || ad.status === undefined
            )
        }
        return []
    } catch (error) {
        console.error('Error fetching ads:', error)
        return []
    }
}

export function getAdsByPosition(ads: AdItem[], position: string): AdItem | undefined {
    return ads.find((ad) => ad.position === position)
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
    if (response.data.status) {
      return {
        status: true,
        message: response.data.message || 'Thank you for contacting us! We will get back to you soon.',
        data: response.data.data
      };
    }
    return {
      status: false,
      message: response.data.message || 'Failed to submit contact form. Please try again.',
      errors: response.data.errors || {}
    };
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return {
      status: false,
      message: error.response?.data?.message || 'An error occurred. Please try again later.',
      errors: error.response?.data?.errors || {}
    };
  }
}

export default api