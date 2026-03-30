import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

import { ArrowUpRight } from 'lucide-react';
import {
  ProjectCard,
  ProjectCardFront,
  ProjectCardBack,
  ProjectCardImage,
  ProjectCardTitle,
  ProjectCardDescription,
  ProjectCardTags,
  ProjectCardCTA,
} from '@/components/customComponent/ProjectCard';

import imgUrl from '@/assets/sarff.jpg';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'Algorithm Check-in Website',
    description:
      'A web application for daily algorithm practice check-ins, featuring progress tracking, leaderboards, and community features.',
    image: 'imgUrl',
    tags: ['React', 'axios', 'React Router'],
    href: 'https://github.com/you/travel-app',
  },
  {
    title: 'Bid Document Intelligent Review System',
    description:
      'An AI-powered system for intelligent review and analysis of bid documents, automating compliance checking and risk assessment.',
    image: 'imgUrl',
    tags: ['React', 'Tanstack Query', 'Ant Design', 'TypeScript'],
    href: 'https://github.com/you/ecommerce',
  },
  {
    title: "Fu3rte's portfolio",
    description:
      'A minimalist digital sanctuary crafting high-performance interfaces with motion-first design philosophy',
    image: 'imgUrl',
    tags: ['React', 'Tailwind CSS', 'Shadcn UI', 'Gsap'],
    href: 'https://github.com/you/music-player',
  },
];

export function Project() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card-item');

      cards.forEach((card, i) => {
        gsap.set(card, { rotate: i % 2 === 0 ? 2 : -2 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });

        tl.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
          .from(card.querySelector('[data-slot="card-image"]'), {
            clipPath: 'inset(100% 0% 0% 0%)',
            duration: 0.8,
            ease: 'power4.inOut',
          })
          .from(
            card.querySelector('[data-slot="card-title"]'),
            {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: 'power3.out',
            },
            '-=0.5'
          )
          .from(
            card.querySelectorAll('[data-slot="card-tags"] > span'),
            {
              y: 10,
              opacity: 0,
              stagger: 0.06,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.3'
          );

        gsap.to(card, {
          y: i % 2 === 0 ? -30 : -50,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      className="flex flex-col items-center space-y-4 px-6 py-10 lg:py-12"
      ref={containerRef}
    >
      <h1 className="mb-8 text-xl font-bold text-primary lg:self-center">
        My Projects
      </h1>

      <div className="card-container grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.title}
            className="project-card-item h-80 w-full"
          >
            <ProjectCardFront>
              <ProjectCardImage src={project.image} alt={project.title} />

              <div className="flex shrink-0 flex-col gap-2 px-4 pb-6">
                <ProjectCardTitle>{project.title}</ProjectCardTitle>
                <ProjectCardTags tags={project.tags} />
              </div>
            </ProjectCardFront>

            <ProjectCardBack>
              <ProjectCardDescription>
                {project.description}
              </ProjectCardDescription>

              <ProjectCardCTA href={project.href} target="_blank">
                View on GitHub <ArrowUpRight size={16} />
              </ProjectCardCTA>
            </ProjectCardBack>
          </ProjectCard>
        ))}
      </div>
    </div>
  );
}
