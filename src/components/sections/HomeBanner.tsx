'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { EASE } from '@/lib/motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import AmbientGeometry from '@/components/canvas/AmbientGeometry';

const ROTATING_PHRASES = [
  'Building Digital Experiences.',
  'Turning Ideas Into Products.',
  'Hello, I’m Suraj Rawat.',
  'Welcome to my portfolio.',
] as const;

const RoleTicker = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const textRef = useRef<HTMLParagraphElement>(null);
  const isAnimatingRef = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      const el = textRef.current;
      if (!el || isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      // Subtle, clean fade out with small upward glide
      gsap.to(el, {
        opacity: 0,
        y: -7,
        duration: 0.38,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentIdx((prev) => (prev + 1) % ROTATING_PHRASES.length);
          // Subtle, clean fade in from below
          gsap.fromTo(
            el,
            { opacity: 0, y: 7 },
            {
              opacity: 1,
              y: 0,
              duration: 0.42,
              ease: 'power2.out',
              onComplete: () => {
                isAnimatingRef.current = false;
              },
            },
          );
        },
      });
    }, 3200);

    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <div className="h-6 sm:h-7 flex items-center justify-center select-none w-full mb-7 sm:mb-8">
      <p
        ref={textRef}
        className="font-italic-serif text-[13.5px] sm:text-[14.5px] md:text-[15px] tracking-[0.02em] text-[#1B895C] font-medium text-center whitespace-nowrap"
      >
        {ROTATING_PHRASES[currentIdx]}
      </p>
    </div>
  );
};

