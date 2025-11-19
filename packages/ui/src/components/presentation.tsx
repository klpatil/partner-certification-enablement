'use client';

import { getChildrenByComponentName } from '@repo/ui/lib/dom';
import { cn } from '@repo/ui/lib/utils';
import { ChevronRight, Maximize2, Minimize2, Monitor, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import {
  type ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Text } from './text';

function PresenterView({
  currentSlide,
  totalSlides,
  slides,
  className,
}: {
  currentSlide: number;
  totalSlides: number;
  slides: ReactNode[];
  className?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const searchParams = useSearchParams();
  const isPresenterMode = searchParams.get('presenter') === 'true';

  const nextSlideIndex = currentSlide + 1;
  const hasNextSlide = nextSlideIndex < totalSlides;

  if (!(hasNextSlide && isPresenterMode)) {
    return null;
  }

  if (isMinimized) {
    return (
      <button
        aria-label="Show presenter view"
        className={cn(
          'fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-lg border border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur transition-all hover:bg-background',
          className
        )}
        onClick={() => setIsMinimized(false)}
        type="button"
      >
        <Monitor className="h-4 w-4" />
        <span className="font-medium text-sm">Presenter View</span>
      </button>
    );
  }

  return (
    <div
      className={cn(
        'fixed right-4 bottom-4 z-40 transition-all duration-300',
        isExpanded ? 'w-[600px]' : 'w-[320px]',
        className
      )}
    >
      <div className="flex items-center justify-between rounded-t-lg border border-border border-b-0 bg-background/95 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-2">
          <Monitor className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-sm">Next Slide</span>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <ChevronRight className="h-3 w-3" />
            <span>
              {nextSlideIndex + 1} / {totalSlides}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            aria-label={isExpanded ? 'Collapse preview' : 'Expand preview'}
            className="rounded p-1 transition-colors hover:bg-secondary"
            onClick={() => setIsExpanded(!isExpanded)}
            type="button"
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
          <button
            aria-label="Minimize presenter view"
            className="rounded p-1 transition-colors hover:bg-secondary"
            onClick={() => setIsMinimized(true)}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          'relative overflow-hidden rounded-b-lg border border-border border-t-0 bg-background/95 shadow-2xl backdrop-blur transition-all duration-300',
          isExpanded ? 'h-[400px]' : 'h-[240px]'
        )}
      >
        <div className="pointer-events-none absolute inset-0 h-[200%] w-[200%] origin-top-left scale-[0.5]">
          <SlidePreview slideIndex={nextSlideIndex} slides={slides} />
        </div>
      </div>
    </div>
  );
}

function SlidePreview({
  slideIndex,
  slides,
}: {
  slideIndex: number;
  slides: React.ReactNode[];
}) {
  const slide = slides[slideIndex];

  if (!slide) {
    return null;
  }

  return (
    <div className="h-full w-full bg-background">
      <div className="flex min-h-full items-center justify-center">
        <div className="mx-auto w-full max-w-5xl">{slide}</div>
      </div>
    </div>
  );
}

function SlidesRenderer({
  slides,
  currentSlide,
}: {
  slides: React.ReactNode[];
  currentSlide: number;
}) {
  return (
    <>
      {slides.map((slide, index) => (
        <div
          aria-hidden={index !== currentSlide}
          aria-label={`Slide ${index + 1}`}
          className={cn(
            'absolute inset-0 h-full w-full transform overflow-auto bg-background transition-all duration-500 ease-in-out focus-visible:outline-none',
            index === currentSlide
              ? 'translate-x-0 scale-100 opacity-100'
              : index < currentSlide
                ? '-translate-x-full scale-95 opacity-0'
                : 'translate-x-full scale-95 opacity-0'
          )}
          key={index}
          role="tabpanel"
          tabIndex={index === currentSlide ? 0 : -1}
        >
          <div className="flex min-h-full items-center justify-center">
            <div className="mx-auto w-full max-w-5xl">{slide}</div>
          </div>
        </div>
      ))}
    </>
  );
}

