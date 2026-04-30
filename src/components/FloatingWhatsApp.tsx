"use client"

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.123.553 4.197 1.603 6.04L0 24l6.117-1.605a11.803 11.803 0 005.925 1.597h.005c6.632 0 12.028-5.391 12.031-12.031a11.777 11.777 0 00-3.522-8.497" />
  </svg>
);

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(true);
      } 
      else if (currentScrollY < lastScrollY) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const defaultMessage = encodeURIComponent("Hola, necesito asesoría sobre productos elohz.");

  return (
    <a 
      href={`https://wa.me/56940628182?text=${defaultMessage}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-8 right-8 z-50 flex items-center justify-center group transition-all duration-500 ease-out",
        "bg-white text-black h-[54px] md:h-[58px] min-w-[54px] md:min-w-[58px] rounded-full",
        "shadow-[0_12px_40px_rgba(0,0,0,0.35)] border border-white/20",
        "lg:hover:shadow-[0_0_28px_rgba(255,255,255,0.18)] lg:hover:scale-105 active:scale-95",
        isVisible 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 translate-y-[20px] pointer-events-none"
      )}
    >
      <div className="flex items-center px-4 md:px-5">
        <WhatsAppIcon className="w-6 h-6 flex-shrink-0" />
        <span className={cn(
          "max-w-0 opacity-0 overflow-hidden whitespace-nowrap font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ease-out",
          "lg:group-hover:max-w-[200px] lg:group-hover:opacity-100 lg:group-hover:ml-3"
        )}>
          Asesoría elohz
        </span>
      </div>
    </a>
  );
}
