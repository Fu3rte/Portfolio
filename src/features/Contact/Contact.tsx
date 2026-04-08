import { TextMeasure } from '@/components/customComponent/Pretext';
import { Input } from '@/components/customComponent/Input';

export function Contact() {
  return (
    <div className="relative flex w-full flex-col items-center px-6 py-10 lg:px-0 lg:py-20">
      {/* 移除了 border 和 bg，让 Contact 完全融入页面背景 */}
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

        {/* 右侧交互文字区 - 轻微玻璃效果 */}
        <div className="relative flex min-h-[300px] items-center justify-center lg:col-span-6 lg:pl-12">
          <div className="absolute inset-0 rounded-xl border border-white/5 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm" />
          <TextMeasure
            text="Every great project starts with a conversation. Whether you have an idea, a problem to solve, or just want to say hello, I'm all ears."
            maxWidth={360}
            font="italic 500 20px Inter"
            lineHeight={32}
            className="text-left text-xl font-medium italic tracking-tight text-primary/90"
          />
        </div>
      </div>
    </div>
  );
}
