import { InfiniteSlider } from '@/Components/ui/infinite-slider';
import { ProgressiveBlur } from '@/Components/ui/progressive-blur';

export interface PartnerLogoItem {
  name: string;
  logo?: string;
  website?: string;
  url?: string;
}

const getExternalUrl = (url?: string) => {
  if (!url || typeof url !== 'string' || !url.trim()) return undefined;
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export function LogosSlider({ partners = [] }: { partners?: PartnerLogoItem[] }) {
  if (!partners || partners.length === 0) return null;

  return (
    <div className='relative h-[130px] w-full overflow-hidden'>
      <InfiniteSlider
        className='flex h-full w-full items-center'
        duration={40}
        gap={40}
      >
        {partners.map((partner, index) => {
          const targetUrl = getExternalUrl(partner.website || partner.url);

          const content = (
            <>
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-24 max-w-full object-contain filter-none grayscale-0 group-hover:grayscale transition-all duration-300"
                />
              ) : (
                <span className="font-bold text-slate-700 group-hover:text-slate-400 text-lg md:text-xl transition-colors duration-300 text-center px-2">
                  {partner.name}
                </span>
              )}
            </>
          );

          return targetUrl ? (
            <a
              key={index}
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visit ${partner.name} (${targetUrl})`}
              className="group flex w-48 h-28 items-center justify-center shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              {content}
            </a>
          ) : (
            <div
              key={index}
              title={partner.name}
              className="group flex w-48 h-28 items-center justify-center shrink-0 transition-transform duration-300"
            >
              {content}
            </div>
          );
        })}
      </InfiniteSlider>
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 left-0 h-full w-[100px] md:w-[200px]'
        direction='left'
        blurIntensity={1}
      />
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 right-0 h-full w-[100px] md:w-[200px]'
        direction='right'
        blurIntensity={1}
      />
    </div>
  );
}
