'use client';

import React, { useState, useEffect, useRef } from 'react';
import AnimatedLink from '@/components/ui/AnimateLink';
import Magnetic from '@/components/ui/Magnetic';
import { ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { useHandleLinkClick } from '@/lib/navigation';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import { site, socialList, navLinks } from '@/lib/site';
import { gsap, useGSAP } from '@/lib/gsap';
import Lenis from 'lenis';


const getSocialIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('linkedin')) return <FaLinkedinIn className="w-3.5 h-3.5" />;
  if (l.includes('github')) return <FaGithub className="w-3.5 h-3.5" />;
  if (l.includes('leetcode')) return <SiLeetcode className="w-3.5 h-3.5" />;
  if (l.includes('instagram')) return <FaInstagram className="w-3.5 h-3.5" />;
  return null;
};

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const lenisRef = useLenis() as React.RefObject<Lenis | null> | null;
  const lenis = lenisRef?.current;

  // Subtle floating icon animations (independent natural movements inspired by the homepage)
  useGSAP(
    () => {
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      // GitHub: slow floating movement with slight upward drift & tilt
      gsap.to('.social-float-0', {
        y: -4.5,
        x: 2,
        rotation: 1.8,
        duration: 3.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // LinkedIn: gentle downward and leftward float with opposite tilt
      gsap.to('.social-float-1', {
        y: 4,
        x: -2.5,
        rotation: -2,
        duration: 3.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // LeetCode: smooth diagonal gentle vertical/horizontal wave
      gsap.to('.social-float-2', {
        y: -5,
        x: -2,
        rotation: 2.2,
        duration: 3.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Instagram: subtle counter-balance float with fluid rhythm
      gsap.to('.social-float-3', {
        y: 3.5,
        x: 2.5,
        rotation: -1.6,
        duration: 4.1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: footerRef },
  );

  useEffect(() => {
    setIsMounted(true);
    let interval: NodeJS.Timeout | number | undefined;

    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: site.timeZone,
      });
      setCurrentTime(timeString);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          updateTime();
          interval = setInterval(updateTime, 30000);
        } else {
          if (interval) {
            clearInterval(interval);
            interval = undefined;
          }
        }
      },
      { threshold: 0 },
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, []);

  const handleLinkClick = useHandleLinkClick();
  const links = navLinks.filter((l) => !('menuOnly' in l && l.menuOnly));

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-30 bg-ink border-t border-border-subtle px-6 sm:px-8 md:px-12 py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-12">
          {/* Navigation Menu */}
          <div>
            <h3 className="text-light/95 text-xs sm:text-[12.5px] font-bold-serif tracking-[0.16em] uppercase font-bold mb-4 md:mb-5">
              Menu
            </h3>
            <ul className="flex flex-col gap-2.5 sm:gap-3 text-gray-soft text-xs sm:text-[13px] font-bold-serif uppercase tracking-[0.08em] font-medium">
              {links.map((link) => (
                <AnimatedLink key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="hover:text-cream transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </AnimatedLink>
              ))}
            </ul>
          </div>

          {/* Socials Column */}
          <div>
            <h3 className="text-light/95 text-xs sm:text-[12.5px] font-bold-serif tracking-[0.16em] uppercase font-bold mb-4 md:mb-5">
              Socials
            </h3>
            <ul className="flex flex-col gap-2.5 sm:gap-3 text-gray-soft text-xs sm:text-[13px] font-bold-serif uppercase tracking-[0.08em] font-medium">
              {socialList.map((s, idx) => (
                <AnimatedLink key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} profile (opens in a new tab)`}
                    className="group inline-flex items-center gap-2.5 hover:text-cream transition-colors duration-200"
                  >
                    <span
                      className={`text-accent/90 inline-flex items-center justify-center social-float-${idx} transition-transform duration-300 group-hover:scale-110`}
                    >
                      {getSocialIcon(s.label)}
                    </span>
                    <span>{s.label}</span>
                  </a>
                </AnimatedLink>
              ))}
            </ul>
          </div>

          {/* Email & Local Time */}
          <div className="col-span-2 md:col-span-1 mt-2 md:mt-0 flex flex-col justify-between">
            <div>
              <h3 className="text-light/95 text-xs sm:text-[12.5px] font-bold-serif tracking-[0.16em] uppercase font-bold mb-2 md:mb-3">
                Email
              </h3>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-1.5 font-italic-serif text-[0.66rem] min-[375px]:text-[0.72rem] min-[430px]:text-[0.78rem] md:text-[0.85rem] text-gray-soft hover:text-cream transition-all duration-200 tracking-wide"
                aria-label={`Send email to ${site.email}`}
              >
                <span className="relative border-b border-white/20 group-hover:border-accent transition-colors duration-200 whitespace-nowrap overflow-hidden text-ellipsis">
                  {site.email}
                </span>
                <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-accent text-[0.72rem]">
                  <span className="group-hover:hidden">→</span>
                  <span className="hidden group-hover:inline">↗</span>
                </span>
              </a>
            </div>

            <div className="mt-6 md:mt-auto pt-4">
              <h4 className="text-light/80 text-[11px] sm:text-xs font-bold-serif tracking-[0.16em] uppercase font-semibold mb-1.5">
                Local Time
              </h4>
              <p className="text-cream text-xs sm:text-sm font-bold-serif font-medium tracking-wide tabular-nums">
                {isMounted && currentTime ? `${currentTime} ${site.timeZoneLabel}` : 'Loading local time...'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-6 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-gray-soft/60 text-[11px] font-bold-serif tracking-wide">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <Magnetic strength={0.4}>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-elevated-dark border border-border-subtler flex items-center justify-center text-gray-soft hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 group focus:outline-none cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
