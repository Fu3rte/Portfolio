import { useEffect, useState } from 'react';
import './style.css';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadResume = () => {
    const resumeUrl = '/resume.pdf'; // 替换为你的简历文件路径

    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'resume.pdf'; // 设置下载文件名
  };

  const handleJumpToSection = (targetSection: string) => {
    window.location.hash = targetSection;
  };

  return (
    <div
      className={cn(
        'fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-muted-foreground/20 px-6 py-4 transition-colors duration-300',
        isScrolled ? 'bg-black/30 backdrop-blur-sm' : 'bg-black'
      )}
    >
      <a
        className="logo text-2xl transition-opacity duration-300 hover:opacity-90"
        onClick={() => handleJumpToSection('home')}
      >
        Fu3rte
      </a>

      <div className="nav-links flex-center gap-4 md:gap-10">
        <a
          className="links-item active"
          onClick={() => handleJumpToSection('home')}
        >
          首页
        </a>

        <a className="links-item" onClick={() => handleJumpToSection('photos')}>
          照片集
        </a>

        <a className="links-item" onClick={() => handleJumpToSection('blog')}>
          随记
        </a>
      </div>

      <div>
        <button
          className="transition-opacity duration-300 hover:opacity-90"
          onClick={handleDownloadResume}
        >
          下载简历
        </button>
      </div>
    </div>
  );
}
