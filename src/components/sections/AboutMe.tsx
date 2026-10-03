'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import FlowField from '@/components/canvas/FlowField';
import { FaGithub, FaLinkedinIn, FaExternalLinkAlt } from 'react-icons/fa';

interface ExperienceItem {
  id: string;
  number: string;
  title: string;
  institution?: {
    name: string;
    url: string;
  };
  organization?: {
    name: string;
    url?: string;
    accent?: boolean;
  };
  socialLinks?: Array<{
    name: string;
    url: string;
    icon: 'github' | 'linkedin';
  }>;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: '01-bca-final-year',
    number: '01',
    title: 'BCA Final Year',
    institution: {
      name: 'Graphic Era Hill University, Haldwani Campus',
      url: 'https://gehu.ac.in/',
    },
  },
  {
    id: '02-founder-community-lead',
    number: '02',
    title: 'Founder & Community Lead',
    organization: {
      name: 'Tech Circle',
      url: 'https://techcircle.vercel.app/',
      accent: true,
    },
  },
  {
    id: '03-full-stack-developer',
    number: '03',
    title: 'Full-Stack Developer',
    organization: {
      name: 'Independent Projects & Development',
    },
    socialLinks: [
      {
        name: 'GitHub',
        url: 'https://github.com/SurajRawatr07',
        icon: 'github',
      },
    ],
  },
  {
    id: '04-open-source-contributor',
    number: '04',
    title: 'Open Source Contributor',
    socialLinks: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/suraj-rawat-30513b340/',
        icon: 'linkedin',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/SurajRawatr07',
        icon: 'github',
      },
    ],
  },
];

