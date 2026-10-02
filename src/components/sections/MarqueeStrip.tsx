'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { hasFinePointer } from '@/lib/pointer';
import { useReducedMotion } from '@/lib/useReducedMotion';

export default function MarqueeStrip() {
  const track1Ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const items = ['Available for Work', 'Open to Opportunities', "Let's Build", 'MERN Stack'];

  useEffect(() => {
    if (reduced) return;
    const track = track1Ref.current;
    if (!track) return;

    let totalWidth = track.scrollWidth;
    let halfWidth = totalWidth / 2;

    const handleResize = () => {
      if (track) {
        totalWidth = track.scrollWidth;
        halfWidth = totalWidth / 2;
      }
    };
    window.addEventListener('resize', handleResize);

    const finePointer = hasFinePointer();

    let x = 0;
    const baseSpeed = 0.85;
    let currentVelocity = 0;
    let targetVelocity = 0;
    let currentSkew = 0;

    const onTick = () => {
      const dt = gsap.ticker.deltaRatio(60);
      currentVelocity += (targetVelocity - currentVelocity) * (1 - Math.pow(1 - 0.08, dt));
      targetVelocity *= Math.pow(0.93, dt);
      x -= (baseSpeed + currentVelocity) * dt;

      if (halfWidth > 0) {
        if (x <= -halfWidth) {
          x += halfWidth;
        } else if (x > 0) {
          x -= halfWidth;
        }
      }

      const targetSkew = finePointer ? gsap.utils.clamp(-6, 6, currentVelocity * 0.45) : 0;
      currentSkew += (targetSkew - currentSkew) * (1 - Math.pow(1 - 0.1, dt));

      if (track) {
        if (finePointer && Math.abs(currentSkew) > 0.01) {
          track.style.transform = `translate3d(${x}px, 0, 0) skewX(${currentSkew}deg)`;
        } else {
          track.style.transform = `translate3d(${x}px, 0, 0)`;
        }
      }
    };

    gsap.ticker.add(onTick);

    const onScrollUpdate = (vel: number) => {
      const sign = vel >= 0 ? 1 : -1;
      const absV = Math.abs(vel);

      if (absV > 5) {
        const frameBoost = sign * Math.min(18, Math.pow(absV, 0.72) * 0.14);
        targetVelocity = frameBoost;
      }
    };

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        onScrollUpdate(self.getVelocity());
      },
    });

    const attachLenis = () => {
      const lenis = (window as any).__lenis;
      if (lenis) {
        const handleLenis = ({ velocity }: { velocity: number }) => {
          if (Math.abs(velocity) > 0.02) {
            onScrollUpdate(velocity * 80);
          }
        };
        lenis.on('scroll', handleLenis);
        return () => lenis.off('scroll', handleLenis);
      }
      return null;
    };

    let cleanupLenis = attachLenis();
    const poll = setInterval(() => {
      if (!cleanupLenis && (window as any).__lenis) {
        cleanupLenis = attachLenis();
        clearInterval(poll);
      }
    }, 100);

    return () => {
      clearInterval(poll);
      if (cleanupLenis) cleanupLenis();
      trigger.kill();
      gsap.ticker.remove(onTick);
      window.removeEventListener('resize', handleResize);
      if (track) {
        track.style.transform = '';
      }
    };
  }, [reduced]);

  return (
    <div
      className="w-full relative z-20 overflow-hidden select-none border-t border-b border-border-dark"
      aria-hidden="true"
    >
      <div className="overflow-hidden bg-cream py-3">
        <div
          ref={track1Ref}
          className="inline-flex items-center gap-0 whitespace-nowrap"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6 pr-6">
              {items.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span className="font-mono text-[13px] uppercase tracking-[0.15em] text-warm font-medium">
                    {item}
                  </span>
                  <span className="text-accent text-[10px]">◆</span>
                </React.Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
