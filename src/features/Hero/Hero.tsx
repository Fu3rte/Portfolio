import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Highlighter } from '@/components/ui/highlighter';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { ArrowDownRight, Mail } from 'lucide-react';

export function Hero() {
  return (
    <BlurFade inView={true} direction="up">
      <div className="relative z-0 flex-center h-[110dvh] w-full flex-col">
        <div className="absolute flex-center h-full w-full">
          <OrbitingCircles className="h-full" radius={250}>
            <img
              src="src/assets/google-chrome-logo.svg"
              alt="Chrome"
              className="size-12 object-contain"
            />

            <img
              src="src/assets/react.svg"
              alt="React"
              className="size-12 object-contain"
            />

            <img
              src="src/assets/gemini-color.svg"
              alt="Gemini"
              className="size-12 object-contain"
            />
          </OrbitingCircles>

          <OrbitingCircles className="h-full" reverse radius={300} speed={1.5}>
            <img
              src="src/assets/sarff.jpg"
              alt="avatar"
              className="size-32 rounded-full border-2 border-white/60 object-cover shadow-2xl"
            />
          </OrbitingCircles>
        </div>

        <Card className="z-10 flex w-84 flex-col bg-background/90">
          <CardHeader className="items-center space-y-3 py-2">
            <Badge
              variant="outline"
              className="gap-1.5 rounded-full border-primary/30 bg-primary/2 px-3 py-1 text-[0.6rem] tracking-[0.2em] text-primary/80 uppercase"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#007bff] opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#007bff]" />
              </span>
              Open to work
            </Badge>

            <div className="text-center">
              <p className="font-mono text-sm tracking-[0.3em] text-primary/65 uppercase">
                Hello, I'm
              </p>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-primary">
                Fu3rte
              </h1>
            </div>
          </CardHeader>

          <CardContent className="flex-center flex-col space-y-4 px-6 pb-4">
            <TypingAnimation
              className="font-mono text-xs text-primary/55"
              duration={80}
            >
              Frontend Developer
            </TypingAnimation>

            <div className="h-px w-full bg-linear-to-r from-transparent via-primary/10 to-transparent" />

            <div className="flex-center flex-col text-2xl">
              <h2 className="tracking-wider text-primary">Live In The</h2>
              <Highlighter color="#007bff" padding={8}>
                Moment!!
              </Highlighter>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-primary/10 to-transparent" />

            <div className="flex w-full justify-around text-center">
              <div>
                <p className="text-lg font-bold text-primary">2+</p>
                <p className="text-[0.6rem] tracking-wider text-primary/55 uppercase">
                  Projects
                </p>
              </div>

              <div className="h-8 w-px bg-primary/26" />

              <div>
                <p className="text-lg font-bold text-primary">19+</p>
                <p className="text-[0.6rem] tracking-wider text-primary/55 uppercase">
                  Years
                </p>
              </div>

              <div className="h-8 w-px bg-primary/26" />

              <div>
                <p className="text-lg font-bold text-primary">∞</p>
                <p className="text-[0.6rem] tracking-wider text-primary/55 uppercase">
                  Passion
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex gap-2 px-6 pt-6 pb-7">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1.5 rounded-full border-primary/10 bg-primary/4 text-xs text-primary/50 transition-colors duration-300 hover:border-primary/20 hover:text-primary/80"
            >
              <ArrowDownRight className="size-3" />
              About
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1.5 rounded-full bg-[#007bff] text-xs text-white transition-colors duration-300 hover:bg-background hover:text-[#007bff]"
            >
              <Mail className="size-3" />
              Contact
            </Button>
          </CardFooter>
        </Card>

        {/* ——— Scroll hint ——— */}
        <div className="absolute bottom-10 flex-center flex-col gap-2">
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/15 uppercase">
            Scroll
          </span>
          <div className="flex h-6 w-3.5 items-start justify-center rounded-full border border-white/10 p-1">
            <div className="h-1.5 w-0.5 animate-bounce rounded-full bg-white/30" />
          </div>
        </div>
      </div>
    </BlurFade>
  );
}
