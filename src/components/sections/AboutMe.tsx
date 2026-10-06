'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import FlowField from '@/components/canvas/FlowField';
import { FaGithub, FaLinkedinIn, FaExternalLinkAlt } from 'react-icons/fa';

interface ExperienceItem {
  id: string;
  number: string;
  title: string;
  period?: string;
  institution?: {
    name: string;
    url: string;
  };
  organization?: {
    name: string;
    url?: string;
    accent?: boolean;
  };
  description: string;
  responsibilities: string[];
  tech: string[];
  socialLinks?: Array<{
    name: string;
    url: string;
    icon: 'github' | 'linkedin';
  }>;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: '01-bca-cs',
    number: '01',
    title: 'BCA — Computer Science',
    institution: {
      name: 'Graphic Era Hill University, Haldwani Campus',
      url: 'https://gehu.ac.in/',
    },
    period: '2024–2027',
    description:
      'Pursuing BCA (8.0/10 CGPA) with focus on data structures, algorithms, databases, and full-stack software development.',
    responsibilities: [
      'Data Structures & Algorithms in C++ & Java',
      'Database Design, SQL & Schema Modeling',
      'Full-Stack Web Development & APIs',
      'Core Computer Science Fundamentals',
    ],
    tech: ['C++', 'Java', 'Python', 'SQL', 'DBMS', 'Web Development'],
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
    period: '2024–Present',
    description:
      'Founded and lead a developer community hosting technical workshops, hackathon mentorship, and collaborative coding sessions.',
    responsibilities: [
      'Community Leadership & Workshop Organization',
      'Hackathon Mentorship & Project Strategy',
      'Collaborative Git Workflows & Code Reviews',
      'Developer Networking & Peer Learning',
    ],
    tech: ['Community Building', 'Git', 'GitHub', 'Event Organization', 'Mentorship'],
  },
  {
    id: '03-full-stack-developer',
    number: '03',
    title: 'Full-Stack Developer',
    organization: {
      name: 'Independent Projects & Development',
    },
    period: '2024–Present',
    description:
      'Building production-ready web applications with Next.js, React, Node.js, and MongoDB featuring secure authentication and REST APIs.',
    responsibilities: [
      'Full-Stack Web Architecture & State Management',
      'RESTful API Engineering & Authentication',
      'Responsive UI & Performance Optimization',
      'Database Modeling with MongoDB & SQL',
    ],
    tech: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB'],
    socialLinks: [
      {
        name: 'GitHub',
        url: 'https://github.com/SurajRawatr07',
        icon: 'github',
      },
    ],
  },
  {
    id: '04-freelance-developer',
    number: '04',
    title: 'Freelance Full-Stack Developer',
    organization: {
      name: 'Freelance',
    },
    period: '2024–Present',
    description:
      'Delivering tailored web solutions for clients, focusing on responsive interfaces, performant backends, and cloud deployment.',
    responsibilities: [
      'Client Requirements & Technical Scoping',
      'Frontend & Backend Architecture',
      'REST API Integration & Authentication',
      'Deployment & Cloud Hosting Management',
    ],
    tech: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Firebase'],
  },
  {
    id: '05-open-source-contributor',
    number: '05',
    title: 'Open Source Contributor',
    organization: {
      name: 'Open Source Community',
    },
    period: '2024–Present',
    description:
      'Contributing to open-source software by shipping features, resolving issues, and collaborating through pull request reviews.',
    responsibilities: [
      'Feature Implementation & Bug Fixes',
      'Pull Request Reviews & Git Collaboration',
      'Code Quality & Technical Documentation',
      'Active Open-Source Community Engagement',
    ],
    tech: ['Git', 'GitHub', 'React.js', 'JavaScript', 'TypeScript', 'Node.js'],
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
  {
    id: '06-web-dev-intern',
    number: '06',
    title: 'Web Development Intern',
    organization: {
      name: 'CodeAlpha • Cognifyz Technologies • Oasis Infobyte • SyntecxHub',
    },
    period: '2024–2026',
    description:
      'Completed virtual web development internships building responsive web interfaces, API integrations, and team Git workflows.',
    responsibilities: [
      'Responsive Frontend Component Development',
      'REST API Integration & State Handling',
      'Cross-Browser Compatibility & Performance',
      'Version Control via Git & GitHub',
    ],
    tech: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'Node.js', 'Tailwind CSS'],
  },
  {
    id: '07-hackathons-achievements',
    number: '07',
    title: 'Hackathons & Technical Competitions',
    organization: {
      name: 'National & Community Hackathons',
    },
    period: '2024–Present',
    description:
      'Participating in hackathons to rapidly prototype full-stack MVPs, solve real-world problems, and deliver under tight deadlines.',
    responsibilities: [
      'Rapid Full-Stack MVP Prototyping',
      'API Integration & Real-Time Features',
      'Time-Constrained Problem Solving',
      'Team Collaboration & Technical Pitches',
    ],
    tech: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'Git'],
  },
];

