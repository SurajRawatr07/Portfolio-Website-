'use client';

import React, { useState, useEffect, useRef } from 'react';
import AnimatedLink from '@/components/ui/AnimateLink';
import Magnetic from '@/components/ui/Magnetic';
import { FaArrowUp } from 'react-icons/fa';
import { useHandleLinkClick } from '@/lib/navigation';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import { site, socialList, navLinks } from '@/lib/site';
import Lenis from 'lenis';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const lenisRef = useLenis() as React.RefObject<Lenis | null> | null;
  const lenis = lenisRef?.current;

  useEffect(() => {
    setIsMounted(true);
    let interval: NodeJS.Timeout | number | undefined;

    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true, timeZone: site.timeZone,
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
          if (interval) { clearInterval(interval); interval = undefined; }
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
    <footer ref={footerRef} className="relative z-30 bg-ink border-t border-border-subtle px-6 sm:px-8 md:px-12 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-12">
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

          <div>
            <h3 className="text-light/95 text-xs sm:text-[12.5px] font-bold-serif tracking-[0.16em] uppercase font-bold mb-4 md:mb-5">
              Socials
            </h3>
            <ul className="flex flex-col gap-2.5 sm:gap-3 text-gray-soft text-xs sm:text-[13px] font-bold-serif uppercase tracking-[0.08em] font-medium">
              {socialList.map((s) => (
                <AnimatedLink key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors duration-200">
                    {s.label}
                  </a>
                </AnimatedLink>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 mt-6 md:mt-0">
            <h3 className="text-light/95 text-xs sm:text-[12.5px] font-bold-serif tracking-[0.16em] uppercase font-bold mb-2 md:mb-5">
              Local Time
            </h3>
            <p className="text-cream text-xs sm:text-sm font-bold-serif font-medium tracking-wide tabular-nums">
              {isMounted && currentTime ? `${currentTime} ${site.timeZoneLabel}` : 'Loading local time...'}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Magnetic strength={0.4}>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-elevated-dark border border-border-subtler flex items-center justify-center text-gray-soft hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 group focus:outline-none"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
