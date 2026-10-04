'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';
import { Layers, Sparkles, Server, Palette, Users } from 'lucide-react';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
  icon: 'layers' | 'sparkles' | 'server' | 'palette' | 'users';
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: '01',
    number: '01',
    title: 'Full-Stack Development',
    description:
      'Build responsive and scalable web applications using modern frontend and backend technologies, from interactive interfaces to production-ready APIs and databases.',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB'],
    icon: 'layers',
  },
  {
    id: '02',
    number: '02',
    title: 'AI-Powered Applications',
    description:
      'Build practical AI-powered applications by integrating modern AI capabilities, intelligent workflows, LLM-based features and automation into real-world products.',
    technologies: ['Generative AI', 'LLM Applications', 'AI Integration', 'Prompt Engineering', 'AI Automation'],
    icon: 'sparkles',
  },
  {
    id: '03',
    number: '03',
    title: 'Backend & API Engineering',
    description:
      'Design reliable backend systems, REST APIs, authentication flows and database architectures focused on clean structure, security and scalability.',
    technologies: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'MongoDB', 'Mongoose', 'Firebase'],
    icon: 'server',
  },
  {
    id: '04',
    number: '04',
    title: 'Modern UI & Product Development',
    description:
      'Turn ideas into polished digital products with responsive interfaces, smooth interactions, thoughtful UX and performance-focused frontend engineering.',
    technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Responsive Design'],
    icon: 'palette',
  },
  {
    id: '05',
    number: '05',
    title: 'Open Source & Developer Community',
    description:
      'Contribute to open-source projects and developer communities through collaboration, code contributions, issue solving, documentation and knowledge sharing.',
    technologies: ['Git', 'GitHub', 'Open Source', 'Code Review', 'Collaboration', 'Community Building'],
    icon: 'users',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('.service-row');
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: (index % 3) * 0.08,
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              once: true,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  const headingWords = [
    { t: 'What' },
    { t: 'I', serif: true },
    { t: 'Do' },
  ];

  const descriptionText =
    'Building modern, scalable, and impactful digital experiences through clean engineering, intuitive UI, and intelligent systems.';

  return (
    <section
      id="services"
      ref={sectionRef}
      className="min-h-screen bg-ink text-light pt-24 pb-16 md:pt-32 md:pb-24 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-20">
          <div className="mb-3">
            <span className="font-bold-serif text-xs uppercase tracking-[0.2em] text-accent font-semibold inline-block">
              (What I Do)
            </span>
          </div>

          <AnimatedHeading
            words={headingWords}
            className="text-[clamp(1.8rem,3.8vw,3.8rem)] tracking-[-0.025em] mb-4 text-light"
          />

          <div className="grid md:grid-cols-12 gap-4 md:gap-8 pt-1">
            <div className="md:col-start-6 md:col-span-7">
              <ScrollWordReveal
                text={descriptionText}
                offset={['start 0.95', 'end 0.65']}
                className="max-w-2xl text-sm sm:text-base md:text-[1.05rem] text-gray-soft/90 font-italic-serif leading-[1.7] font-normal"
              />
            </div>
          </div>
        </div>

        <div className="relative divide-y divide-border-subtle border-b border-border-subtle">
          {SERVICES_DATA.map((item) => (
            <article
              key={item.id}
              className="service-row group py-8 sm:py-10 md:py-12 transition-colors duration-300 hover:bg-white/[0.015] px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-2xl"
            >
              <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                {/* Left Column: Number, Icon, Title */}
                <div className="md:col-span-5 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold-serif text-xs uppercase tracking-[0.2em] text-accent font-bold tabular-nums">
                      {item.number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                    <div className="text-warm-light group-hover:text-accent transition-colors duration-300">
                      {item.icon === 'layers' && <Layers className="w-4 h-4" aria-hidden="true" />}
                      {item.icon === 'sparkles' && <Sparkles className="w-4 h-4" aria-hidden="true" />}
                      {item.icon === 'server' && <Server className="w-4 h-4" aria-hidden="true" />}
                      {item.icon === 'palette' && <Palette className="w-4 h-4" aria-hidden="true" />}
                      {item.icon === 'users' && <Users className="w-4 h-4" aria-hidden="true" />}
                    </div>
                  </div>

                  <h3 className="font-bold-serif text-light font-bold text-xl sm:text-2xl md:text-[1.65rem] leading-[1.2] tracking-[-0.015em] group-hover:text-cream transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                {/* Right Column: Description and Tech Pills */}
                <div className="md:col-span-7 flex flex-col gap-5 md:pt-1">
                  <p className="font-italic-serif text-sm sm:text-[15px] md:text-base leading-[1.75] text-gray-soft font-normal">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-bold-serif text-[11px] sm:text-xs text-warm-light px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 hover:border-accent/40 hover:text-white transition-all duration-200 tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;