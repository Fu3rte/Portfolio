import { useRef } from 'react';
import { Dock, DockIcon } from '@/components/ui/dock';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import mailSvg from '@/assets/Social-icon/mail.svg';
import githubSvg from '@/assets/Social-icon/github.svg';
import instagramSvg from '@/assets/Social-icon/instagram.svg';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const socialLinks = [
  {
    label: 'Email',
    href: 'mailto:2575716528cqh@gmail.com',
    img: mailSvg,
  },
  {
    label: 'Github',
    href: 'https://github.com/Fu3rte',
    img: githubSvg,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/cq777h/',
    img: instagramSvg,
  },
];

function SocialDock() {
  return (
    <Dock
      iconSize={44}
      iconMagnification={58}
      iconDistance={150}
      className="border-black/10 dark:border-white/10"
    >
      {socialLinks.map((link) => (
        <DockIcon
          key={link.label}
          className="group magnetic-icon"
          onClick={() => link.href !== '#' && window.open(link.href, '_blank')}
        >
          <img
            src={link.img}
            alt={link.label}
            className={cn(
              'h-5 w-5 object-contain',
              'transition-all duration-500',
              'grayscale dark:grayscale-0 dark:invert',
              'group-hover:scale-110'
            )}
          />
        </DockIcon>
      ))}
    </Dock>
  );
}

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !contentRef.current) return;

      // Scroll-triggered entrance animation
      const items = contentRef.current.querySelectorAll('.animate-item');
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Magnetic effect for dock icons
      const magneticIcons =
        containerRef.current.querySelectorAll('.magnetic-icon');
      magneticIcons.forEach((icon) => {
        const el = icon as HTMLElement;
        el.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(el, {
            x: x * 0.25,
            y: y * 0.25,
            duration: 0.4,
            ease: 'power2.out',
          });
        });

        el.addEventListener('mouseleave', () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
          });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <footer ref={containerRef} className="relative w-full">
      <div
        ref={contentRef}
        className="relative mx-auto max-w-4xl px-6 pb-4 md:px-0"
      >
        {/* Social links with Dock - centered */}
        <div className="animate-item flex flex-col items-center">
          <SocialDock />
        </div>

        {/* Bottom row */}
        <div className="animate-item mt-16 flex w-full flex-col items-center justify-between gap-6 border-b md:flex-row">
          {/* Left: Navigation links */}
          <nav className="flex items-center gap-8">
            <a
              href=""
              className="text-xs font-bold tracking-[0.2em] text-primary uppercase transition-opacity hover:opacity-50"
            >
              Home
            </a>

            <a
              href="photos"
              className="text-xs font-bold tracking-[0.2em] text-primary uppercase transition-opacity hover:opacity-50"
            >
              Photos
            </a>

            <a
              href="contact"
              className="text-xs font-bold tracking-[0.2em] text-primary uppercase transition-opacity hover:opacity-50"
            >
              Contact
            </a>
          </nav>

          {/* Right: Copyright */}
          <p className="text-xs text-primary/60">
            © 2026 Finnian. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
