'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import {
  AD_POSITIONS,
  AdItem,
  extractAdImageUrl,
  getAdClickHref,
  getAdsByPosition,
} from '@/lib/api';
import { cn } from '@/lib/utils';

type AdSlotProps = {
  position: string;
  ads: AdItem[];
  className?: string;
};

type PositionLayout = {
  variant: 'leaderboard' | 'billboard' | 'sidebar';
  imageClass: string;
  frameClass: string;
  sizes: string;
};

const POSITION_LAYOUTS: Record<string, PositionLayout> = {
  [AD_POSITIONS.HOMEPAGE_MAIN]: {
    variant: 'leaderboard',
    frameClass: 'w-full',
    imageClass: 'object-cover object-center',
    sizes: '100vw',
  },
  [AD_POSITIONS.HOMEPAGE_MAIN_BOTTOM]: {
    variant: 'billboard',
    frameClass: 'w-full',
    imageClass: 'object-cover object-center',
    sizes: '100vw',
  },
  [AD_POSITIONS.HOMEPAGE_SIDEBAR]: {
    variant: 'sidebar',
    frameClass: 'w-full',
    imageClass: 'object-contain object-center',
    sizes: '(max-width: 1024px) 100vw, 360px',
  },
  [AD_POSITIONS.HOMEPAGE_SIDEBAR_2]: {
    variant: 'sidebar',
    frameClass: 'w-full',
    imageClass: 'object-contain object-center',
    sizes: '(max-width: 1024px) 100vw, 360px',
  },
};

const VARIANT_STYLES: Record<PositionLayout['variant'], { shell: string; media: string }> = {
  leaderboard: {
    shell:
      'rounded-2xl shadow-lg border border-[#172C64]/15 bg-gradient-to-r from-[#F8F4E9] via-white to-[#F8F4E9]',
    media: 'relative w-full aspect-[5/1] min-h-[72px] sm:min-h-[90px] md:min-h-[110px] max-h-[160px]',
  },
  billboard: {
    shell:
      'rounded-2xl shadow-lg border border-[#172C64]/15 bg-white',
    media: 'relative w-full aspect-[21/5] min-h-[100px] sm:min-h-[120px] max-h-[200px]',
  },
  sidebar: {
    shell:
      'rounded-xl shadow-md border border-[#172C64]/10 bg-card',
    media: 'relative w-full aspect-[4/3] min-h-[180px] max-h-[280px] bg-[#F8F4E9]',
  },
};

const DEFAULT_LAYOUT: PositionLayout = {
  variant: 'sidebar',
  frameClass: 'w-full',
  imageClass: 'object-contain object-center',
  sizes: '100vw',
};

const AdSlot = ({ position, ads, className }: AdSlotProps) => {
  const ad = getAdsByPosition(ads, position);
  if (!ad) return null;

  const imageUrl = extractAdImageUrl(ad.description);
  const href = getAdClickHref(ad);

  if (!imageUrl && !ad.description?.trim()) return null;

  const layout = POSITION_LAYOUTS[position] ?? DEFAULT_LAYOUT;
  const styles = VARIANT_STYLES[layout.variant];
  const showTitle = layout.variant === 'sidebar' && ad.title;

  return (
    <aside
      className={cn(layout.frameClass, className)}
      data-ad-position={position}
      aria-label={`Advertisement: ${ad.title || position}`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={cn(
          'group block overflow-hidden transition-all duration-300',
          styles.shell,
          'hover:shadow-xl hover:border-[#F0C24C]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C24C] focus-visible:ring-offset-2'
        )}
      >
        <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-[#172C64]/10 bg-[#172C64]/5">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#172C64]/70">
            Sponsored
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-[#F05C03] opacity-0 group-hover:opacity-100 transition-opacity">
            Visit
            <ExternalLink className="w-3 h-3" aria-hidden />
          </span>
        </div>

        {showTitle && (
          <p className="px-3 pt-2 text-sm font-semibold text-[#172C64] line-clamp-1">{ad.title}</p>
        )}

        {imageUrl ? (
          <div className={cn(styles.media, showTitle ? 'mt-1' : '')}>
            <Image
              src={imageUrl}
              alt={ad.title || 'Advertisement'}
              fill
              className={cn(layout.imageClass, 'transition-transform duration-500 group-hover:scale-[1.02]')}
              sizes={layout.sizes}
              unoptimized
              priority={layout.variant === 'leaderboard'}
            />
          </div>
        ) : (
          <div
            className="p-3 [&_figure]:m-0 [&_img]:w-full [&_img]:h-auto [&_img]:rounded-lg"
            dangerouslySetInnerHTML={{ __html: ad.description }}
          />
        )}
      </a>
    </aside>
  );
};

export default AdSlot;
