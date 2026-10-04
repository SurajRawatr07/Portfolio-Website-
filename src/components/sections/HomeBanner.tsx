'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap';
import dynamic from 'next/dynamic';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Magnetic from '@/components/ui/Magnetic';
import { EASE } from '@/lib/motion';
import { site } from '@/lib/site';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const AmbientGeometry = dynamic(() => import('@/components/canvas/AmbientGeometry'), {
  ssr: false,
});

const RoleTicker = () => {
  const roles = site.roles;
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      const wrapper = containerRef.current;
      if (!wrapper) return;
      const currentWord = wrapper.querySelector('.ticker-word-current');
      const nextWord = wrapper.querySelector('.ticker-word-next');
      if (currentWord && nextWord) {
        gsap.set(nextWord, { yPercent: 100 });
        gsap.to(currentWord, { yPercent: -100, duration: 0.4, ease: EASE.outCubic });
        gsap.to(nextWord, {
          yPercent: 0,
          duration: 0.4,
          ease: EASE.outCubic,
          onComplete: () => {
            setCurrentIdx((prev) => (prev + 1) % roles.length);
            gsap.set(currentWord, { yPercent: 0 });
          },
        });
      }
    }, 2600);
    return () => clearInterval(interval);
  }, [roles.length, reduced]);

  const nextIdx = (currentIdx + 1) % roles.length;
  return (
    <div className="h-6 overflow-hidden mb-8 flex justify-center items-center select-none">
      <div
        ref={containerRef}
        className="relative h-6 w-80 text-center font-bold-serif text-xs sm:text-[13px] uppercase tracking-[0.16em] text-accent"
      >
        <div className="ticker-word-current absolute inset-0 flex items-center justify-center">
          {roles[currentIdx]}
        </div>
        <div className="ticker-word-next absolute inset-0 flex items-center justify-center translate-y-full">
          {roles[nextIdx]}
        </div>
      </div>
    </div>
  );
};

const StampBadge = ({ onClick }: { onClick: () => void }) => (
  <Magnetic strength={0.35}>
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll to contact section"
      className="group relative w-28 h-28 lg:w-36 lg:h-36 rounded-full grid place-items-center select-none"
    >
      <svg viewBox="0 0 200 200" className="stamp-disc absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <path id="stamp-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text
          className="fill-charcoal font-bold-serif uppercase"
          style={{ fontSize: '13px', letterSpacing: '0.22em' }}
        >
          <textPath href="#stamp-circle">
            AVAILABLE FOR WORK • LET&apos;S BUILD • 
          </textPath>
        </text>
      </svg>
      <span className="grid place-items-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent text-white transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-45">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 7l10 10M17 7v10H7" />
        </svg>
      </span>
    </button>
  </Magnetic>
);

