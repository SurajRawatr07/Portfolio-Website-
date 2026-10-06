'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Link } from 'next-transition-router';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { EASE } from '@/lib/motion';
import { ArrowUp, Github, ExternalLink } from 'lucide-react';
import { Project } from '@/lib/projects';
import { getAdjacentProjects } from '@/lib/projects';
import { site } from '@/lib/site';

export default function ProjectDetails({ project }: { project: Project }) {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { prev, next } = getAdjacentProjects(project.slug);

  useGSAP(
    () => {
      if (!titleRef.current) return;

      const split = SplitText.create(titleRef.current.querySelector('.pd-title-text'), {
        type: 'lines',
        mask: 'lines',
      });
      gsap.fromTo(
        split.lines,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1,
          ease: EASE.outQuart,
          stagger: 0.08,
          delay: 0.15,
        }
      );

      gsap.utils.toArray<HTMLElement>('.pd-figure-parallax').forEach((wrap) => {
        const inner = wrap.querySelector('.pd-figure-inner');
        if (!inner) return;
        gsap.fromTo(
          inner,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      return () => split.revert();
    },
    { scope: rootRef, dependencies: [project.slug] }
  );

  const scrollToTop = () => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section ref={rootRef} className="min-h-screen bg-surface-base text-white px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-20 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-10 md:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors duration-200 group"
          >
            <span className="text-base sm:text-lg transform group-hover:-translate-x-1 transition-transform duration-200">
              ←
            </span>
            <span className="font-bold-serif text-xs uppercase tracking-[0.14em] font-semibold">Back to Projects</span>
          </Link>
        </div>

        <header className="mb-8 sm:mb-12 md:mb-14">
          <h1
            ref={titleRef}
            aria-label={project.title}
            className="font-bold-serif uppercase tracking-[-0.02em] leading-[1.05] text-[clamp(1.65rem,3.4vw,2.75rem)] mb-4 text-balance"
          >
            <span aria-hidden="true" className="pd-title-text block">
              {project.title}
            </span>
          </h1>

          {(project.liveUrl || project.github) && (
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              {project.liveUrl && (
                <AnimatedButton
                  as="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  topText={
                    <span className="flex items-center gap-2">
                      <span>LIVE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  }
                  bottomText={
                    <span className="flex items-center gap-2">
                      <span>DEMO ↗</span>
                    </span>
                  }
                  variant="primary"
                />
              )}
              {project.github && (
                <AnimatedButton
                  as="a"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  topText={
                    <span className="flex items-center gap-2">
                      <Github className="w-3.5 h-3.5" />
                      <span>CODE</span>
                    </span>
                  }
                  bottomText={
                    <span className="flex items-center gap-2">
                      <Github className="w-3.5 h-3.5" />
                      <span>GITHUB ↗</span>
                    </span>
                  }
                  variant="dark"
                  className="!border !border-white/15 hover:!border-white/40"
                />
              )}
            </div>
          )}
        </header>

        {project.images && project.images.length > 0 && (
          <div className="mb-10 sm:mb-14 md:mb-20">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden bg-surface-card border border-surface-border shadow-2xl">
              <div className="pd-figure-parallax absolute inset-0 overflow-hidden">
                <div className="pd-figure-inner absolute inset-x-0 -top-[8%] h-[116%]" style={{ willChange: 'transform' }}>
                  <Image
                    src={project.images[0]}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:grid md:grid-cols-12 gap-2 sm:gap-3 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          <div className="md:col-span-4">
            <p className="font-bold-serif text-xs uppercase tracking-[0.2em] text-accent font-semibold">(Overview)</p>
          </div>
          <div className="md:col-span-8">
            <ScrollWordReveal
              text={project.overview}
              offset={['start 0.98', 'end 0.85']}
              className="text-sm sm:text-base md:text-[1.05rem] text-light/95 font-serif leading-[1.7] font-normal"
            />
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-12 gap-2 sm:gap-3 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          <div className="md:col-span-4">
            <p className="font-bold-serif text-xs uppercase tracking-[0.2em] text-accent font-semibold">(Architecture)</p>
          </div>
          <div className="md:col-span-8">
            <ScrollWordReveal
              text={project.architecture}
              offset={['start 0.98', 'end 0.88']}
              className="text-sm sm:text-base md:text-[1rem] text-light/85 font-serif leading-[1.7] font-normal"
            />
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-12 gap-2 sm:gap-3 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          <div className="md:col-span-4">
            <p className="font-bold-serif text-xs uppercase tracking-[0.2em] text-accent font-semibold">(Engineering)</p>
          </div>
          <div className="md:col-span-8">
            <ScrollWordReveal
              text={project.implementation}
              offset={['start 0.98', 'end 0.88']}
              className="text-sm sm:text-base md:text-[1rem] text-light/85 font-serif leading-[1.7] font-normal"
            />
          </div>
        </div>

        <div className="mb-12 sm:mb-14 md:mb-20">
          <AnimatedHeading
            words={[{ t: 'KEY' }, { t: 'moves', serif: true }]}
            showLine={false}
            containerClassName="mb-5 sm:mb-8"
            className="text-[clamp(1.6rem,3.5vw,2.6rem)] tracking-[-0.025em] text-white"
          />
          <ul className="divide-y divide-white/[0.06] border-t border-b border-white/[0.06]">
            {project.myRole.map((role, i) => (
              <li key={i} className="py-3.5 sm:py-4 flex items-start gap-3 sm:gap-5 group">
                <span className="font-bold-serif text-xs text-accent mt-0.5 shrink-0 w-6 sm:w-8 font-semibold tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <ScrollWordReveal
                  text={role}
                  offset={['start 0.99', 'end 0.92']}
                  className="text-xs sm:text-sm text-light/85 font-serif leading-relaxed flex-1 group-hover:text-light transition-colors duration-300 font-normal"
                />
              </li>
            ))}
          </ul>
        </div>

        {project.images && project.images.length > 1 && (
          <div className="flex flex-col gap-6 sm:gap-10 md:gap-16 mb-14 sm:mb-18 md:mb-24">
            <div className="mb-1">
              <p className="font-bold-serif text-xs uppercase tracking-[0.16em] text-warm-light font-semibold">Gallery</p>
            </div>
            {project.images.slice(1).map((img, i) => {
              const actualIdx = i + 1;
              const wide = actualIdx % 3 === 0;
              return (
                <figure
                  key={`${project.slug}-img-${actualIdx}`}
                  className={`relative ${wide ? 'w-full' : 'w-full md:w-10/12'} ${
                    actualIdx % 3 === 1 ? 'md:ml-auto' : ''
                  }`}
                >
                  <div
                    className={`overflow-hidden rounded-xl bg-surface-card border border-surface-border relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] ${
                      wide ? 'max-h-[500px]' : 'max-h-[420px]'
                    } w-full`}
                  >
                    <div className="pd-figure-parallax absolute inset-0 overflow-hidden">
                      <div className="pd-figure-inner absolute inset-x-0 -top-[8%] h-[116%]" style={{ willChange: 'transform' }}>
                        <Image
                          src={img}
                          alt={`${project.title} screenshot ${actualIdx + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 1100px"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                  <figcaption className="mt-2.5 flex items-center justify-between font-bold-serif text-[10px] sm:text-[11px] uppercase tracking-widest text-muted">
                    <span>{project.title}</span>
                    <span>
                      {String(actualIdx + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        )}

        <div className="mb-10 sm:mb-12 md:mb-16">
          <p className="font-bold-serif text-xs uppercase tracking-[0.16em] text-warm-light mb-3 sm:mb-4 font-semibold">Built with</p>
          <div className="flex flex-wrap gap-2">
            {project.tech?.map((t) => (
              <span
                key={t}
                className="font-bold-serif text-xs px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-surface-mid border border-white/[0.08] text-cream"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {(project.liveUrl || project.github) && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-5 sm:p-7 rounded-2xl bg-surface-card border border-white/[0.08] mb-12 sm:mb-14 md:mb-18">
            <div>
              <p className="font-bold-serif font-bold text-base sm:text-xl text-white mb-1">
                Explore this project
              </p>
              <p className="font-serif text-xs sm:text-sm text-muted">
                Inspect the live deployment or browse the repository code.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              {project.liveUrl && (
                <AnimatedButton
                  as="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  topText={
                    <span className="flex items-center gap-2">
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  }
                  bottomText={
                    <span className="flex items-center gap-2">
                      <span>LAUNCH ↗</span>
                    </span>
                  }
                  variant="primary"
                />
              )}
              {project.github && (
                <AnimatedButton
                  as="a"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  topText={
                    <span className="flex items-center gap-2">
                      <Github className="w-3.5 h-3.5" />
                      <span>SOURCE CODE</span>
                    </span>
                  }
                  bottomText={
                    <span className="flex items-center gap-2">
                      <Github className="w-3.5 h-3.5" />
                      <span>GITHUB ↗</span>
                    </span>
                  }
                  variant="dark"
                  className="!border !border-white/15 hover:!border-white/40"
                />
              )}
            </div>
          </div>
        )}

        <nav aria-label="Project navigation" className="grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.08] mb-10 sm:mb-14">
          {prev && (
            <Link
              href={`/projects/${prev.slug}`}
              className="group py-5 sm:py-8 md:py-12 md:pr-8 border-b md:border-b-0 md:border-r border-white/[0.08] no-underline"
            >
              <p className="font-bold-serif text-[11px] uppercase tracking-[0.16em] text-muted mb-2 sm:mb-2.5 flex items-center gap-2 font-semibold">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">←</span>
                Previous
              </p>
              <p className="font-bold-serif uppercase tracking-[-0.025em] leading-tight text-[clamp(1.15rem,2.5vw,2rem)] text-light/65 group-hover:text-accent transition-colors duration-400 font-bold">
                {prev.title}
              </p>
            </Link>
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className={`group py-5 sm:py-8 md:py-12 md:pl-8 no-underline text-right items-end ${
                prev ? '' : 'md:col-span-2'
              }`}
            >
              <p className="font-bold-serif text-[11px] uppercase tracking-[0.16em] text-muted mb-2 sm:mb-2.5 flex items-center justify-end gap-2 font-semibold">
                Next
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </p>
              <p className="font-bold-serif uppercase tracking-[-0.025em] leading-tight text-[clamp(1.15rem,2.5vw,2rem)] text-light/65 group-hover:text-accent transition-colors duration-400 font-bold">
                {next.title}
              </p>
            </Link>
          )}
        </nav>

        <div className="relative flex justify-center py-6 sm:py-8">
          <div className="text-center flex flex-col items-center">
            <ScrollWordReveal
              text="Have a project in mind?"
              offset={['start 0.98', 'end 0.88']}
              className="text-muted text-xs sm:text-sm font-italic-serif justify-center mb-1.5"
            />
            <p className="text-muted text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-bold-serif mb-1 font-bold">
              EMAIL
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-1.5 font-italic-serif text-[0.66rem] min-[375px]:text-[0.72rem] min-[430px]:text-[0.78rem] md:text-[0.85rem] text-[#bab6b3] hover:text-cream transition-all duration-200 tracking-wide"
              aria-label={`Send email to ${site.email}`}
            >
              <span className="border-b border-white/20 group-hover:border-accent transition-colors duration-200 whitespace-nowrap overflow-hidden text-ellipsis">
                {site.email}
              </span>
              <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-accent text-[0.72rem]">
                <span className="group-hover:hidden">→</span>
                <span className="hidden group-hover:inline">↗</span>
              </span>
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="absolute right-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-elevated-dark border border-border-subtler flex items-center justify-center text-muted hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 group focus:outline-none"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