const About = () => {
  const headingWords = [
    { t: 'WHO' },
    { t: 'am', serif: true },
    { t: 'i?' },
  ];


 const descriptionText =
  'I am a BCA student and Full-Stack Developer passionate about building clean, scalable, and impactful digital experiences.';

const aboutMeText = `I am a BCA student, Full-Stack Developer, and Freelancer specializing in the MERN Stack, React, Next.js, and TypeScript. I enjoy turning ideas into scalable, user-focused web applications.

I am also an Open-Source Contributor, Hackathon Participant, Campus Ambassador, and the Founder of Tech Circle — a developer community focused on learning, collaboration, and growth.

Beyond development, I actively participate in hackathons, contribute to open-source projects, and build communities while continuously exploring new technologies and real-world opportunities.`;

  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.about-image-wrapper',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-image-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '.about-label',
        { opacity: 0, letterSpacing: '0.45em' },
        {
          opacity: 1,
          letterSpacing: '0.3em',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-label',
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      const rows = gsap.utils.toArray<HTMLElement>('.cred-row');
      rows.forEach((row, i) => {
        const side = row.dataset.side === 'left' ? -1 : 1;
        const dot = row.querySelector('.timeline-dot');
        const connector = row.querySelector('.timeline-connector');
        const content = row.querySelector('.timeline-content');
        gsap.fromTo(
          row,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            delay: i * 0.07,
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              once: true,
            },
          },
        );
        if (content) {
          gsap.fromTo(
            content,
            { x: side * 42, y: 18 },
            {
              x: 0,
              y: 0,
              duration: 0.8,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 87%',
                once: true,
              },
            },
          );
        }
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.45,
              ease: 'back.out(2.5)',
              delay: 0.18,
              scrollTrigger: {
                trigger: row,
                start: 'top 87%',
                once: true,
              },
            },
          );
        }
        if (connector) {
          gsap.fromTo(
            connector,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.55,
              delay: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 87%',
                once: true,
              },
            },
          );
        }
      });

      gsap.fromTo(
        '.cred-section-label',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 92%',
            once: true,
          },
        },
      );

      const experienceWords = gsap.utils.toArray<HTMLElement>('.experience-word > span');
      if (experienceWords.length) {
        gsap.fromTo(
          experienceWords,
          { yPercent: 120, rotate: 3 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: tableRef.current,
              start: 'top 82%',
              once: true,
            },
          },
        );
      }

      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 75%',
            once: true,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <div className="bg-cream">
      <section
        ref={sectionRef}
        id="about"
        className="min-h-screen bg-ink text-light pt-24 pb-20 md:pt-32 md:pb-28 rounded-t-4xl overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="mb-10 md:mb-20">
            <AnimatedHeading
              words={headingWords}
              className="text-[clamp(1.8rem,3.8vw,3.8rem)] tracking-[-0.025em] mb-4"
            />
            <ScrollWordReveal
              text={descriptionText}
              offset={['start 0.95', 'end 0.7']}
              className="text-sm sm:text-base md:text-[1.05rem] text-gray-soft/90 font-italic-serif leading-[1.7] max-w-2xl font-normal"
            />
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8 pb-16 md:pb-24 items-center">
            <div className="col-span-12 md:col-span-5 lg:col-span-5 flex items-center justify-center">
              <div className="about-image-wrapper relative group w-full max-w-[350px] md:max-w-[380px] h-[360px] md:h-[480px] bg-elevated-dark rounded-2xl overflow-hidden border border-border-subtler shadow-2xl">
                <FlowField />
              </div>
            </div>

            <div className="col-span-12 md:col-span-7 lg:col-span-6 md:col-start-6 lg:col-start-7 flex flex-col justify-center space-y-6">
              <span className="about-label font-bold-serif text-xs uppercase tracking-[0.2em] text-accent text-center md:text-left inline-block">
                (About Me)
              </span>
              <div className="space-y-5">
                {aboutMeText.split('\n\n').map((p, i) => (
                  <ScrollWordReveal
                    key={i}
                    text={p}
                    offset={['start 0.92', 'end 0.65']}
                    className="text-sm sm:text-base md:text-[1rem] leading-[1.7] font-serif text-light/85 font-normal"
                  />
                ))}
              </div>
            </div>
          </div>

          <div ref={tableRef} className="pt-12 md:pt-20 border-t border-white/10">
            <div className="mb-10 text-center md:mb-16">
              <span className="cred-section-label font-bold-serif text-xs uppercase tracking-[0.2em] text-accent inline-block opacity-0">
                (Experience)
              </span>
              <h3 className="mt-3 font-bold-serif text-[clamp(1.65rem,3.2vw,2.75rem)] tracking-[-0.02em] leading-[1.08] text-light">
                <span className="experience-word inline-block overflow-hidden align-top">
                  <span className="block font-bold-serif">My</span>
                </span>{' '}
                <span className="experience-word inline-block overflow-hidden align-top">
                  <span className="font-bold-italic block tracking-[-0.015em] text-accent px-1">Professional</span>
                </span>{' '}
                <span className="experience-word inline-block overflow-hidden align-top">
                  <span className="block font-bold-serif">Experience</span>
                </span>
              </h3>
            </div>

            <div className="relative mx-auto max-w-6xl">
              <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-white/15 md:hidden" />
              <svg aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 hidden h-full w-16 -translate-x-1/2 md:block" viewBox="0 0 64 800" preserveAspectRatio="none">
                <path
                  ref={pathRef}
                  d="M32 0 C24 80 40 120 32 200 C24 280 40 320 32 400 C24 480 40 520 32 600 C24 680 40 720 32 800"
                  fill="none"
                  stroke="rgba(232, 228, 222, 0.28)"
                  strokeWidth="1.5"
                />
              </svg>
              <div className="flex flex-col gap-10 md:gap-16">
                {EXPERIENCES.map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <article
                      key={item.id}
                      data-side={isLeft ? 'left' : 'right'}
                      className="cred-row group relative grid grid-cols-[32px_1fr] gap-x-5 opacity-0 md:grid-cols-[1fr_96px_1fr] md:gap-x-0"
                    >
                      <div className="relative order-1 md:col-start-2 md:row-start-1 md:justify-self-center">
                        <span className="timeline-dot relative z-10 block h-[15px] w-[15px] rounded-full border-[3px] border-ink bg-cream group-hover:scale-110 group-hover:bg-accent transition-all duration-300" />
                        <span
                          aria-hidden="true"
                          className={`timeline-connector absolute top-[7px] hidden h-px w-14 bg-white/25 md:block ${
                            isLeft ? 'right-full origin-right' : 'left-full origin-left'
                          }`}
                        />
                        <span
                          className={`hidden md:block absolute top-7 whitespace-nowrap font-bold-serif text-xs uppercase tracking-[0.16em] text-accent/90 tabular-nums font-bold ${
                            isLeft ? 'right-7 text-right' : 'left-7'
                          }`}
                        >
                          {item.number}
                        </span>
                      </div>

                      <div
                        className={`timeline-content order-2 pt-0 md:row-start-1 ${
                          isLeft ? 'md:col-start-1 md:pr-14 md:text-right' : 'md:col-start-3 md:pl-14'
                        }`}
                      >
                        <div
                          className={`flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 ${
                            isLeft ? 'md:justify-end' : 'md:justify-start'
                          }`}
                        >
                          <span className="md:hidden font-bold-serif text-[11px] uppercase tracking-[0.16em] text-accent tabular-nums font-bold">
                            {item.number}
                          </span>
                        </div>

                        <h4 className="font-bold-serif text-[clamp(1.2rem,2.2vw,1.85rem)] tracking-[-0.015em] leading-[1.15] text-cream">
                          {item.title}
                        </h4>

                        {item.institution && (
                          <div
                            className={`mt-3 sm:mt-3.5 border-t border-white/10 pt-3 sm:pt-3.5 flex flex-wrap items-center ${
                              isLeft ? 'md:justify-end' : 'md:justify-start'
                            }`}
                          >
                            <a
                              href={item.institution.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${item.institution.name} official website (opens in a new tab)`}
                              className="group/link inline-flex items-center gap-1.5 font-italic-serif text-xs sm:text-[13.5px] leading-relaxed text-gray-soft hover:text-white transition-colors duration-200"
                            >
                              <span className="underline-offset-4 group-hover/link:underline">
                                {item.institution.name}
                              </span>
                              <FaExternalLinkAlt
                                className="w-2.5 h-2.5 text-gray-mid group-hover/link:text-accent transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 flex-shrink-0"
                                aria-hidden="true"
                              />
                            </a>
                          </div>
                        )}

                        {item.organization && (
                          <div
                            className={`mt-3 sm:mt-3.5 border-t border-white/10 pt-3 sm:pt-3.5 flex flex-col gap-2.5 ${
                              isLeft ? 'md:items-end' : 'md:items-start'
                            }`}
                          >
                            {item.organization.url ? (
                              <a
                                href={item.organization.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${item.organization.name} website (opens in a new tab)`}
                                className={`group/link inline-flex items-center gap-1.5 font-italic-serif text-xs sm:text-[13.5px] leading-relaxed transition-colors duration-200 ${
                                  item.organization.accent
                                    ? 'text-accent hover:text-accent-light font-medium'
                                    : 'text-gray-soft hover:text-white'
                                }`}
                              >
                                <span className="underline-offset-4 group-hover/link:underline">
                                  {item.organization.name}
                                </span>
                                <FaExternalLinkAlt
                                  className={`w-2.5 h-2.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 flex-shrink-0 ${
                                    item.organization.accent
                                      ? 'text-accent/80 group-hover/link:text-accent-light'
                                      : 'text-gray-mid group-hover/link:text-accent'
                                  }`}
                                  aria-hidden="true"
                                />
                              </a>
                            ) : (
                              <p className="font-italic-serif text-xs sm:text-[13.5px] leading-relaxed text-gray-soft">
                                {item.organization.name}
                              </p>
                            )}

                            {item.socialLinks && (
                              <div
                                className={`flex flex-wrap items-center gap-2.5 ${
                                  isLeft ? 'md:justify-end' : 'md:justify-start'
                                }`}
                              >
                                {item.socialLinks.map((link) => (
                                  <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Suraj Rawat's ${link.name} profile (opens in a new tab)`}
                                    className="group/link inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-warm-light hover:text-white hover:border-accent/40 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 font-bold-serif text-xs tracking-wide focus-visible:outline-2 focus-visible:outline-accent"
                                  >
                                    {link.icon === 'github' && (
                                      <FaGithub
                                        className="w-3.5 h-3.5 text-warm group-hover/link:text-accent transition-colors duration-200"
                                        aria-hidden="true"
                                      />
                                    )}
                                    {link.icon === 'linkedin' && (
                                      <FaLinkedinIn
                                        className="w-3.5 h-3.5 text-warm group-hover/link:text-accent transition-colors duration-200"
                                        aria-hidden="true"
                                      />
                                    )}
                                    <span>{link.name}</span>
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {!item.organization && item.socialLinks && (
                          <div
                            className={`mt-3 sm:mt-3.5 border-t border-white/10 pt-3 sm:pt-3.5 flex flex-wrap items-center gap-2.5 ${
                              isLeft ? 'md:justify-end' : 'md:justify-start'
                            }`}
                          >
                            {item.socialLinks.map((link) => (
                              <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Suraj Rawat's ${link.name} profile (opens in a new tab)`}
                                className="group/link inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-warm-light hover:text-white hover:border-accent/40 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 font-bold-serif text-xs tracking-wide focus-visible:outline-2 focus-visible:outline-accent"
                              >
                                {link.icon === 'github' && (
                                  <FaGithub
                                    className="w-3.5 h-3.5 text-warm group-hover/link:text-accent transition-colors duration-200"
                                    aria-hidden="true"
                                  />
                                )}
                                {link.icon === 'linkedin' && (
                                  <FaLinkedinIn
                                    className="w-3.5 h-3.5 text-warm group-hover/link:text-accent transition-colors duration-200"
                                    aria-hidden="true"
                                  />
                                )}
                                <span>{link.name}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About;
