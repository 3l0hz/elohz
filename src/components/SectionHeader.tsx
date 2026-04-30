"use client"

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
  className?: string;
}

export function SectionHeader({ badge, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-6 relative pl-8 overflow-hidden", className)}>
      {/* Static Vertical Line - Thinner for premium feel */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" />
      
      <div className="space-y-3">
        {/* Badge */}
        <div>
          <Badge className="bg-accent/10 text-accent border-accent/20 font-black text-[9px] tracking-[0.2em] px-3 uppercase pointer-events-none">
            {badge}
          </Badge>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
          {title}
        </h2>
      </div>

      {/* Description */}
      <p className="text-muted-foreground font-medium text-sm md:text-base max-w-xs">
        {description}
      </p>
    </div>
  );
}
