import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './style.css';

const HamburgerButton = ({
  isHovered,
  isOpen,
  onClick,
  onHover,
  onHoverEnd,
}: {
  isHovered: boolean;
  isOpen: boolean;
  onClick: () => void;
  onHover: () => void;
  onHoverEnd: () => void;
}) => {
  const getTopLineRotate = () => {
    if (isOpen) return 'rotate-45';
    if (isHovered) return 'rotate-20';
    return 'rotate-0';
  };

  const getBottomLineRotate = () => {
    if (isOpen) return '-rotate-45';
    if (isHovered) return '-rotate-20';
    return 'rotate-0';
  };

  const getTopLineTop = () => {
    if (isOpen) return 'top-5.25';
    return 'top-4.5';
  };

  const getBottomLineBottom = () => {
    if (isOpen) return 'bottom-5.25';
    return 'bottom-4.5';
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      className={cn(
        'navbar-hamburger-btn', // ✨ 标志类名，防止拦截
        'relative flex h-11 w-11 items-center justify-center rounded-full',
        'transition-all duration-500',
        'active:scale-[0.95]',
        'pointer-events-auto z-60' // ✨ 给汉堡按钮 z-60 层级，并开启独立点击事件（Radix 会禁用外部 pointer events）
      )}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {/* Top line */}
      <span
        className={cn(
          'absolute h-[1.5px] w-5 bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          getTopLineTop(),
          getTopLineRotate()
        )}
      />
      {/* Bottom line */}
      <span
        className={cn(
          'absolute h-[1.5px] w-5 bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          getBottomLineBottom(),
          getBottomLineRotate()
        )}
      />
    </button>
  );
};

const socialLinks = [
  { label: 'Email:', value: '2575716528@qq.com' },
  { label: 'WeChat:', value: 'f1nnnn_' },
];

const menuItems = [
  { label: 'home', href: '/' },
  { label: 'photos', href: '/photos' },
];

export function Navbar({
  setIsLoading,
}: {
  setIsLoading: (isLoading: boolean) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActiveSection =
    menuItems.find((item) => item.href === location.pathname)?.label ?? 'home';

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const handleJumpToSection = (href: string) => {
    navigate(href);
    setIsLoading(true);
    handleCloseWithAnimation();
  };

  // Set up GSAP animation on mount
  useGSAP(() => {
    const menuEls = menuItemsRef.current.filter(Boolean);
    if (menuEls.length === 0) return;

    // Set initial state: hidden off-screen left
    gsap.set(menuEls, { x: -80, opacity: 0 });

    // Open animation timeline
    const openTl = gsap.timeline({
      paused: true,
      onComplete: () => {
        // Mark as ready after open animation completes
      },
    });
    openTl.to(menuEls, {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
    });

    // Close animation timeline
    const closeTl = gsap.timeline({
      paused: true,
      onComplete: () => {
        // After close animation, actually close the sheet
        setIsOpen(false);
      },
    });
    closeTl.to(menuEls, {
      x: -80,
      opacity: 0,
      duration: 0.35,
      stagger: 0.05,
      ease: 'power2.in',
    });

    tlRef.current = openTl;
    tlRef.current.closeTl = closeTl;
  });

  // Control animation playback
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (isOpen) {
      // Delay to let sheet slide-in animation complete first (~200ms)
      const timeout = setTimeout(() => {
        tl.play(0);
      }, 250);
      return () => clearTimeout(timeout);
    }
    // Note: Close animation is triggered via handleCloseWithAnimation
  }, [isOpen]);

  const handleCloseWithAnimation = () => {
    const tl = tlRef.current;
    if (tl?.closeTl) {
      // Play close animation first, then close sheet
      tl.closeTl.eventCallback('onComplete', () => {
        setIsOpen(false);
      });
      tl.closeTl.play(0);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          // 外层保持 z-50
          'fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 text-primary md:px-12'
        )}
      >
        <a
          // ✨ 给 Logo 限定 z-40 层级，这样它会被 z-50 的 SheetOverlay 覆盖并加上高斯模糊
          className="logo relative z-40 cursor-pointer text-2xl transition-opacity duration-300 hover:opacity-70"
          onClick={() => handleJumpToSection('')}
        >
          F1nn
        </a>

        <div className="flex items-center gap-2">
          {/* ✨ 切换器放在 z-40 */}
          <div className="relative z-40 flex items-center">
            <AnimatedThemeToggler />
          </div>

          <HamburgerButton
            isHovered={isHovered}
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            onHover={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent
              side="right"
              showCloseButton={false}
              portal={false} // ✨ 关键点：关闭 Portal，让其在 Navbar 这个组件内部渲染。此时遮罩是 z-50
              className="w-[85%] max-w-sm bg-background/95 backdrop-blur-2xl"
              onPointerDownOutside={(e) => {
                // 防止点击汉堡按钮时产生冲突（Radix 检测外部点击默认会关闭并打断动画）
                if ((e.target as Element).closest('.navbar-hamburger-btn')) {
                  e.preventDefault();
                }
              }}
            >
              <div className="flex h-full flex-col justify-center space-y-8 p-8">
                <nav
                  ref={navRef}
                  className="mt-16 flex flex-col space-y-4 overflow-hidden"
                >
                  {menuItems.map((item, i) => (
                    <div>
                      <a
                        ref={(el) => {
                          menuItemsRef.current[i] = el;
                        }}
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          handleJumpToSection(item.href);
                        }}
                        className={cn(
                          'links-item group relative inline-block uppercase',
                          'text-3xl font-semibold tracking-tight',
                          item.label === isActiveSection && 'active'
                        )}
                      >
                        {item.label}
                      </a>
                    </div>
                  ))}
                </nav>

                {/* Social Links */}
                <div className="social-links flex flex-col gap-3">
                  <span className="social-links-header font-bold tracking-tight uppercase">
                    Get In Touch ///
                  </span>

                  <div className="flex flex-col gap-2">
                    {socialLinks.map((link) => (
                      <div key={link.label} className="flex items-center gap-3">
                        <span className="social-links-label font-medium">
                          {link.label}
                        </span>
                        <span className="social-links-value font-normal">
                          {link.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