const HomeBanner = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const floatTimelinesRef = useRef<gsap.core.Timeline[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerContentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);
  const reduced = useReducedMotion();

  const playIntro = useCallback(() => {
    if (reduced || !nameRef.current || hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    gsap.set(nameRef.current, { y: 16, opacity: 0 });
    gsap.set([paragraphRef.current, tickerRef.current], { y: 34, opacity: 0 });
    gsap.set(buttonsRef.current?.children ?? [], { y: 26, opacity: 0, scale: 0.96 });
    gsap.set(socialsRef.current?.children ?? [], { y: 20, opacity: 0, scale: 0.92 });

    const tl = gsap.timeline({ defaults: { ease: EASE.outCubic }, delay: 0.05 });
    tl.to(nameRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.85,
      ease: 'power3.out',
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
      );
  }, [reduced]);

  useEffect(() => {
    if (reduced || !nameRef.current) {
      if (reduced) {
        gsap.set([nameRef.current, paragraphRef.current, tickerRef.current], { clearProps: 'all' });
        gsap.set(socialsRef.current?.children ?? [], { clearProps: 'all' });
      }
      return;
    }
    if (typeof window !== 'undefined' && window.__preloaderDone === true) {
      const cleanup = playIntro();
      return cleanup;
    }

    gsap.set(nameRef.current, { y: 16, opacity: 0 });
    gsap.set([paragraphRef.current, tickerRef.current], { y: 34, opacity: 0 });
    gsap.set(buttonsRef.current?.children ?? [], { y: 26, opacity: 0, scale: 0.96 });
    gsap.set(socialsRef.current?.children ?? [], { y: 20, opacity: 0, scale: 0.92 });
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
        const isSmallMobile = window.innerWidth < 420;
        // Desktop has large natural movement space (~40-60px travel)
        // Tablet has moderate travel (~25-35px travel)
        // Mobile automatically scales travel down (~8-12px) to stay safe inside viewport and away from text
        const amp = isSmallMobile ? 0.16 : isMobile ? 0.22 : window.innerWidth < 1024 ? 0.65 : 1.0;

        floatTimelinesRef.current.forEach((t) => t.kill());
        floatTimelinesRef.current = [];

        // 1. GitHub: Left / Upper-Left natural floating wander (multi-step wandering path)
        const tlGitHub = gsap.timeline({ repeat: -1 });
        tlGitHub
          .to('.hero-social-float-0', {
            x: -42 * amp,
            y: -32 * amp,
            scale: 1.03,
            opacity: 1,
            duration: 4.6,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-0', {
            x: -56 * amp,
            y: 38 * amp,
            scale: 0.98,
            opacity: 0.88,
            duration: 5.2,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-0', {
            x: 28 * amp,
            y: 60 * amp,
            scale: 1.04,
            opacity: 0.98,
            duration: 4.8,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-0', {
            x: -16 * amp,
            y: 14 * amp,
            scale: 1.0,
            opacity: 0.92,
            duration: 4.4,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-0', {
            x: 0,
            y: 0,
            scale: 1.0,
            opacity: 0.92,
            duration: 4.2,
            ease: 'sine.inOut',
          });
        floatTimelinesRef.current.push(tlGitHub);

        // 2. LinkedIn: Right / Upper-Right natural floating wander (independent counter-path)
        const tlLinkedIn = gsap.timeline({ repeat: -1, delay: 1.6 });
        tlLinkedIn
          .to('.hero-social-float-1', {
            x: 44 * amp,
            y: -46 * amp,
            scale: 1.04,
            opacity: 1,
            duration: 5.4,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-1', {
            x: 58 * amp,
            y: 30 * amp,
            scale: 0.97,
            opacity: 0.88,
            duration: 5.2,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-1', {
            x: -30 * amp,
            y: 68 * amp,
            scale: 1.03,
            opacity: 0.98,
            duration: 5.6,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-1', {
            x: 20 * amp,
            y: 12 * amp,
            scale: 0.99,
            opacity: 0.92,
            duration: 4.8,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-1', {
            x: 0,
            y: 0,
            scale: 1.0,
            opacity: 0.92,
            duration: 4.6,
            ease: 'sine.inOut',
          });
        floatTimelinesRef.current.push(tlLinkedIn);

        // 3. LeetCode: Lower-Left natural floating wander (different rhythm & distinct loop)
        const tlLeetCode = gsap.timeline({ repeat: -1, delay: 3.2 });
        tlLeetCode
          .to('.hero-social-float-2', {
            x: -50 * amp,
            y: 20 * amp,
            scale: 1.03,
            opacity: 0.98,
            duration: 5.8,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-2', {
            x: -18 * amp,
            y: -54 * amp,
            scale: 0.98,
            opacity: 0.88,
            duration: 6.0,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-2', {
            x: 34 * amp,
            y: 36 * amp,
            scale: 1.04,
            opacity: 1,
            duration: 5.6,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-2', {
            x: -14 * amp,
            y: -10 * amp,
            scale: 0.99,
            opacity: 0.92,
            duration: 5.0,
            ease: 'sine.inOut',
          })
          .to('.hero-social-float-2', {
            x: 0,
            y: 0,
            scale: 1.0,
            opacity: 0.92,
            duration: 4.8,
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
      className="min-h-[100dvh] md:min-h-screen px-6 sm:px-8 md:px-12 lg:px-16 pt-24 pb-8 md:pt-20 md:pb-0 bg-cream flex items-center relative overflow-hidden"
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
        {/* Floating Social Icons framing the central Hero content */}
        <div ref={socialsRef} className="pointer-events-none">
          {/* GitHub: Left & Upper-Left area */}
          <div className="absolute top-2 min-[400px]:top-3 sm:top-5 md:top-6 lg:top-8 left-3 min-[400px]:left-5 sm:left-8 md:left-[calc(50%-280px)] lg:left-[calc(50%-340px)] xl:left-[calc(50%-380px)] z-20 pointer-events-auto select-none">
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
                className="group relative w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/[0.04] backdrop-blur-sm border border-black/10 hover:border-[#1B895C] hover:bg-black/[0.08] text-charcoal hover:text-[#1B895C] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B895C] focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <FaGithub
                  className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 text-charcoal/80 group-hover:text-[#1B895C] transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* LinkedIn: Right & Upper-Right area */}
          <div className="absolute top-[28%] min-[400px]:top-[26%] sm:top-[25%] md:top-[24%] lg:top-[25%] right-3 min-[400px]:right-5 sm:right-8 md:right-[calc(50%-280px)] lg:right-[calc(50%-340px)] xl:right-[calc(50%-380px)] z-20 pointer-events-auto select-none">
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
                className="group relative w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/[0.04] backdrop-blur-sm border border-black/10 hover:border-[#1B895C] hover:bg-black/[0.08] text-charcoal hover:text-[#1B895C] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B895C] focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <FaLinkedinIn
                  className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 text-charcoal/80 group-hover:text-[#1B895C] transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* LeetCode: Lower-Left area */}
          <div className="absolute top-[58%] min-[400px]:top-[56%] sm:top-[52%] md:top-[52%] lg:top-[50%] left-3 min-[400px]:left-5 sm:left-8 md:left-[calc(50%-300px)] lg:left-[calc(50%-360px)] xl:left-[calc(50%-400px)] z-20 pointer-events-auto select-none">
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

        {/* Hero Title: SURAJ RAWAT Premium Personal-Brand Wordmark */}
        <div className="relative text-center flex justify-center items-center overflow-visible">
          <h1
            ref={nameRef}
            aria-label="SURAJ RAWAT"
            className="group select-none cursor-default mb-4 sm:mb-5 max-w-full inline-block overflow-visible"
          >
            <span
              className="inline-flex flex-nowrap whitespace-nowrap items-baseline justify-center gap-x-2 min-[380px]:gap-x-3 sm:gap-x-4 md:gap-x-5 leading-[1.05] py-1.5 text-[clamp(1.75rem,4.4vw,3.35rem)] overflow-visible"
            >
              {/* SURAJ: Strong uppercase bold serif */}
              <span
                className="font-bold-serif uppercase font-bold text-charcoal tracking-[-0.01em] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:tracking-[0.02em] inline-block"
                style={{
                  fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, "Times New Roman", serif',
                  fontWeight: 700,
                }}
              >
                SURAJ
              </span>

              {/* RAWAT: Expressive italic serif with subtle contrast */}
              <span
                className="font-italic-serif italic font-normal text-charcoal tracking-normal transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:tracking-[0.03em] group-hover:translate-x-1 inline-block"
                style={{
                  fontFamily: 'var(--font-instrument-serif), var(--font-playfair), "Instrument Serif", Georgia, "Times New Roman", serif',
                  fontWeight: 400,
                }}
              >
                RAWAT
              </span>
            </span>
          </h1>
        </div>

        {/* Hero Subtitle, Rotating Phrase & Call-to-Action Buttons */}
        <div className="flex justify-center items-center py-1 sm:py-2 px-4 sm:px-6 w-full">
          <div className="max-w-xl w-full text-center mx-auto">
            <p
              ref={paragraphRef}
              className="text-[#26332C] font-italic-serif text-[15px] sm:text-[16.5px] md:text-[18px] leading-[1.65] mb-4 sm:mb-5 text-center mx-auto max-w-lg tracking-normal font-normal"
            >
              Full-Stack Developer building scalable web applications with MERN, Next.js, TypeScript & AI.
            </p>

            <div ref={tickerRef} className="w-full flex justify-center">
              <RoleTicker />
            </div>

            <div ref={buttonsRef} className="flex flex-row justify-center items-center gap-3 sm:gap-4 flex-wrap w-full max-w-full mx-auto px-2">
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
