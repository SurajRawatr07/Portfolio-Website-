'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const allSections = servicesRef.current.filter(Boolean);
      const pinOffset = 50;

      allSections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: `top ${pinOffset + index * 100}px`,
          endTrigger: allSections[allSections.length - 1],
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingWords = [
    { t: 'WHAT' },
    { t: 'i', serif: true },
    { t: 'DO' },
  ];

  const descriptionText =
    'I build modern, production-ready web applications that combine thoughtful UI, powerful backend systems, and reliable performance — from idea to deployment.';

  const services = [
    {
      id: '01',
      title: 'Full-Stack Development',
      description:
        'Building complete, production-ready web applications with scalable architecture, seamless APIs, secure authentication, and modern user experiences.',
      items: [
        'MERN Stack — MongoDB, Express.js, React, Node.js',
        'REST APIs, Authentication & Authorization',
        'Scalable Architecture & Database Integration',
      ],
    },
    {
      id: '02',
      title: 'Frontend Development',
      description:
        'Creating responsive, interactive, and visually polished interfaces focused on usability, accessibility, performance, and smooth user experiences across every device.',
      items: [
        'React, Next.js, TypeScript & Tailwind CSS',
        'GSAP Animations & Interactive Experiences',
        'Responsive UI & Figma to Production',
      ],
    },
    {
      id: '03',
      title: 'Performance & Deployment',
      description:
        'Optimizing applications for speed, SEO, scalability, and maintainability while preparing them for reliable production deployment.',
      items: [
        'Performance Optimization & Code Refactoring',
        'SEO, Accessibility & Web Best Practices',
        'Deployment with Vercel, AWS & Docker',
      ],
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="min-h-screen bg-ink text-light pt-24 pb-16 md:pt-32 md:pb-20 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-20">
          <AnimatedHeading
            words={headingWords}
            className="text-[clamp(1.8rem,3.8vw,3.8rem)] tracking-[-0.025em] mb-4"
          />

          <div className="grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-start-6 md:col-span-7 flex flex-col md:flex-row gap-3 md:gap-10">
              <span className="font-bold-serif text-xs uppercase tracking-[0.2em] text-accent font-semibold whitespace-nowrap inline-block">
                (Services)
              </span>

              <ScrollWordReveal
                text={descriptionText}
                offset={['start 0.95', 'end 0.65']}
                className="max-w-2xl text-sm sm:text-base md:text-[1.05rem] text-gray-soft/90 font-italic-serif leading-[1.7] font-normal"
              />
            </div>
          </div>
        </div>

        <div className="relative pb-8 md:pb-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                servicesRef.current[index] = el;
              }}
              className="bg-ink pb-10 md:pb-16"
              style={{ zIndex: index + 1 }}
            >
              <div className="grid md:grid-cols-12 gap-4 items-center py-4 md:py-6 border-t border-border-subtle">
                <h3
                  className="font-bold-serif md:col-span-9 md:col-start-2 text-light font-bold text-xl sm:text-2xl md:text-3xl lg:text-[2.6rem] leading-[1.08] tracking-[-0.02em]"
                  style={{ transform: 'translateY(-0.05em)' }}
                >
                  {service.title}
                </h3>
              </div>

              <div className="grid md:grid-cols-12 gap-4 md:gap-8 pt-3 md:pt-5">
                <div className="md:col-span-7 md:col-start-6 space-y-4 md:space-y-5">
                  <ScrollWordReveal
                    text={service.description}
                    offset={['start 0.95', 'end 0.7']}
                    className="text-gray-soft/90 text-sm sm:text-[15px] md:text-[1rem] leading-[1.7] font-serif font-normal"
                  />

                  <div className="divide-y divide-border-subtle">
                    {service.items.map((item, i) => (
                      <div
                        key={i}
                        className="py-3 flex items-center gap-3 md:gap-4"
                      >
                        <span className="text-accent text-xs sm:text-sm font-bold-serif tabular-nums tracking-wider font-semibold">
                          0{i + 1}
                        </span>

                        <span className="text-sm sm:text-[15px] md:text-base font-serif text-light/95 tracking-normal">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;