'use client';

import React, { useState, useEffect, useRef } from 'react';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { gsap, useGSAP } from '@/lib/gsap';
import { EASE } from '@/lib/motion';
import { site } from '@/lib/site';
import { useReducedMotion } from '@/lib/useReducedMotion';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const headingWords = [
    { t: "Let's" },
    { t: 'Build', serif: true },
    { t: 'Something' },
  ];

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  useEffect(() => {
    if (copiedToast) {
      const timer = setTimeout(() => setCopiedToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedToast]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setErrors({});
            setSubmitStatus(null);
          }
        });
      },
      { threshold: 0, rootMargin: '0px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (reduced) return;
      const card = cardRef.current;
      const cta = ctaRef.current;

      if (card) {
        gsap.fromTo(
          card,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: EASE.outCubic,
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          }
        );
      }
      if (cta) {
        gsap.fromTo(
          cta,
          { x: 48, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: EASE.outCubic,
            scrollTrigger: { trigger: cta, start: 'top 94%', once: true },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateMessage = (text: string) => {
    const trimmed = text.trim();
    if (trimmed.length < 30) return false;
    const words = trimmed.split(/\s+/).filter(Boolean);
    return words.length >= 5;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (!validateMessage(formData.message))
      newErrors.message = 'Please enter a meaningful message (at least 30 characters, 5 words)';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitStatus('success');
        setSuccessMessage(data.message || 'Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        if (data?.error) {
          setErrors({ server: data.error });
        }
      }
    } catch {
      clearTimeout(timeoutId);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isSubmitting;

  return (
    <section ref={sectionRef} id="contact" className="bg-ink text-light pt-12 pb-16 md:pt-14 md:pb-24 relative overflow-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 w-full">
        <div
          ref={cardRef}
          className="rounded-3xl bg-surface text-light p-8 sm:p-12 md:p-16 lg:p-20 border border-elevated-dark"
        >
          <p className="font-bold-serif text-xs uppercase tracking-[0.2em] text-accent mb-2.5 font-bold">
            (Contact)
          </p>
          <AnimatedHeading
            words={headingWords}
            className="text-[clamp(1.8rem,3.8vw,3.8rem)] tracking-[-0.025em] mb-4 text-light"
          />
          <div className="max-w-2xl mb-8">
            <ScrollWordReveal
              text="Open to internships, collaborations and development opportunities."
              offset={['start 0.95', 'end 0.7']}
              className="text-sm sm:text-base md:text-[1.05rem] text-gray-soft/90 font-italic-serif leading-[1.7] font-normal"
            />
            <div className="mt-4 flex items-center">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-1.5 font-italic-serif text-[0.66rem] min-[375px]:text-[0.72rem] min-[430px]:text-[0.78rem] md:text-[0.85rem] text-cream/90 hover:text-cream tracking-wide transition-all duration-200"
                style={{ textDecoration: 'none' }}
                aria-label={`Send email to ${site.email}`}
              >
                <span className="relative border-b border-accent/40 group-hover:border-accent transition-colors duration-200 whitespace-nowrap overflow-hidden text-ellipsis max-w-[280px] sm:max-w-none">
                  {site.email}
                </span>
                <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[0.72rem] text-accent">
                  <span className="group-hover:hidden">→</span>
                  <span className="hidden group-hover:inline">↗</span>
                </span>
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-2xl space-y-6 p-6 sm:p-8 rounded-2xl mx-auto bg-surface-mid border border-white/[0.04]"
          >

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-bold-serif text-xs uppercase tracking-[0.12em] font-semibold text-muted">
                Your Name <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`w-full px-4 py-3 text-sm sm:text-base border rounded-xl bg-surface text-cream placeholder-[#6a6a68] focus:outline-none transition-all duration-300 border-white/[0.08] focus:border-accent focus:ring-1 focus:ring-accent/30 font-serif ${
                  errors.name ? 'border-red-500 focus:border-red-500' : ''
                }`}
                disabled={isDisabled}
              />
              {errors.name && <p id="name-error" className="text-red-400 text-xs sm:text-sm font-serif">{errors.name}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold-serif text-xs uppercase tracking-[0.12em] font-semibold text-muted">
                Your Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full px-4 py-3 text-sm sm:text-base border rounded-xl bg-surface text-cream placeholder-[#6a6a68] focus:outline-none transition-all duration-300 border-white/[0.08] focus:border-accent focus:ring-1 focus:ring-accent/30 font-serif ${
                  errors.email ? 'border-red-500 focus:border-red-500' : ''
                }`}
                disabled={isDisabled}
              />
              {errors.email && <p id="email-error" className="text-red-400 text-xs sm:text-sm font-serif">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-bold-serif text-xs uppercase tracking-[0.12em] font-semibold text-muted">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`w-full px-4 py-3 text-sm sm:text-base border rounded-xl bg-surface text-cream placeholder-[#6a6a68] resize-none focus:outline-none transition-all duration-300 border-white/[0.08] focus:border-accent focus:ring-1 focus:ring-accent/30 font-serif ${
                  errors.message ? 'border-red-500 focus:border-red-500' : ''
                }`}
                disabled={isDisabled}
              />
              {errors.message && <p id="message-error" className="text-red-400 text-xs sm:text-sm font-serif">{errors.message}</p>}
              <p className="text-xs font-bold-serif text-gray-soft tracking-wider tabular-nums">{formData.message.length} / 30 minimum characters</p>
            </div>

            <div role="status" aria-live="polite">
              {errors.server && (
                <div className="p-4 bg-red-900/20 border border-red-600/40 rounded-xl mb-4">
                  <p className="text-red-400 text-sm font-serif">{errors.server}</p>
                </div>
              )}

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-900/20 border border-green-600/40 rounded-xl mb-4">
                  <p className="text-green-400 text-sm font-bold-italic">{successMessage}</p>
                </div>
              )}

              {submitStatus === 'error' && !errors.server && (
                <div className="p-4 bg-red-900/20 border border-red-600/40 rounded-xl mb-4">
                  <p className="text-red-400 text-sm font-serif">Something went wrong. Please try again later.</p>
                </div>
              )}
            </div>

            <div className="w-full flex justify-center md:justify-start">
              <button
                type="submit"
                disabled={isDisabled}
                className="inline-block border-0 bg-transparent p-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AnimatedButton
                  topText={isDisabled ? 'PLEASE WAIT...' : 'SEND MESSAGE'}
                  bottomText={isDisabled ? 'PROCESSING' : 'PROCEED →'}
                  variant="primary"
                  as="span"
                  className={isDisabled ? 'pointer-events-none' : ''}
                />
              </button>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-elevated-dark flex flex-col sm:flex-row items-center justify-between gap-5 w-full">
            <div ref={ctaRef} className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="font-bold-serif text-xs uppercase tracking-[0.16em] text-muted mb-1 font-bold">
                DIRECT INQUIRIES
              </span>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-1.5 font-italic-serif text-[0.72rem] min-[430px]:text-[0.78rem] md:text-[0.88rem] text-cream hover:text-accent transition-all duration-200 tracking-wide"
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

            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border-subtle bg-surface-mid hover:bg-elevated hover:text-accent hover:border-accent/40 text-gray-soft font-bold-serif text-xs uppercase tracking-[0.12em] transition-all duration-200"
              >
                <span>Email</span>
                <span className="text-[11px] text-accent">↗</span>
              </a>
              <a
                href="https://www.linkedin.com/in/suraj-rawat-30513b340/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suraj Rawat on LinkedIn"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border-subtle bg-surface-mid hover:bg-elevated hover:text-accent hover:border-accent/40 text-gray-soft font-bold-serif text-xs uppercase tracking-[0.12em] transition-all duration-200"
              >
                <span>LinkedIn</span>
                <span className="text-[11px] text-accent">↗</span>
              </a>
              <button
                type="button"
                aria-label={`Copy ${site.email} to clipboard`}
                onClick={() => {
                  navigator.clipboard.writeText(site.email);
                  setCopiedToast(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-surface-mid hover:bg-elevated hover:text-accent hover:border-accent/40 text-gray-soft font-bold-serif text-xs uppercase tracking-[0.12em] transition-all duration-200 cursor-pointer"
              >
                <span>Copy Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-8 right-8 z-[9998] pointer-events-none transition-all duration-300 ${
          copiedToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        style={{
          background: '#34D399',
          color: '#0A0F0D',
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '0.75rem 1.25rem',
          borderRadius: '9999px',
        }}
      >
        ✓ Copied to clipboard
      </div>
    </section>
  );
};

export default Contact;