function Root({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const slides = useMemo(
    () => getChildrenByComponentName(children, Slide),
    [children]
  );

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const channelRef = useRef<BroadcastChannel | null>(null);
  const senderIdRef = useRef<string>(
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );

  useEffect(() => {
    const channel = new BroadcastChannel('presentation-sync');
    channelRef.current = channel;
    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!channelRef.current) {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data.senderId === senderIdRef.current) {
        return;
      }
      if (
        event.data.type === 'slide-change' &&
        event.data.slideIndex !== undefined
      ) {
        setCurrentSlide(event.data.slideIndex);
      }
    };

    channelRef.current.addEventListener('message', handleMessage);
    return () => {
      channelRef.current?.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (!channelRef.current) {
      return;
    }

    const message = {
      type: 'slide-change',
      slideIndex: currentSlide,
      senderId: senderIdRef.current,
      timestamp: Date.now(),
    };

    channelRef.current.postMessage(message);
  }, [currentSlide]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <expected>
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSlide]);

  const togglePresenterMode = useCallback(() => {
    const url = new URL(window.location.href);
    const isPresenterMode = url.searchParams.get('presenter') === 'true';
    if (isPresenterMode) {
      url.searchParams.delete('presenter');
    } else {
      url.searchParams.set('presenter', 'true');
    }
    window.history.pushState({}, '', url.toString());
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (['ArrowRight', 'ArrowLeft', ' ', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
          break;
        case 'ArrowLeft':
          setCurrentSlide((prev) => Math.max(prev - 1, 0));
          break;
        case 'Home':
          setCurrentSlide(0);
          break;
        case 'End':
          setCurrentSlide(slides.length - 1);
          break;
        case 'p':
        case 'P':
          togglePresenterMode();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'Escape':
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
        default:
          return;
      }
    },
    [slides.length, toggleFullscreen, togglePresenterMode]
  );

  return (
    <div
      aria-label={`${title} presentation, ${slides.length} slides`}
      aria-roledescription="presentation"
      autoFocus
      className={cn(
        'flex h-screen flex-col bg-background font-sans text-foreground focus:outline-none',
        className
      )}
      onKeyDown={handleKeyDown}
      role="presentation"
      tabIndex={0}
    >
      <header className="flex items-center justify-between border-border/50 border-b bg-background/95 px-4 py-3 backdrop-blur">
        <div>
          <Text
            aria-label={`Presentation title: ${title}`}
            as="h1"
            className="font-semibold text-2xl"
          >
            {title}
          </Text>
          {subtitle && (
            <h2
              aria-label={`Presentation subtitle: ${subtitle}`}
              className="m-0 text-base text-muted-foreground"
            >
              {subtitle}
            </h2>
          )}
        </div>
        <div className="invert dark:invert-0">
          <svg
            aria-label="Presentation logo"
            fill="none"
            height="40"
            viewBox="0 0 76 65"
            width="76"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Presentation logo</title>
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white" />
          </svg>
        </div>
      </header>

      <div className="relative flex-1 overflow-hidden p-4">
        <div className="relative h-full w-full">
          <SlidesRenderer currentSlide={currentSlide} slides={slides} />
        </div>

        <Suspense>
          <PresenterView
            currentSlide={currentSlide}
            slides={slides}
            totalSlides={slides.length}
          />
        </Suspense>
      </div>

      <footer className="flex justify-center border-primary/10 border-t bg-background p-4">
        <div
          aria-label={`Slide ${String(currentSlide + 1)} of ${String(slides.length)}`}
          aria-live="polite"
          className="text-muted-foreground text-sm"
          role="log"
        >
          {String(currentSlide + 1)} / {String(slides.length)}
        </div>
        <div aria-live="assertive" className="sr-only">
          Slide {String(currentSlide + 1)} of {String(slides.length)}
        </div>
      </footer>
    </div>
  );
}

function Slide({
  children,
  className,
  notes,
}: {
  children: React.ReactNode;
  className?: string;
  notes?: string;
}) {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col gap-4 bg-gradient-to-br from-primary/5 via-background to-primary/5 p-8',
        className
      )}
      data-presenter-notes={notes}
    >
      {children}
    </div>
  );
}

export default { Root, Slide };
