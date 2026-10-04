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
      'Pursuing BCA with 8.0/10 CGPA. Core focus: data structures, algorithms, database management, and modern full-stack software engineering.',
    responsibilities: [
      'Data Structures & Algorithms',
      'DBMS, SQL & Schema Modeling',
      'Full-Stack Software Engineering',
      'Academic Software Projects',
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
      'Founded and lead a developer community driving peer learning, hackathon mentorship, technical workshops, and collaborative open-source builds.',
    responsibilities: [
      'Community Leadership & Growth',
      'Technical Workshops & Hands-on Sessions',
      'Hackathon Mentorship & Project Strategy',
      'Collaborative Code Reviews & Git Workflows',
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
      'Architect production-ready full-stack applications with React, Next.js, Node.js, and MongoDB, integrating secure auth and REST APIs.',
    responsibilities: [
      'Full-Stack Architecture & State Management',
      'RESTful API Engineering & JWT Authentication',
      'Responsive UI & Performance Optimization',
      'MongoDB Schema Design & Data Modeling',
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
      'Deliver custom web applications for clients, implementing responsive user interfaces, backend APIs, and reliable cloud deployments.',
    responsibilities: [
      'Client Scoping & Technical Delivery',
      'Responsive Frontend & UX Architecture',
      'Secure Authentication & API Integration',
      'Cloud Deployment & Production Handover',
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
      'Contribute to open-source codebases by shipping features, fixing bugs, reviewing pull requests, and collaborating with global developers.',
    responsibilities: [
      'Repository Contributions & Feature Development',
      'Issue Resolution & Bug Fixes',
      'Code Reviews & PR Collaboration',
      'Documentation & Technical Writeups',
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
      'Built responsive web applications, integrated third-party REST APIs, optimized frontend rendering, and applied team Git workflows.',
    responsibilities: [
      'Frontend Component Engineering',
      'REST API Integration & State Handling',
      'UI Responsiveness & Performance Tuning',
      'Version Control & Branch Collaboration',
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
      'Competed in national and community hackathons, rapidly prototyping MVPs, architecting full-stack solutions, and collaborating under tight deadlines.',
    responsibilities: [
      'Rapid MVP Prototyping & Architecture',
      'Full-Stack Feature Implementation',
      'Problem Solving Under Time Constraints',
      'Cross-Functional Team Collaboration',
    ],
    tech: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'Git'],
  },
];

const About = () => {
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
                          isLeft ? 'md:col-start-1 md:pr-14 md:text-right' : 'md:col-start-3 md:pl-14 md:text-left'
                        }`}
                      >
                        <div className="rounded-2xl p-4 sm:p-5 md:p-6 bg-surface-mid/60 md:bg-transparent border border-white/[0.06] md:border-transparent transition-all duration-300">
                          {/* Number & Period */}
                          <div
                            className={`flex flex-wrap items-center gap-2 mb-2 ${
                              isLeft ? 'md:justify-end' : 'md:justify-start'
                            }`}
                          >
                            <span className="font-bold-serif text-xs uppercase tracking-[0.16em] text-accent tabular-nums font-bold">
                              {item.number}
                            </span>
                            {item.period && (
                              <>
                                <span className="text-white/20 select-none">•</span>
                                <span className="font-bold-serif text-[11px] uppercase tracking-wider text-warm-light/80">
                                  {item.period}
                                </span>
                              </>
                            )}
                          </div>

                          {/* Title */}
                          <h4 className="font-bold-serif text-lg sm:text-xl md:text-[1.65rem] tracking-[-0.015em] leading-[1.2] text-cream">
                            {item.title}
                          </h4>

                          {/* Institution or Organization Link */}
                          {item.institution && (
                            <div
                              className={`mt-2 flex flex-wrap items-center ${
                                isLeft ? 'md:justify-end' : 'md:justify-start'
                              }`}
                            >
                              <a
                                href={item.institution.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${item.institution.name} website (opens in a new tab)`}
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
                              className={`mt-2 flex flex-wrap items-center ${
                                isLeft ? 'md:justify-end' : 'md:justify-start'
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
                            </div>
                          )}

                          {/* Concise Description */}
                          <p className="font-italic-serif text-xs sm:text-[13.5px] leading-relaxed text-gray-soft/90 mt-2.5">
                            {item.description}
                          </p>

                          {/* Core Responsibilities Panel */}
                          {item.responsibilities && item.responsibilities.length > 0 && (
                            <div className="mt-3.5 pt-3 border-t border-white/[0.08]">
                              <span className="font-bold-serif text-[10.5px] sm:text-[11px] uppercase tracking-[0.14em] text-accent/90 font-bold block mb-1.5">
                                Core Responsibilities
                              </span>
                              <ul
                                className={`space-y-1 text-xs text-light/85 font-serif ${
                                  isLeft ? 'md:text-right' : 'md:text-left'
                                }`}
                              >
                                {item.responsibilities.map((resp, i) => (
                                  <li
                                    key={i}
                                    className={`flex items-start gap-2 ${
                                      isLeft ? 'md:flex-row-reverse' : 'md:flex-row'
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent/70 mt-1 flex-shrink-0" />
                                    <span className="text-gray-soft/95 leading-normal">{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tech Stack Pills */}
                          {item.tech && item.tech.length > 0 && (
                            <div
                              className={`mt-3.5 flex flex-wrap gap-1.5 ${
                                isLeft ? 'md:justify-end' : 'md:justify-start'
                              }`}
                            >
                              {item.tech.map((t) => (
                                <span
                                  key={t}
                                  className="font-bold-serif text-[10.5px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-warm-light hover:border-accent/40 hover:text-white transition-colors duration-200"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Social Links */}
                          {item.socialLinks && item.socialLinks.length > 0 && (
                            <div
                              className={`mt-3.5 flex flex-wrap items-center gap-2.5 ${
                                isLeft ? 'md:justify-end' : 'md:justify-start'
                              }`}
                            >
                              {item.socialLinks.map((link) => (
                                <a
                                  key={link.name}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Suraj Rawat's ${link.name} (opens in a new tab)`}
                                  className="group/link inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-warm-light hover:text-white hover:border-accent/40 hover:bg-white/[0.08] transition-all duration-300 font-bold-serif text-xs tracking-wide focus-visible:outline-2 focus-visible:outline-accent"
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
