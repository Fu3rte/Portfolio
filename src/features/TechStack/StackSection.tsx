import { Lens } from '@/components/ui/lens';

import './style.css';

import jsUrl from '@/assets/javascript.svg';
import tsUrl from '@/assets/typescript.svg';
import htmlUrl from '@/assets/html5.svg';
import cssUrl from '@/assets/css3.svg';
import tailwindUrl from '@/assets/tailwindcss.svg';
import reactUrl from '@/assets/react.svg';
import zustandUrl from '@/assets/zustand.svg';
import routerUrl from '@/assets/react-router.svg';
import gsapUrl from '@/assets/gsap.svg';
import axiosUrl from '@/assets/axios.svg';
import antdUrl from '@/assets/ant-design.svg';
import githubUrl from '@/assets/github.svg';
import viteUrl from '@/assets/vite.svg';
import vscodeUrl from '@/assets/vscode.svg';
import chromeUrl from '@/assets/chrome.svg';
import geminiUrl from '@/assets/gemini.svg';

export const LANGUAGES = [
  { name: 'JavaScript', icon: jsUrl },
  { name: 'TypeScript', icon: tsUrl },
  { name: 'HTML5', icon: htmlUrl },
  { name: 'CSS3', icon: cssUrl },
  { name: 'Tailwind CSS', icon: tailwindUrl },
];

export const FRONTEND = [
  { name: 'React', icon: reactUrl },
  { name: 'Zustand', icon: zustandUrl },
  { name: 'React Router', icon: routerUrl },
  { name: 'GSAP', icon: gsapUrl },
  { name: 'Axios', icon: axiosUrl },
  { name: 'Ant Design', icon: antdUrl },
];

export const TOOLS = [
  { name: 'Github', icon: githubUrl },
  { name: 'Vite', icon: viteUrl },
  { name: 'VSCode', icon: vscodeUrl },
  { name: 'Chrome', icon: chromeUrl },
  { name: 'Gemini', icon: geminiUrl },
];

function GlassCard({
  name,
  icon,
}: {
  name: string;
  icon: React.ReactNode | null;
}) {
  return (
    <div className="glass-card glass-surface group relative flex-center gap-2 rounded-full border border-primary/12 p-2 px-4 md:w-40 lg:w-44">
      <div className="flex-center size-6 shrink-0 lg:size-8">
        <img
          src={`${icon}`}
          alt={name}
          className="saturate-90 group-hover:saturate-200"
        />
      </div>

      <span className="text-xs tracking-wide whitespace-nowrap text-primary/80 hover:text-primary md:text-sm">
        {name}
      </span>
    </div>
  );
}

export function StackSection({
  title,
  items,
}: {
  title: string;
  items: { name: string; icon: React.ReactNode | null }[];
}) {
  return (
    <div className="stack-section flex flex-col space-y-4 md:flex-row md:justify-between md:pt-6">
      <h1 className="stack-title flex-1 text-4xl font-bold text-primary md:text-4xl">
        {title}
      </h1>

      <Lens lensSize={40} zoomFactor={1} lensColor="rgba(255, 255, 255, 0.8)">
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {items.map((item) => (
            <GlassCard key={item.name} name={item.name} icon={item.icon} />
          ))}
        </div>
      </Lens>
    </div>
  );
}