const HomeBanner = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const floatTimelinesRef = useRef<gsap.core.Timeline[]>([]);
  const stampRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerContentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const splitsRef = useRef<SplitText[]>([]);
  const hasPlayedRef = useRef(false);
  const reduced = useReducedMotion();

  const playIntro = useCallback(() => {
    if (reduced || !nameRef.current || hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    const lines = nameRef.current.querySelectorAll<HTMLElement>('[data-hero-line]');
    const chars: HTMLElement[] = [];
    splitsRef.current.forEach((s) => s.revert());
    splitsRef.current = [];
    lines.forEach((line) => {
      const split = SplitText.create(line, { type: 'chars', charsClass: 'hero-char' });
      splitsRef.current.push(split);
      chars.push(...(split.chars as HTMLElement[]));
    });

    gsap.set(chars, {
      yPercent: 125,
      rotateX: -70,
      opacity: 0,
      transformPerspective: 900,
      transformOrigin: '50% 100%',
    });
    gsap.set([paragraphRef.current, tickerRef.current], { y: 34, opacity: 0 });
    gsap.set(buttonsRef.current?.children ?? [], { y: 26, opacity: 0, scale: 0.96 });
    gsap.set(socialsRef.current?.children ?? [], { y: 20, opacity: 0, scale: 0.92 });
    gsap.set(stampRef.current, { scale: 0, rotate: -30, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: EASE.outQuart }, delay: 0.05 });
    tl.to(chars, {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1,
      stagger: { each: 0.026, from: 'start' },
    })
      .to(paragraphRef.current, { y: 0, opacity: 1, duration: 0.75, ease: EASE.outCubic }, '-=0.55')
      .to(tickerRef.current, { y: 0, opacity: 1, duration: 0.6, ease: EASE.outCubic }, '-=0.5')
      .to(
        buttonsRef.current?.children ?? [],
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.6)' },
        '-=0.45'
      )
      .to(
        socialsRef.current?.children ?? [],
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.5)' },
        '-=0.35'
      )
      .to(stampRef.current, { scale: 1, rotate: 0, opacity: 1, duration: 0.9, ease: 'elastic.out(1, 0.55)' }, '-=0.6');

    const enterHandler = () => {
      gsap.to(chars, {
        keyframes: [{ yPercent: -9, duration: 0.22 }, { yPercent: 0, duration: 0.5 }],
        ease: EASE.outQuad,
        stagger: { each: 0.016, from: 'center' },
        overwrite: 'auto',
      });
    };
    nameRef.current.addEventListener('mouseenter', enterHandler);
    return () => nameRef.current?.removeEventListener('mouseenter', enterHandler);
  }, [reduced]);

  useEffect(() => {
    if (reduced || !nameRef.current) {
      if (reduced) {
        gsap.set([paragraphRef.current, tickerRef.current], { clearProps: 'all' });
        gsap.set(socialsRef.current?.children ?? [], { clearProps: 'all' });
      }
      return;
    }
    if (typeof window !== 'undefined' && window.__preloaderDone === true) {
      const cleanup = playIntro();
      return cleanup;
    }

    const lines = nameRef.current.querySelectorAll<HTMLElement>('[data-hero-line]');
    const chars: HTMLElement[] = [];
    splitsRef.current.forEach((s) => s.revert());
    splitsRef.current = [];
    lines.forEach((line) => {
      const split = SplitText.create(line, { type: 'chars', charsClass: 'hero-char' });
      splitsRef.current.push(split);
      chars.push(...(split.chars as HTMLElement[]));
    });

    gsap.set(chars, {
      yPercent: 125,
      rotateX: -70,
      opacity: 0,
      transformPerspective: 900,
      transformOrigin: '50% 100%',
    });
    gsap.set([paragraphRef.current, tickerRef.current], { y: 34, opacity: 0 });
    gsap.set(buttonsRef.current?.children ?? [], { y: 26, opacity: 0, scale: 0.96 });
    gsap.set(socialsRef.current?.children ?? [], { y: 20, opacity: 0, scale: 0.92 });
    gsap.set(stampRef.current, { scale: 0, rotate: -30, opacity: 0 });
  }, [reduced, playIntro]);

  useEffect(() => {
    const handlePreloaderComplete = () => {
      playIntro();
    };
    window.addEventListener('preloaderComplete', handlePreloaderComplete);
    return () => window.removeEventListener('preloaderComplete', handlePreloaderComplete);
  }, [playIntro]);

  useEffect(() => {
    if (reduced) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      spotlightRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
      spotlightRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
      gsap.to(spotlightRef.current, { opacity: 1, duration: 0.5, overwrite: 'auto' });
    };
    const handleMouseLeave = () => {
      gsap.to(spotlightRef.current, { opacity: 0, duration: 0.8, overwrite: 'auto' });
    };
    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [reduced]);

  useGSAP(
    () => {
      if (reduced || !sectionRef.current || !innerContentRef.current) return;
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        animation: gsap.to(innerContentRef.current, { y: '-15vh', ease: 'none' }),
      });
      return () => trigger.kill();
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  useGSAP(
    () => {
      if (reduced) return;

      const initFloating = () => {
        const isMobile = window.innerWidth < 768;
        const amp = isMobile ? 0.28 : 0.85;

        floatTimelinesRef.current.forEach((t) => t.kill());
        floatTimelinesRef.current = [];

        // 1. GitHub: 6–8s duration, slow diagonal / horizontal movement
        const tlGitHub = gsap.timeline({ repeat: -1, yoyo: true });
        tlGitHub
          .to('.hero-social-float-0', {
            x: 12 * amp,
            y: -9 * amp,
            rotation: 2.5 * amp,
            duration: 3.6,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-0', {
            x: -10 * amp,
            y: 8 * amp,
            rotation: -2 * amp,
            duration: 3.6,
            ease: 'sine.inOut',
          });
        floatTimelinesRef.current.push(tlGitHub);

        // 2. LinkedIn: 7–9s duration, slight vertical + horizontal movement with offset phase
        const tlLinkedIn = gsap.timeline({ repeat: -1, yoyo: true, delay: 0.7 });
        tlLinkedIn
          .to('.hero-social-float-1', {
            x: -9 * amp,
            y: 11 * amp,
            rotation: -2.8 * amp,
            duration: 4.1,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-1', {
            x: 8 * amp,
            y: -10 * amp,
            rotation: 2.2 * amp,
            duration: 4.1,
            ease: 'sine.inOut',
          });
        floatTimelinesRef.current.push(tlLinkedIn);

        // 3. LeetCode: 8–10s duration, different slow floating path with subtle rotation
        const tlLeetCode = gsap.timeline({ repeat: -1, yoyo: true, delay: 1.3 });
        tlLeetCode
          .to('.hero-social-float-2', {
            x: 11 * amp,
            y: -13 * amp,
            rotation: 3.2 * amp,
            duration: 4.6,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-2', {
            x: -12 * amp,
            y: 7 * amp,
            rotation: -2.4 * amp,
            duration: 4.6,
            ease: 'sine.inOut',
          });
        floatTimelinesRef.current.push(tlLeetCode);
      };

      initFloating();

      const handleResize = () => {
        initFloating();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        floatTimelinesRef.current.forEach((t) => t.kill());
        floatTimelinesRef.current = [];
      };
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  const handleFloatHover = (idx: number, isHovering: boolean) => {
    const tl = floatTimelinesRef.current[idx];
    if (tl) {
      if (isHovering) {
        tl.pause();
      } else {
        tl.resume();
      }
    }
  };

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(section, { offset: 0, duration: 1.2 });
    } else {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-[100dvh] md:min-h-screen px-6 sm:px-8 md:px-12 lg:px-16 pt-28 pb-8 md:pt-20 md:pb-0 bg-cream flex items-center relative overflow-hidden"
    >
      <AmbientGeometry />

      {!reduced && (
        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none z-[1] opacity-0"
          style={{
            background: 'radial-gradient(400px circle at var(--x, 0px) var(--y, 0px), rgba(196, 93, 62, 0.07), transparent 85%)',
            willChange: 'opacity',
          }}
        />
      )}

      <div ref={innerContentRef} className="max-w-5xl mx-auto w-full relative z-10 px-4 sm:px-6">
        {/* Floating Social Icons distributed around the Hero */}
        <div ref={socialsRef} className="pointer-events-none">
          {/* GitHub: Upper Left */}
          <div className="absolute top-1 sm:top-2 md:top-3 lg:top-4 left-2 sm:left-5 md:left-9 lg:left-14 xl:left-18 z-20 pointer-events-auto select-none">
            <div
              className="hero-social-float-0 will-change-transform"
              onMouseEnter={() => handleFloatHover(0, true)}
              onMouseLeave={() => handleFloatHover(0, false)}
              onFocus={() => handleFloatHover(0, true)}
              onBlur={() => handleFloatHover(0, false)}
            >
              <a
                href="https://github.com/SurajRawatr07"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="group relative w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/[0.04] backdrop-blur-sm border border-black/10 hover:border-accent hover:bg-black/[0.08] text-charcoal hover:text-accent shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <FaGithub
                  className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 text-charcoal/80 group-hover:text-accent transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* LinkedIn: Middle Right */}
          <div className="absolute top-[34%] sm:top-[32%] md:top-[30%] lg:top-[28%] right-2 sm:right-5 md:right-9 lg:right-13 xl:right-16 z-20 pointer-events-auto select-none">
            <div
              className="hero-social-float-1 will-change-transform"
              onMouseEnter={() => handleFloatHover(1, true)}
              onMouseLeave={() => handleFloatHover(1, false)}
              onFocus={() => handleFloatHover(1, true)}
              onBlur={() => handleFloatHover(1, false)}
            >
              <a
                href="https://www.linkedin.com/in/suraj-rawat-30513b340/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="group relative w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/[0.04] backdrop-blur-sm border border-black/10 hover:border-accent hover:bg-black/[0.08] text-charcoal hover:text-accent shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <FaLinkedinIn
                  className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 text-charcoal/80 group-hover:text-accent transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* LeetCode: Lower Left */}
          <div className="absolute top-[58%] sm:top-[56%] md:top-[54%] lg:top-[52%] left-2 sm:left-5 md:left-9 lg:left-13 xl:left-16 z-20 pointer-events-auto select-none">
            <div
              className="hero-social-float-2 will-change-transform"
              onMouseEnter={() => handleFloatHover(2, true)}
              onMouseLeave={() => handleFloatHover(2, false)}
              onFocus={() => handleFloatHover(2, true)}
              onBlur={() => handleFloatHover(2, false)}
            >
              <a
                href="https://leetcode.com/u/SurajRawat07/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                title="LeetCode"
                className="group relative w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/[0.04] backdrop-blur-sm border border-black/10 hover:border-[#FFA116] hover:bg-black/[0.08] text-charcoal hover:text-[#FFA116] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA116] focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <SiLeetcode
                  className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 text-charcoal/80 group-hover:text-[#FFA116] transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="relative text-center">
          <h1
            ref={nameRef}
            aria-label={site.name}
            className="select-none leading-none cursor-default mb-6 md:mb-4"
          >
            <span aria-hidden="true" className="block">
              <span
                data-hero-line
                className="block font-bold-serif uppercase text-hero tracking-[-0.03em] leading-[0.9] text-charcoal"
              >
                Suraj 
              </span>
              <span
                data-hero-line
                className="block font-bold-italic text-hero-sm leading-[0.86] md:ml-[10vw] tracking-[-0.015em] text-accent"
              >
                Rawat 
              </span>
            </span>
          </h1>

          <div ref={stampRef} className="absolute -top-6 right-0 lg:right-4 xl:right-10 hidden sm:block opacity-0">
            <StampBadge onClick={() => handleScroll('contact')} />
          </div>
        </div>

        <div className="flex justify-center items-center py-1 md:py-3 px-4 sm:px-6 w-full">
          <div className="max-w-xl w-full text-center mx-auto">
            <p
              ref={paragraphRef}
              className="text-warm/90 font-italic-serif text-base sm:text-lg md:text-[1.05rem] leading-[1.65] mb-6 md:mb-8 text-center mx-auto max-w-lg tracking-normal"
            >
              Full-Stack Developer building scalable web applications with MERN, Next.js, TypeScript & AI.
            </p>

            <div ref={tickerRef} className="w-full flex justify-center">
              <RoleTicker />
            </div>

            <div ref={buttonsRef} className="flex flex-row justify-center items-center gap-2.5 sm:gap-4 flex-wrap w-full max-w-full mx-auto px-2">
              <AnimatedButton
                onClick={() => handleScroll('projects')}
                topText="PROJECTS"
                bottomText="VIEW WORK →"
                variant="primary"
              />
              <AnimatedButton
                onClick={() => handleScroll('contact')}
                topText="CONTACT"
                bottomText="GET IN TOUCH →"
                variant="light"
              />
              <AnimatedButton
                as="a"
                href="/suraj_rawat_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                topText="RESUME"
                bottomText="DOWNLOAD →"
                variant="outline"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