const About = () => {
  const reduced = useReducedMotion();

  const headingWords = [
    { t: 'WHO' },
    { t: 'am', serif: true },
    { t: 'i?' },
  ];

  const descriptionText =
    'Full-stack developer focused on modern web engineering, clean architecture, and product development.';

  const aboutMeText = `Full-stack engineer building fast, scalable web applications with React, Next.js, TypeScript, and Node.js. Focused on clean architecture, responsive interfaces, and reliable REST APIs.

Founder of Tech Circle and active open-source contributor. Dedicated to shipping user-focused products, exploring AI workflows, and collaborating on high-velocity projects.`;

  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

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

      // Slide-by-slide Experience Animation with Reduced Motion Check
      if (reduced) {
        gsap.set('.experience-card', { opacity: 1, y: 0, x: 0, scale: 1 });
        gsap.set('.timeline-dot', { opacity: 1, scale: 1 });
        const timelineLine = tableRef.current?.querySelector('.timeline-line');
        if (timelineLine) gsap.set(timelineLine, { opacity: 1, scaleY: 1 });
      } else {
        // Initial state: subtle translateY(35px), scale(0.98), subtle translateX(4px), opacity 0
        gsap.set('.experience-card', {
          opacity: 0,
          y: 35,
          x: 4,
          scale: 0.98,
          transformOrigin: 'top left',
        });
        gsap.set('.timeline-dot', {
          opacity: 0,
          scale: 0.7,
        });

        // Individual slide reveal with sequential micro-stagger as cards enter the viewport
        ScrollTrigger.batch('.experience-item', {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => {
            const cards = batch
              .map((item) => item.querySelector('.experience-card'))
              .filter(Boolean);
            const dots = batch
              .map((item) => item.querySelector('.timeline-dot'))
              .filter(Boolean);

            gsap.to(cards, {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              duration: 0.75,
              ease: 'power3.out',
              stagger: 0.12,
              overwrite: 'auto',
            });

            gsap.to(dots, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'power3.out',
              stagger: 0.12,
              delay: 0.05,
              overwrite: 'auto',
            });
          },
        });

        const timelineLine = tableRef.current?.querySelector('.timeline-line');
        if (timelineLine) {
          gsap.fromTo(
            timelineLine,
            { opacity: 0, scaleY: 0.6, transformOrigin: 'top center' },
            {
              opacity: 1,
              scaleY: 1,
              duration: 0.95,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: tableRef.current,
                start: 'top 88%',
                once: true,
              },
            },
          );
        }
      }

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

      const expHeading = tableRef.current?.querySelector('.experience-heading');
      if (expHeading) {
        gsap.fromTo(
          expHeading,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tableRef.current,
              start: 'top 85%',
              once: true,
            },
          },
        );
      }
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <div className="bg-cream">
      <section
        ref={sectionRef}
        id="about"
        className="min-h-screen bg-ink text-light pt-16 pb-14 md:pt-24 md:pb-20 rounded-t-4xl overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="mb-8 md:mb-14">
            <AnimatedHeading
              words={headingWords}
              className="text-[clamp(1.65rem,3.2vw,2.75rem)] tracking-[-0.02em] mb-3.5"
            />
            <ScrollWordReveal
              text={descriptionText}
              offset={['start 0.95', 'end 0.7']}
              className="text-sm sm:text-base md:text-[1rem] text-gray-soft/90 font-italic-serif leading-[1.65] max-w-2xl font-normal"
            />
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8 pb-12 md:pb-16 items-center">
            <div className="col-span-12 md:col-span-5 lg:col-span-5 flex items-center justify-center">
              <div className="about-image-wrapper relative group w-full max-w-[350px] md:max-w-[380px] h-[340px] md:h-[440px] bg-elevated-dark rounded-2xl overflow-hidden border border-border-subtler shadow-2xl">
                <FlowField />
              </div>
            </div>

            <div className="col-span-12 md:col-span-7 lg:col-span-6 md:col-start-6 lg:col-start-7 flex flex-col justify-center space-y-5">
              <span className="about-label font-bold-serif text-xs uppercase tracking-[0.2em] text-accent text-center md:text-left inline-block">
                (About Me)
              </span>
              <div className="space-y-4">
                {aboutMeText.split('\n\n').map((p, i) => (
                  <ScrollWordReveal
                    key={i}
                    text={p}
                    offset={['start 0.92', 'end 0.65']}
                    className="text-sm sm:text-base md:text-[0.98rem] leading-[1.65] font-serif text-light/85 font-normal"
                  />
                ))}
              </div>
            </div>
          </div>

          <div ref={tableRef} className="pt-10 md:pt-14 border-t border-white/10">
            <div className="mb-6 text-center md:mb-10">
              <span className="cred-section-label font-bold-serif text-xs uppercase tracking-[0.2em] text-accent inline-block opacity-0">
                (Experience)
              </span>
              <h3 className="experience-heading mt-2.5 font-bold-serif text-[clamp(1.5rem,2.8vw,2.25rem)] tracking-[-0.02em] leading-tight text-light max-w-2xl mx-auto">
                <span className="inline-block">
                  My <span className="font-bold-italic text-accent">Professional</span>
                </span>{' '}
                <span className="inline-block">Experience</span>
              </h3>
            </div>

            {/* Experience Timeline */}
            <div className="relative max-w-3xl mx-auto pl-7 sm:pl-9 md:pl-11">
              {/* Subtle Left-Side Continuous Timeline Track */}
              <div
                aria-hidden="true"
                className="timeline-line absolute left-[11px] sm:left-[13px] md:left-[15px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-accent/50 via-white/15 to-white/5 pointer-events-none origin-top"
              />

              <div className="space-y-6 sm:space-y-8">
                {EXPERIENCES.map((item) => (
                  <div
                    key={item.id}
                    className="experience-item relative group"
                  >
                    {/* Timeline Node Dot */}
                    <div
                      aria-hidden="true"
                      className="timeline-dot absolute -left-[23px] sm:-left-[26px] md:-left-[32px] top-5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-ink border-2 border-accent/70 group-hover:border-accent group-hover:scale-110 transition-transform duration-300 shadow-[0_0_8px_rgba(196,93,62,0.4)] flex items-center justify-center z-10"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>

                    {/* Experience Card */}
                    <div className="experience-card rounded-2xl p-4 sm:p-5 md:p-6 bg-surface-mid/85 border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm hover:border-accent/40 -translate-y-0.5 hover:shadow-2xl transition-all duration-300 ease-out">
                      {/* 1. ROLE / TITLE & 3. DATE */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-2">
                        <div className="min-w-0 pr-1">
                          <h4 className="font-bold-serif text-base sm:text-lg md:text-[1.25rem] tracking-[-0.015em] leading-snug text-cream break-words">
                            {item.title}
                          </h4>

                          {/* 2. COMPANY / CONTEXT */}
                          {item.institution && (
                            <div className="mt-1 flex items-center">
                              <a
                                href={item.institution.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${item.institution.name} website (opens in a new tab)`}
                                className="group/link inline-flex items-center gap-1.5 font-italic-serif text-xs sm:text-[13px] text-gray-soft hover:text-white transition-colors duration-200"
                              >
                                <span className="underline-offset-4 group-hover/link:underline">
                                  {item.institution.name}
                                </span>
                                <FaExternalLinkAlt
                                  className="w-2.5 h-2.5 text-accent/80 group-hover/link:text-accent transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 flex-shrink-0 ml-0.5"
                                  aria-hidden="true"
                                />
                              </a>
                            </div>
                          )}

                          {item.organization && (
                            <div className="mt-1 flex items-center">
                              {item.organization.url ? (
                                <a
                                  href={item.organization.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${item.organization.name} website (opens in a new tab)`}
                                  className={`group/link inline-flex items-center gap-1.5 font-italic-serif text-xs sm:text-[13px] transition-colors duration-200 ${
                                    item.organization.accent
                                      ? 'text-accent hover:text-accent-light font-medium'
                                      : 'text-gray-soft hover:text-white'
                                  }`}
                                >
                                  <span className="underline-offset-4 group-hover/link:underline">
                                    {item.organization.name}
                                  </span>
                                  <FaExternalLinkAlt
                                    className="w-2.5 h-2.5 text-accent/80 group-hover/link:text-accent transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 flex-shrink-0 ml-0.5"
                                    aria-hidden="true"
                                  />
                                </a>
                              ) : (
                                <p className="font-italic-serif text-xs sm:text-[13px] text-gray-soft">
                                  {item.organization.name}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* 3. DATE: compact badge */}
                        {item.period && (
                          <span className="self-start sm:self-center font-bold-serif text-[10px] sm:text-[10.5px] uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 whitespace-nowrap mt-0.5 sm:mt-0 flex-shrink-0">
                            {item.period}
                          </span>
                        )}
                      </div>

                      {/* 4. DESCRIPTION: Maximum 1–2 short lines */}
                      <p className="font-italic-serif text-xs sm:text-[13px] leading-relaxed text-gray-soft/90 mt-2.5">
                        {item.description}
                      </p>

                      {/* 5. CORE RESPONSIBILITIES: 3–4 concise items */}
                      {item.responsibilities && item.responsibilities.length > 0 && (
                        <div className="mt-3.5 pt-2.5 border-t border-white/[0.08]">
                          <span className="font-bold-serif text-[10px] sm:text-[10.5px] uppercase tracking-[0.14em] text-accent font-bold block mb-1.5">
                            CORE RESPONSIBILITIES
                          </span>
                          <ul className="space-y-1.5 text-xs text-light/85 font-serif">
                            {item.responsibilities.slice(0, 4).map((resp, i) => (
                              <li
                                key={i}
                                className="grid grid-cols-[1fr_auto] items-center gap-2.5 py-0.5 border-b border-white/[0.03] last:border-b-0"
                              >
                                <span className="text-gray-soft/95 leading-normal text-[11.5px] sm:text-xs">
                                  {resp}
                                </span>
                                <span
                                  className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
                                  aria-hidden="true"
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 6. TECHNOLOGY STACK: compact pills */}
                      {item.tech && item.tech.length > 0 && (
                        <div className="mt-3.5 pt-2 flex flex-wrap gap-1.5">
                          {item.tech.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center px-2 py-0.5 text-[10px] sm:text-[10.5px] font-bold-serif rounded-full leading-normal bg-white/[0.04] border border-white/10 text-warm-light/90 hover:border-accent/40 hover:text-white transition-colors duration-200 select-none"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Social Links (if present) */}
                      {item.socialLinks && item.socialLinks.length > 0 && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {item.socialLinks.map((link) => (
                            <a
                              key={link.name}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Suraj Rawat's ${link.name} (opens in a new tab)`}
                              className="group/link inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-warm-light hover:text-white hover:border-accent/40 hover:bg-white/[0.08] transition-all duration-200 font-bold-serif text-xs tracking-wide"
                            >
                              {link.icon === 'github' && (
                                <FaGithub
                                  className="w-3 h-3 text-warm group-hover/link:text-accent transition-colors duration-200"
                                  aria-hidden="true"
                                />
                              )}
                              {link.icon === 'linkedin' && (
                                <FaLinkedinIn
                                  className="w-3 h-3 text-warm group-hover/link:text-accent transition-colors duration-200"
                                  aria-hidden="true"
                                />
                              )}
                              <span>{link.name}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About;
