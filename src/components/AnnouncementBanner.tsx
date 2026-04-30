
"use client"

import React, { useState, useEffect } from 'react';
import { Truck, Zap, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const announcements = [
    { text: "Envíos a todo Chile 🚚", icon: Truck },
    { text: "Stock limitado ⚡", icon: Zap },
    { text: "Consulta directa por WhatsApp", icon: MessageCircle },
  ];

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-[60] h-10 bg-[#111111]/80 backdrop-blur-md border-b border-white/5 transition-transform duration-500 ease-in-out flex items-center justify-center",
      !isVisible ? "-translate-y-full" : "translate-y-0"
    )}>
      <div className="flex gap-8 overflow-hidden whitespace-nowrap px-4 animate-in fade-in duration-1000">
        {announcements.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <item.icon className="w-3 h-3 text-accent" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
