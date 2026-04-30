
"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from '@/lib/catalog';
import { ProductDetailDialog } from '@/components/ProductDetailDialog';

export function ThreeDProductCard(product: Product) {
  const [showDetails, setShowDetails] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D & Reflection State (Desktop Focused)
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });

  const { name, price, categoryName, imageUrl, brand, badge } = product;
  const whatsappLink = `https://wa.me/56940628182?text=Hola,%20quisiera%20consultar%20por%20el%20producto:%20${encodeURIComponent(name)}`;

  // Short category logic for mobile
  const getShortCategory = (name: string) => {
    const map: Record<string, string> = {
      "Soportes Moto / Vehículo": "Moto / Vehículo",
      "Accesorios Cámara": "Cámara",
      "Soportes Smartphone": "Smartphone",
      "Accesorios Corporales": "POV",
      "Selfie Sticks": "Selfie",
      "Trípodes": "Trípode",
      "Adaptadores Casco": "Casco"
    };
    return map[name] || name;
  };

  // Scroll visibility observer (Apple style entrance)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth 3D rotation
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    
    // Dynamic shine reflection
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setShine({ x: shineX, y: shineY, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setShine(prev => ({ ...prev, opacity: 0 }));
    setIsActive(false);
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setIsActive(true);
    }
  };

  const handleTouchStart = () => {
    setIsActive(true);
  };

  const handleTouchEnd = () => {
    setIsActive(false);
  };

  return (
    <>
      <div 
        ref={cardRef}
        className={cn(
          "perspective-1000 transition-all duration-500 ease-out touch-none",
          isVisible 
            ? "opacity-100 translate-y-0 scale-100 blur-0" 
            : "opacity-0 translate-y-4 scale-[0.98] blur-sm"
        )}
      >
        <Card 
          className={cn(
            "group relative overflow-hidden bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] border cursor-pointer preserve-3d transition-all duration-300 ease-out",
            // Border: more defined in mobile for premium feel
            "border-white/[0.18] md:border-white/[0.08] md:hover:border-white/20",
            // Shadow/Glow: Replicating highlighted card look in mobile
            "shadow-[0_0_35px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.45)] md:shadow-2xl",
            isActive 
              ? "scale-[0.98] md:scale-[1.02] border-white/25 md:border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08),0_20px_70px_rgba(0,0,0,0.55)]" 
              : "scale-100"
          )}
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => setShowDetails(true)}
        >
          {/* Dynamic Reflection Layer (Desktop Only) */}
          <div 
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 hidden md:block"
            style={{
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.opacity}), transparent 50%)`,
            }}
          />

          {/* Mobile Premium Static/Active Glow Layer (Top-Center Illumination) */}
          <div 
            className={cn(
              "absolute inset-0 pointer-events-none z-30 transition-all duration-500 md:hidden",
              "bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.08),transparent_60%)]",
              isActive && "opacity-100 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.15),transparent_70%)]"
            )}
          />
          
          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none z-10" />
          
          <div className="p-3 md:p-6 flex flex-col h-full relative z-20">
            {/* Top Section: Badges and Brand */}
            <div className="flex flex-col gap-1.5 mb-1 md:mb-2 translate-z-10">
              <div className="flex justify-between items-start w-full">
                {badge ? (
                  <Badge className="bg-white text-black border-none font-black text-[7px] md:text-[8px] tracking-widest px-2 py-0.5 md:px-3 md:py-1.5 rounded-full uppercase whitespace-nowrap shadow-xl">
                    {badge}
                  </Badge>
                ) : <div className="h-4 md:hidden" />}
                {brand && brand !== 'Genérico' && (
                  <span className="text-[7px] md:text-[10px] font-black tracking-widest text-muted-foreground/60 uppercase ml-auto pt-0.5 truncate max-w-[50px] md:max-w-none text-right">
                    {brand}
                  </span>
                )}
              </div>
              
              <Badge 
                variant="outline" 
                className="border-white/10 text-muted-foreground font-bold uppercase text-[7px] md:text-[8px] tracking-widest px-2 py-0.5 md:px-3 md:py-1 bg-black/40 backdrop-blur-sm whitespace-nowrap w-fit"
              >
                <span className="md:hidden">{getShortCategory(categoryName)}</span>
                <span className="hidden md:inline">{categoryName}</span>
              </Badge>
            </div>

            {/* Image Container - Protagonist in Desktop and Mobile */}
            <div className="relative h-[180px] md:h-80 w-full flex items-center justify-center overflow-hidden translate-z-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,156,0.03)_0%,transparent_70%)] md:hidden" />
              
              <div className={cn(
                "relative w-40 h-40 md:w-64 md:h-64 transition-all duration-300 ease-out",
                isActive ? "scale-[1.03] md:scale-[1.05]" : "scale-100"
              )}>
                <Image 
                  src={imageUrl} 
                  alt={name}
                  fill
                  className={cn(
                    "object-contain transition-all duration-300",
                    isActive ? "drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)]" : "drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                  )}
                  sizes="(max-width: 768px) 160px, 256px"
                />
              </div>
            </div>

            {/* Info Section - Balanced Layout */}
            <div className="mt-1 md:mt-2 space-y-1 md:space-y-2 flex-grow translate-z-10">
              <h3 className="text-xs md:text-2xl font-black tracking-tight leading-tight uppercase line-clamp-2 text-white/90">
                {name}
              </h3>
              <p className="text-base md:text-2xl font-black text-white">{price}</p>
            </div>

            {/* Actions - Desktop and Mobile Optimized Buttons */}
            <div className="mt-3 md:mt-4 flex flex-col gap-2 translate-z-10">
              <Button 
                className="w-full pill-button button-primary h-11 md:h-12 text-[9px] md:text-[10px] uppercase tracking-widest font-black"
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
                  Consultar
                </a>
              </Button>
              <Button 
                variant="ghost"
                className="w-full pill-button h-10 md:h-11 text-[9px] md:text-[10px] uppercase tracking-widest font-black text-muted-foreground/60 hover:text-white hover:bg-white/5"
              >
                <Eye className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
                Detalles
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <ProductDetailDialog 
        product={product} 
        open={showDetails} 
        onOpenChange={setShowDetails} 
      />
    </>
  );
}
