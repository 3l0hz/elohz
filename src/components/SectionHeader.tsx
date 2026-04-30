"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
  className?: string;
}

export function SectionHeader({ badge, title, description, className }: SectionHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("flex flex-col md:flex-row md:items-end justify-between gap-6 relative pl-8 overflow-hidden", className)}>
      {/* Animated Vertical Line - Fill effect */}
      <div 
        className={cn(
          "absolute left-0 top-0 bottom-0 w-[3px] md:w-1 bg-accent origin-top transition-transform duration-[850ms] cubic-bezier(0.16, 1, 0.3, 1) motion-reduce:transition-none",
          isVisible ? "scale-y-100" : "scale-y-0"
        )} 
      />
      
      <div className="space-y-3">
        {/* Badge - Soft Fade */}
        <div className={cn(
          "transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        )}>
          <Badge className="bg-accent/10 text-accent border-accent/20 font-black text-[9px] tracking-[0.2em] px-3 uppercase pointer-events-none">
            {badge}
          </Badge>
        </div>

        {/* Title - Reveal & Move */}
        <h2 
          className={cn(
            "text-4xl md:text-5xl font-black tracking-tighter uppercase transition-all duration-[750ms] delay-[150ms] ease-out motion-reduce:transition-none",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
        >
          {title}
        </h2>
      </div>

      {/* Description - Delayed Fade */}
      <p 
        className={cn(
          "text-muted-foreground font-medium text-sm md:text-base max-w-xs transition-opacity duration-1000 delay-[450ms] ease-out motion-reduce:transition-none",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {description}
      </p>
    </div>
  );
}
