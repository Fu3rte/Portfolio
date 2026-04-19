import { Input } from '@/components/customComponent/Input';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ContactPage() {
  useGSAP(() => {
    // 标题淡入上移
    gsap.from('.contact-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-header',
        start: 'top 85%',
      },
    });

    // 副标题淡入
    gsap.from('.contact-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-subtitle',
        start: 'top 85%',
      },
    });

    // 表单字段依次入场
    gsap.from('.contact-input', {
      opacity: 0,
      x: -30,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-input',
        start: 'top 85%',
      },
    });

    // 右侧 pretext 区淡入
    gsap.from('#orb-bounce-area', {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#orb-bounce-area',
        start: 'top 80%',
      },
    });
  });

  return (
    <div className="relative flex-center min-h-svh w-full flex-col px-6 py-10 lg:px-0 lg:py-20">
      <div className="flex-center w-full flex-1 flex-col gap-12 px-2 py-8 md:flex-row">
        {/* 左侧表单部分 */}
        <div className="md:w-2/5 lg:w-3/7">
          <div className="flex flex-col gap-1">
            <h1 className="contact-header text-4xl font-bold text-primary">
              Get In Touch {':]'}
            </h1>

            <span className="contact-subtitle text-primary/75">
              Let&apos;s be friends, talk business, or just say hi
            </span>
          </div>

          <form action="submit" className="mt-4 flex flex-col gap-3 md:mt-0">
            <div className="contact-input">
              <Input text="NAME" type="text" />
            </div>
            <div className="contact-input">
              <Input text="EMAIL" type="email" />
            </div>
            <div className="contact-input">
              <Input text="MESSAGE" type="text" />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>

        <div id="orb-bounce-area" className="">
          <div className="relative flex w-full max-w-100 p-4 lg:p-6">
            <p className="text-primary/90">
              Every great project starts with a conversation. Whether you have
              an idea, a problem to solve, or just want to say hello, I'm all
              ears.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
