import { useRef } from 'react';
import { TextMeasure } from '@/components/customComponent/Pretext';
import { Input } from '@/components/customComponent/Input';

export function Contact() {
  const containerRef = useRef(null);

  return (
    <div
      className="relative flex w-full flex-col items-center space-y-4 px-6 py-10 lg:py-12"
      ref={containerRef}
    >
      <div className="grid w-full grid-cols-1 rounded-xl border bg-primary/5 pt-6 lg:grid-cols-10">
        <div className="flex flex-col px-4 pb-4 lg:col-span-4">
          <div className="flex flex-col gap-1">
            <h1 className="contact-header text-4xl font-bold text-primary">
              Get In Touch {':]'}
            </h1>

            <span className="text-primary/75">
              交个朋友?谈场合作?联系我，或者我联系你
            </span>

            <form action="submit">
              <Input text="NAME" type="text" />
              <Input text="EMAIL" type="email" />
              <Input text="MESSAGE" type="text" />

              
            </form>
          </div>
        </div>

        <div className="bg-primary pt-2 text-primary/90 lg:col-span-6">
          <TextMeasure
            text="New Tech"
            maxWidth={200}
            font="Inter"
            lineHeight={20}
          />
        </div>
      </div>
    </div>
  );
}
