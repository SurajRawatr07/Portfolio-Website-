'use client';

import React from 'react';
import Magnetic from '@/components/ui/Magnetic';
import { ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { site, socials } from '@/lib/site';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import Lenis from 'lenis';

interface SocialLinkItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  hoverColor: string;
}

const FOOTER_SOCIALS: SocialLinkItem[] = [
  {
    name: 'GitHub',
    href: socials.github.href,
    icon: FaGithub,
    hoverColor: 'hover:text-cream hover:border-white/30',
  },
  {
    name: 'LinkedIn',
    href: socials.linkedin.href,
    icon: FaLinkedinIn,
    hoverColor: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40',
  },
  {
    name: 'LeetCode',
    href: socials.leetcode.href,
    icon: SiLeetcode,
    hoverColor: 'hover:text-[#FFA116] hover:border-[#FFA116]/40',
  },
  {
    name: 'Instagram',
    href: socials.instagram.href,
    icon: FaInstagram,
    hoverColor: 'hover:text-[#E4405F] hover:border-[#E4405F]/40',
  },
];

const Footer: React.FC = () => {
  const lenisRef = useLenis() as React.RefObject<Lenis | null> | null;
  const lenis = lenisRef?.current;

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-30 bg-ink border-t border-white/[0.08] py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* ONLY ONE Social Icon Row */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-5 sm:mb-6 select-none">
          {FOOTER_SOCIALS.map((item) => {
            const Icon = item.icon;
            return (
              <Magnetic key={item.name} strength={0.25}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.name} profile (opens in a new tab)`}
                  title={item.name}
                  className={`group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 text-gray-soft shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${item.hoverColor}`}
                >
                  <Icon
                    className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>
            );
          })}
        </div>

        {/* Small Secondary Contact Element: Email */}
        <div className="mb-4">
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-1.5 font-italic-serif text-xs sm:text-[13px] md:text-sm text-gray-soft/90 hover:text-cream transition-colors duration-200 tracking-wide"
            aria-label={`Send email to ${site.email}`}
          >
            <span className="relative border-b border-white/20 group-hover:border-accent transition-colors duration-200">
              {site.email}
            </span>
            <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-accent text-xs">
              ↗
            </span>
          </a>
        </div>

        {/* Copyright below the social row */}
        <p className="text-gray-soft/60 text-[11px] sm:text-xs font-bold-serif tracking-wider select-none">
          © 2026 Suraj Rawat
        </p>

        {/* Subtle Back To Top Button */}
        <div className="mt-5 sm:mt-6">
          <Magnetic strength={0.3}>
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-accent/40 text-gray-soft/70 hover:text-cream text-[11px] font-bold-serif uppercase tracking-wider transition-all duration-300 focus:outline-none cursor-pointer"
              aria-label="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-accent group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
