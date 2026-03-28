import { BlurFade } from '@/components/ui/blur-fade';
import { Highlighter } from '@/components/ui/highlighter';
import { TypingAnimation } from '@/components/ui/typing-animation';

export function Hero() {
  return (
    <BlurFade inView={true} direction="up">
      <div className="flex-center h-dvh flex-col gap-6" id="home">
        <h1 className="text-center text-[clamp(3rem,10vw,5rem)] font-bold tracking-wider">
          Live In The{' '}
          <Highlighter color="#007bff" padding={12}>
            Moment!!
          </Highlighter>
        </h1>

        <div className="grid grid-cols-1 px-18">
          <span className="invisible col-start-1 row-start-1 text-[clamp(1.25rem,4vw,1.75rem)] tracking-wider">
            Hello,I am Fu3rte,Welcome To My Portfolio!!🎉
          </span>

          {/* The Typing Animation */}
          <div className="col-start-1 row-start-1">
            <TypingAnimation
              className="text-center text-[clamp(1.25rem,4vw,1.75rem)] tracking-wider"
              words={['Hello,I am Fu3rte,Welcome To My Portfolio!!🎉']}
            />
          </div>
        </div>
      </div>
    </BlurFade>
  );
}
