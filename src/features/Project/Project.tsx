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

import portfolioImg from '@/assets/Projects/portfolio.png';
import algoCheck from '@/assets/Projects/AlgoCheck.png';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'Algorithm Check-in Website',
    description:
      'A web application for daily algorithm practice check-ins, featuring progress tracking, leaderboards, and community features.',
    image: algoCheck,
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
    title: "Finnian's portfolio",
    description:
      'A minimalist digital sanctuary crafting high-performance interfaces with visual-first design philosophy',
    image: portfolioImg,
    tags: ['React', 'Tailwind CSS', 'Shadcn UI', 'Gsap'],
    href: 'https://github.com/you/music-player',
  },
];

function CurvedArrow({ className }: { className?: string }) {
  return (
    <svg
      width="50"
      height="70"
      viewBox="0 0 50 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        d="M2 4C18 4 42 10 42 48"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="path-draw"
      />
      <path
        d="M34 40L42 50L50 40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="path-draw-arrow"
      />
    </svg>
  );
}

export function Project() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card-item');

      cards.forEach((card) => {
        const initialRotation = gsap.utils.random(-3, 3);

        gsap.set(card, { rotate: initialRotation });

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            rotate: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotate: initialRotation,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

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
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      className="relative flex flex-col items-center space-y-4 px-6 py-10 lg:py-12"
      ref={containerRef}
    >
      <div className="inline-flex items-start">
        <h1 className="text-xl font-bold text-primary">My Projects</h1>

        <div className="mt-3.5 ml-2">
          <CurvedArrow className="text-primary/60 dark:text-primary/50" />
        </div>
      </div>

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
