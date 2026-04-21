import { Input } from '@/components/customComponent/Input';
import emailjs from '@emailjs/browser';
import { useRef, useState, useEffect } from 'react';
import { RiSendPlaneFill } from '@remixicon/react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const EMAILJS_SERVICE_ID = 'portfolio';
const EMAILJS_TEMPLATE_ID = 'template_e6qewe8';
const EMAILJS_PUBLIC_KEY = 'W4yG91sBVcRrB7XfR';

export function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setIsSuccess(true);
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS Error:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Message sent successfully!', {
        position: 'top-center',
      });
    }
    if (error) {
      toast.error(error, { position: 'top-center' });
    }
  }, [isSuccess, error]);

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

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-3 md:mt-0"
          >
            <div>
              <Input text="NAME" type="text" name="name" />
            </div>

            <div>
              <Input text="EMAIL" type="email" name="email" />
            </div>

            <div>
              <Input text="MESSAGE" type="text" name="message" />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Send <RiSendPlaneFill size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="relative flex w-full max-w-100 p-4 lg:p-6">
          <p className="text-primary/90">
            Every great project starts with a conversation. Whether you have an
            idea, a problem to solve, or just want to say hello, I'm all ears.
          </p>
        </div>
      </div>
    </div>
  );
}
