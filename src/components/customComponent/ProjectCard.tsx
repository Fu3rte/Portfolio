import * as React from 'react';
import { cn } from '@/lib/utils';

function ProjectCard({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="project-card"
      className={cn('group/card relative block', className)}
      {...props}
    >
      <div className="relative flex h-full transform flex-col overflow-hidden rounded-xl border border-primary/10 bg-card text-card-foreground ring-1 ring-foreground/5 dark:border-white/8">
        {props.children}
      </div>
    </div>
  );
}

function ProjectCardFront({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-front"
      className={cn(
        `flex h-full flex-col space-y-2 transition-opacity duration-300 ease-out group-hover/card:pointer-events-none group-hover/card:absolute group-hover/card:opacity-0`,
        className
      )}
      {...props}
    />
  );
}

function ProjectCardImage({
  className,
  src,
  alt = '',
}: {
  className?: string;
  src: string;
  alt?: string;
}) {
  return (
    <div
      data-slot="card-image"
      className={cn('relative w-full flex-2/3 overflow-hidden', className)}
    >
      <img src={src} alt={alt} className="h-full w-full" />
    </div>
  );
}

function ProjectCardBack({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-back"
      className={cn(
        `absolute inset-0 flex flex-col space-y-2 px-4 py-6 opacity-0 transition-opacity duration-300 ease-out group-hover/card:relative group-hover/card:opacity-100`,
        className
      )}
      {...props}
    />
  );
}

function ProjectCardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="card-title"
      className={cn('flex-1 text-xl text-primary', className)}
      {...props}
    />
  );
}

function ProjectCardDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        'flex-1 text-sm leading-relaxed text-primary md:text-xl',
        className
      )}
      {...props}
    />
  );
}

function ProjectCardTags({
  className,
  tags,
}: {
  className?: string;
  tags: string[];
}) {
  return (
    <div
      data-slot="card-tags"
      className={cn('flex flex-wrap gap-2', className)}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="relative rounded-full border border-primary/8 bg-linear-to-b from-primary/10 to-primary/2 px-3 py-1 text-xs tracking-wider text-primary/75 shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(0,0,0,0.02)] backdrop-blur-md dark:border-white/10 dark:border-t-white/20 dark:bg-linear-to-b dark:from-white/10 dark:to-transparent dark:text-white/70 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_2px_rgba(255,255,255,0.05)]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
function ProjectCardCTA({ className, ...props }: React.ComponentProps<'a'>) {
  return (
    <a
      data-slot="card-cta"
      className={cn(
        `inline-flex items-center gap-1.5 text-sm font-bold text-[#007bff] transition-colors`,
        className
      )}
      {...props}
    />
  );
}

export {
  ProjectCard,
  ProjectCardFront,
  ProjectCardBack,
  ProjectCardImage,
  ProjectCardTitle,
  ProjectCardDescription,
  ProjectCardTags,
  ProjectCardCTA,
};
