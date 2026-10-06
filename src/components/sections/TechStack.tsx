'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  icon: string;
  level?: string;
  description?: string;
}

export interface StackCategory {
  id: string;
  title: string;
  label?: string;
  description?: string;
  technologies: TechItem[];
}

export const STACK_SECTIONS: StackCategory[] = [
  {
    id: 'frontend',
    title: 'FRONTEND',
    technologies: [
      { name: 'JavaScript', category: 'frontend', icon: '/Services/js.png' },
      { name: 'TypeScript', category: 'frontend', icon: '/Services/typescript.svg' },
      { name: 'React', category: 'frontend', icon: '/Services/react.png' },
      { name: 'Next.js', category: 'frontend', icon: '/Services/next.webp' },
      { name: 'Redux Toolkit', category: 'frontend', icon: '/Services/reduxtoolkit.svg' },
      { name: 'Tailwind CSS', category: 'frontend', icon: '/Services/tailwind.png' },
      { name: 'Bootstrap', category: 'frontend', icon: '/Services/bootstrap.svg' },
      { name: 'GSAP', category: 'frontend', icon: '/Services/gsap.png' },
    ],
  },
  {
    id: 'backend',
    title: 'BACKEND & REAL-TIME',
    technologies: [
      { name: 'Node.js', category: 'backend', icon: '/Services/node.png' },
      { name: 'Express.js', category: 'backend', icon: '/Services/express.png' },
      { name: 'Socket.io', category: 'backend', icon: '/Services/socketio.svg' },
      { name: 'Firebase', category: 'backend', icon: '/Services/firebase.svg' },
    ],
  },
  {
    id: 'database',
    title: 'DATABASE & ORM',
    technologies: [
      { name: 'MongoDB', category: 'database', icon: '/Services/mongodb.svg' },
      { name: 'Mongoose', category: 'database', icon: '/Services/mongoose.svg' },
      { name: 'MySQL', category: 'database', icon: '/Services/mysql.svg' },
    ],
  },
  {
    id: 'devops',
    title: 'DEVOPS & CLOUD',
    technologies: [
      { name: 'Docker', category: 'devops', icon: '/Services/docker.svg' },
      { name: 'GitHub Actions', category: 'devops', icon: '/Services/githubactions.svg' },
      { name: 'AWS', category: 'devops', icon: '/Services/aws.webp' },
      { name: 'Nginx', category: 'devops', icon: '/Services/nginx.svg' },
      { name: 'Linux', category: 'devops', icon: '/Services/linux.svg' },
    ],
  },
  {
    id: 'tools',
    title: 'AI, TESTING & TOOLS',
    technologies: [
      { name: 'Gemini AI', category: 'tools', icon: '/Services/geminiai.svg' },
      { name: 'Jest', category: 'tools', icon: '/Services/jest.svg' },
      { name: 'Zod', category: 'tools', icon: '/Services/zod.svg' },
      { name: 'Stripe', category: 'tools', icon: '/Services/stripe.svg' },
      { name: 'Cloudinary', category: 'tools', icon: '/Services/cloudinary.svg' },
      { name: 'Git', category: 'tools', icon: '/Services/git.png' },
      { name: 'Postman', category: 'tools', icon: '/Services/postman-icon.svg' },
      { name: 'Figma', category: 'tools', icon: '/Services/figma.png' },
    ],
  },
];

const TechStack = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const headingWords = [
    { t: 'MY' },
    { t: 'TECH' },
    { t: 'stack', serif: true },
  ];
  const descriptionText =
    'A selection of technologies I use to design, build, and deploy full-stack web applications.';

  const filterOptions = [
    { id: 'all', label: 'All Categories' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & Real-Time' },
    { id: 'database', label: 'Database & ORM' },
    { id: 'devops', label: 'DevOps & Cloud' },
    { id: 'tools', label: 'AI, Testing & Tools' },
  ];

  const visibleSections =
    activeFilter === 'all'
      ? STACK_SECTIONS
      : STACK_SECTIONS.filter((sec) => sec.id === activeFilter);

  useGSAP(
    () => {
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        const items = section.querySelectorAll('.tech-item');
        const title = titleRefs.current[index];

        if (title) {
          gsap.fromTo(
            title,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                end: 'top 70%',
                scrub: 0.5,
              },
            },
          );
        }

        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                end: 'top 70%',
                scrub: 0.5,
              },
            },
          );
        }
      });
    },
    { scope: containerRef, dependencies: [activeFilter] },
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        !window.matchMedia('(hover: hover)').matches)
    ) {
      return;
    }
    const img = e.currentTarget.querySelector('img');
    if (!img) return;
    gsap.to(img, { rotation: 360, scale: 1.1, duration: 0.6, ease: 'power2.out' });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        !window.matchMedia('(hover: hover)').matches)
    ) {
      return;
    }
    const img = e.currentTarget.querySelector('img');
    if (!img) return;
    gsap.to(img, { rotation: 0, scale: 1, duration: 0.5, ease: 'power2.inOut' });
  };

  return (
    <section
      ref={containerRef}
      id="tech-stack"
      className="bg-ink text-light pt-16 pb-14 md:pt-24 md:pb-20 rounded-b-4xl overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="mb-8 md:mb-12">
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

        <div className="mb-8 flex flex-wrap gap-1.5 sm:gap-2 items-center">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setActiveFilter(option.id)}
                className={`text-[11px] sm:text-xs font-bold-serif uppercase tracking-[0.08em] px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none ${
                  isActive
                    ? 'bg-cream text-ink border-cream font-bold shadow-md'
                    : 'bg-elevated-dark/60 text-gray-soft border-white/10 hover:border-accent/40 hover:text-cream font-medium'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {visibleSections.map((stack, index) => (
            <div
              key={stack.id}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6"
            >
              <div className="md:w-1/3">
                <h3
                  ref={(el) => {
                    titleRefs.current[index] = el;
                  }}
                  className="text-base sm:text-lg md:text-xl font-bold-serif text-accent uppercase tracking-[-0.015em] leading-tight"
                >
                  {stack.title}
                </h3>
                <span className="font-bold-serif text-[10.5px] sm:text-[11px] text-warm tracking-[0.16em] uppercase block mt-1 font-medium tabular-nums">
                  {stack.technologies.length} Technologies
                </span>
              </div>

              <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5 md:gap-3">
                {stack.technologies.map((tech, i) => (
                  <div
                    key={i}
                    className="tech-item flex items-center gap-2.5 p-2 sm:p-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:bg-elevated-dark/60 border border-white/[0.04] hover:border-accent/30 bg-surface/50"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center relative flex-shrink-0">
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[11px] sm:text-xs font-bold-serif text-cream/95 break-words tracking-tight">
                      {tech.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
