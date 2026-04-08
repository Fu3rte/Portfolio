import { TextMeasure } from '@/components/customComponent/Pretext';
import { Input } from '@/components/customComponent/Input';

export function Contact() {
  return (
    <div className="relative flex w-full flex-col items-center px-6 py-10 lg:px-0 lg:py-20">
      <div className="grid w-full grid-cols-1 lg:grid-cols-10">
        {/* 左侧表单部分 */}
        <div className="flex flex-col px-4 py-4 lg:col-span-4 lg:py-8">
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

        <div 
          id="orb-bounce-area" 
          className="relative flex min-h-75 items-center justify-center lg:col-span-6 lg:pl-12 rounded-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/2 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-sm" />
          
          <div className="relative flex w-full max-w-100 p-4 lg:p-6 z-10">
            <TextMeasure
              bounceAreaId="orb-bounce-area"
              text="Every great project starts with a conversation. Whether you have an idea, a problem to solve, or just want to say hello, I'm all ears."
              maxWidth={300} 
              font="italic 500 20px Inter"
              lineHeight={32}
              className="text-left text-primary/90"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
