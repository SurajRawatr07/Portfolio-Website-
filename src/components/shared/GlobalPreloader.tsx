'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export const PRELOADER_MESSAGES = [
  'Hello, I’m Suraj Rawat.',
  'Welcome to my portfolio.',
  'Building Digital Experiences.',
  'Turning Ideas Into Products.',
] as const;

export const preloaderWords = PRELOADER_MESSAGES;

const MIN_DISPLAY_MS = 2900;
const HARD_CAP_MS = 3800;

export default function GlobalPreloader({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curvePathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dimension, setDimension] = useState<{
    width: number;
    height: number;
  }>({
    width: 1920,
    height: 1080,
  });

  const targetRef = useRef(0);
  const displayedRef = useRef(0);
  const fontsResolvedRef = useRef(false);
  const loadedRef = useRef(false);
  const startedAtRef = useRef(0);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  onCompleteRef.current = onComplete;

  const playExitAnimation = useRef(() => {});

  playExitAnimation.current = () => {
    if (!containerRef.current || !curvePathRef.current) {
      onCompleteRef.current?.();
      return;
    }

    const targetD = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
      dimension.width / 2
    } ${dimension.height} 0 ${dimension.height} L0 0`;

    const tl = gsap.timeline({
      onComplete: () => {
        onCompleteRef.current?.();
      },
    });

    tl.to(curvePathRef.current, {
      attr: { d: targetD },
      duration: 0.7,
      ease: 'power3.inOut',
      delay: 0.15,
    }).to(
      containerRef.current,
      {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      },
      '<',
    );
  };

  useEffect(() => {
    startedAtRef.current = performance.now();

    document.fonts?.ready.then(() => {
      fontsResolvedRef.current = true;
    });

    const onLoad = () => {
      loadedRef.current = true;
    };

    if (document.readyState === 'complete') {
      loadedRef.current = true;
    }

    window.addEventListener('load', onLoad);

    const capTimer = setTimeout(() => {
      fontsResolvedRef.current = true;
      loadedRef.current = true;
    }, HARD_CAP_MS - MIN_DISPLAY_MS);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(capTimer);
    };
  }, []);

  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const elapsed = performance.now() - startedAtRef.current;

      let target = Math.min(90, (elapsed / MIN_DISPLAY_MS) * 88);

      if (fontsResolvedRef.current) {
        target = Math.max(target, 55);
      }

      if (loadedRef.current) {
        target = Math.max(target, 80);
      }

      if (
        fontsResolvedRef.current &&
        loadedRef.current &&
        elapsed >= MIN_DISPLAY_MS
      ) {
        target = 100;
      }

      targetRef.current = target;

      displayedRef.current +=
        (targetRef.current - displayedRef.current) * 0.09;

      const shown =
        displayedRef.current >= 99.5 ? 100 : displayedRef.current;

      setProgress(shown);

      if (shown === 100 && !finishedRef.current) {
        finishedRef.current = true;

        try {
          sessionStorage.setItem('preloader-seen', '1');
        } catch {}

        setTimeout(() => playExitAnimation.current(), 140);
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth sequence progression between the 4 messages
  useEffect(() => {
    if (finishedRef.current) return;
    if (index >= PRELOADER_MESSAGES.length - 1) return;

    const stayDuration = 620;
    const fadeOutDuration = 160;

    const timeout = setTimeout(() => {
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          y: -8,
          duration: fadeOutDuration / 1000,
          ease: 'power2.in',
          onComplete: () => {
            setIndex((prev) => prev + 1);
          },
        });
      } else {
        setIndex((prev) => prev + 1);
      }
    }, stayDuration);

    return () => clearTimeout(timeout);
  }, [index]);

  // Entrance animation for current message
  useEffect(() => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' },
    );
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
    dimension.width / 2
  } ${dimension.height + 300} 0 ${dimension.height} L0 0`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0B110E] cursor-wait text-cream select-none pointer-events-auto px-4"
      style={{ willChange: 'transform' }}
    >
      <div className="relative flex items-center justify-center text-center max-w-xl mx-auto w-full z-10 px-4">
        <p
          ref={textRef}
          className="font-bold-serif font-bold text-cream tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] leading-snug break-words max-w-lg mx-auto"
        >
          {PRELOADER_MESSAGES[index]}
        </p>
      </div>

      <div
        className="absolute bottom-8 left-8 z-10 flex items-baseline gap-3"
        aria-hidden="true"
      >
        <span className="text-accent text-xs uppercase tracking-[0.2em] font-bold-serif font-semibold">
          loading
        </span>

        <span className="text-cream text-base sm:text-lg tabular-nums font-bold-serif font-medium">
          {Math.round(progress)}%
        </span>
      </div>

      <div
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent z-10"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden="true"
      />

      <svg className="absolute top-0 -z-10 h-[calc(100%+300px)] w-full pointer-events-none">
        <path
          ref={curvePathRef}
          className="fill-[#141516]"
          d={initialPath}
        />
      </svg>
    </div>
  );
}