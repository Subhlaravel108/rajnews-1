import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Article detail URL — uses API `slug` only (no title-based slug). */
export function articleHref(article: { slug?: string | null }): string {
  const s = typeof article.slug === "string" ? article.slug.trim() : "";
  if (!s) return "#";
  return `/article/${encodeURIComponent(s)}`;
}

/** Strip tags / entities for card previews (API often sends HTML in description). */
export function htmlToPlainText(html: string): string {
  if (!html) return "";
  let s = html;
  s = s.replace(/<\/(p|div|h[1-6]|li|tr)>/gi, "\n");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<[^>]+>/g, "");
  s = s.replace(/&nbsp;/gi, " ");
  s = s.replace(/&amp;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&quot;/g, '"');
  s = s.replace(/&#0*39;/g, "'");
  s = s.replace(/&#(\d+);/g, (_, n) => {
    const code = parseInt(n, 10);
    return Number.isFinite(code) ? String.fromCodePoint(code) : "";
  });
  s = s.replace(/&#x([0-9a-f]+);/gi, (_, h) => {
    const code = parseInt(h, 16);
    return Number.isFinite(code) ? String.fromCodePoint(code) : "";
  });
  s = s.replace(/\s*\n\s*/g, " ");
  s = s.replace(/[ \t]+/g, " ");
  return s.trim();
}