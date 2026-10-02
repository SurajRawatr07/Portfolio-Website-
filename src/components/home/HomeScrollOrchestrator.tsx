'use client';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import React, { useEffect, useRef } from 'react';
import { scrollToSection } from '@/lib/navigation';

interface HomeScrollOrchestratorProps {
  banner: React.ReactNode;
  about: React.ReactNode;
  children: React.ReactNode;
}

export default function HomeScrollOrchestrator({
  banner,
  about,
  children,
}: HomeScrollOrchestratorProps) {
  const homeRef = useRef<HTMLDivElement>(null);
  const reuniteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const home = homeRef.current;
    const reunite = reuniteRef.current;
    if (!home || !reunite) return;

    const ctx = gsap.context(() => {
      gsap.set(reunite, {
        zIndex: 2,
      });
      gsap.set(home, {
        zIndex: 1,
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
      });

      const updatePointerEvents = (self: ScrollTrigger) => {
        if (self.progress >= 0.85) {
          home.style.pointerEvents = 'none';
          window.dispatchEvent(new CustomEvent('pause-ambient-geometry'));
        } else {
          home.style.pointerEvents = 'auto';
          window.dispatchEvent(new CustomEvent('resume-ambient-geometry'));
        }
      };

      gsap
        .timeline({
          scrollTrigger: {
            trigger: reunite,
            start: 'top bottom',
            end: 'top 10%',
            scrub: 1.2,
            onUpdate: updatePointerEvents,
            onLeave: () => {
              home.style.pointerEvents = 'none';
              window.dispatchEvent(new CustomEvent('pause-ambient-geometry'));
            },
            onEnterBack: () => {
              home.style.pointerEvents = 'auto';
              window.dispatchEvent(new CustomEvent('resume-ambient-geometry'));
            },
            onRefresh: updatePointerEvents,
          },
        })
        .to(home, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          ease: 'power2.out',
        });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    try {
      const target = sessionStorage.getItem('nav_target_section');
      if (target) {
        sessionStorage.removeItem('nav_target_section');
        const timer = setTimeout(() => {
          scrollToSection(target);
        }, 350);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  return (
    <div className="relative">
      <div ref={homeRef} className="sticky top-0 left-0 w-full min-h-[100dvh] md:h-screen">
        {banner}
      </div>
      <div id="about-section-wrapper" className="relative bg-black">
        <div ref={reuniteRef} className="relative z-10 bg-ink min-h-screen overflow-hidden">
          {about}
        </div>
      </div>
      {children}
    </div>
  );
}
