import { useEffect, useState } from 'react';
import './style.css';
import { cn } from '@/lib/utils';
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export function Navbar() {
  const [isActiveSection, setIsActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJumpToSection = (targetSection: string) => {
    window.location.hash = targetSection;
    setIsActiveSection(targetSection);
  };

  const handleJumpToTop = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={cn(
        'fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-muted-foreground/20 px-6 py-4 text-primary transition-colors duration-300',
        isScrolled
          ? 'bg-white/30 backdrop-blur-sm dark:bg-black/30'
          : 'backdrop-blur-sm'
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            className="logo text-2xl transition-opacity duration-300 hover:opacity-70"
            onClick={() => handleJumpToTop('home')}
          >
            F1nn
          </a>
        </TooltipTrigger>

        <TooltipContent className="ml-1">
          <p>Back to top of the Home Page</p>
        </TooltipContent>
      </Tooltip>

      <div className="nav-links flex-center gap-4 md:gap-10">
        <a
          className={cn(
            'links-item',
            isActiveSection === 'home' ? 'active' : ''
          )}
          onClick={() => handleJumpToSection('home')}
        >
          Home
        </a>

        <a
          className={cn(
            'links-item',
            isActiveSection === 'photos' ? 'active' : ''
          )}
          onClick={() => handleJumpToSection('photos')}
        >
          Photos
        </a>

        <a
          className={cn(
            'links-item',
            isActiveSection === 'blogs' ? 'active' : ''
          )}
          onClick={() => handleJumpToSection('blog')}
        >
          Blogs
        </a>

        <AnimatedThemeToggler />
      </div>
    </div>
  );
}
