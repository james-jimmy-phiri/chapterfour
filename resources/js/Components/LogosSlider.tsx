import { InfiniteSlider } from '@/Components/ui/infinite-slider';
import { ProgressiveBlur } from '@/Components/ui/progressive-blur';
import { Figma, Framer, Github, Gitlab, Slack, Trello, Twitter, Youtube } from 'lucide-react';

const logos = [
  { id: "logo-1", name: "Figma", icon: Figma },
  { id: "logo-2", name: "Framer", icon: Framer },
  { id: "logo-3", name: "Github", icon: Github },
  { id: "logo-4", name: "Gitlab", icon: Gitlab },
  { id: "logo-5", name: "Slack", icon: Slack },
  { id: "logo-6", name: "Trello", icon: Trello },
  { id: "logo-7", name: "Twitter", icon: Twitter },
  { id: "logo-8", name: "Youtube", icon: Youtube },
];

export function LogosSlider() {
  return (
    <div className='relative h-[100px] w-full overflow-hidden'>
      <InfiniteSlider
        className='flex h-full w-full items-center'
        duration={60}
        gap={48}
      >
        {logos.map((logo) => (
          <div key={logo.id} className='flex w-32 items-center justify-center gap-2 text-slate-500 hover:text-slate-900 transition-colors'>
            <logo.icon className="h-8 w-8" />
            <span className="font-semibold text-lg">{logo.name}</span>
          </div>
        ))}
      </InfiniteSlider>
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 left-0 h-full w-[200px]'
        direction='left'
        blurIntensity={1}
      />
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 right-0 h-full w-[200px]'
        direction='right'
        blurIntensity={1}
      />
    </div>
  );
}
