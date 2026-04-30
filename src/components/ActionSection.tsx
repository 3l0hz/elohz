
"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function ActionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseenter', () => setIsHovering(true));
      section.addEventListener('mouseleave', () => setIsHovering(false));
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-6 border-y border-[#1F1F1F] overflow-hidden bg-[#0B0B0B]"
    >
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base Ambient Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.02] blur-[100px] rounded-full" />
        
        {/* Interactive Mouse Follow Glow (Desktop only) */}
        <div 
          className="absolute hidden lg:block w-[800px] h-[800px] rounded-full transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)`,
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: isHovering ? 1 : 0,
            willChange: 'left, top',
          }}
        />

        {/* Noise / Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-20 relative z-10">
        <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          <Badge className="bg-white text-black font-black text-[10px] tracking-widest uppercase">
            CONTENT CREATORS
          </Badge>
          <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase">
            Diseñado para la acción
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-lg">
            Somos especialistas en accesorios para cámaras deportivas. Si eres motociclista, deportista extremo, youtuber o una de las personas que graban contenido técnico, elohz tiene el gear que necesitas para capturar lo imposible.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button className="pill-button button-primary h-14 px-12 text-[10px] font-black uppercase tracking-widest">
              Ver Colección Pro
            </Button>
            <Button variant="outline" className="pill-button h-14 px-12 text-[10px] font-black uppercase tracking-widest border-white/20">
              Asesoría Técnica
            </Button>
          </div>
        </div>

        <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group animate-in fade-in slide-in-from-right-8 duration-1000">
          <Image 
            src={PlaceHolderImages.find(img => img.id === "hero-action-2")?.imageUrl || ""}
            alt="Action Creators"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
          
          {/* Subtle Inner Glow on Image Container */}
          <div className="absolute inset-0 border border-white/5 rounded-[3rem] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
