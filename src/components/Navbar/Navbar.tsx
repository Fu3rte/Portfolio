import { useState } from 'react';
import { Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler';
import { Button } from '../ui/button';

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
        'z-[60] pointer-events-auto' // ✨ 给汉堡按钮 z-60 层级，并开启独立点击事件（Radix 会禁用外部 pointer events）
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

const socialLinks =[
  { icon: Mail, label: 'Email', href: 'mailto:example@example.com' },
  { icon: MessageCircle, label: 'WeChat', href: '#' },
];

const menuItems =[
  { label: 'Home', href: '#home' },
  { label: 'Photos', href: '#photos' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const[isActiveSection, setIsActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleJumpToSection = (targetSection: string) => {
    window.location.hash = targetSection;
    setIsActiveSection(targetSection);
    setIsOpen(false);
  };

  const handleJumpToTop = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
          onClick={() => handleJumpToTop('home')}
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
              className="w-[85%] max-w-sm border-l border-black/10 bg-background/95 backdrop-blur-2xl dark:border-white/10"
              onPointerDownOutside={(e) => {
                // 防止点击汉堡按钮时产生冲突（Radix 检测外部点击默认会关闭并打断动画）
                if ((e.target as Element).closest('.navbar-hamburger-btn')) {
                  e.preventDefault();
                }
              }}
            >
              <div className="flex h-full flex-col p-8">
                <nav className="mt-16 flex flex-1 flex-col gap-2">
                  {menuItems.map((item, i) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() =>
                        handleJumpToSection(item.label.toLowerCase())
                      }
                      className={cn(
                        'group flex items-center gap-4 py-4',
                        'text-3xl font-semibold tracking-tight',
                        'transition-all duration-300'
                      )}
                      style={{
                        transitionDelay: `${i * 80 + 150}ms`,
                      }}
                    >
                      <span
                        className={cn(
                          'h-2 w-2 rounded-full transition-all duration-300',
                          'group-hover:scale-150'
                        )}
                        style={{
                          backgroundColor:
                            i === 0
                              ? '#f97316'
                              : i === 1
                                ? '#3b82f6'
                                : '#22c55e',
                        }}
                      />
                      <span className="transition-all duration-300 group-hover:translate-x-2">
                        {item.label}
                      </span>
                    </a>
                  ))}
                </nav>

                {/* Social Links */}
                <div className="flex flex-col gap-4 border-t border-black/10 pt-8 dark:border-white/10">
                  <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                    Get In Touch
                  </span>
                  <div className="flex gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full',
                          'bg-black/5 dark:bg-white/5',
                          'transition-all duration-300 hover:scale-110 hover:bg-black/10 dark:hover:bg-white/10'
                        )}
                      >
                        <link.icon className="h-4 w-4" />
                      </a>
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