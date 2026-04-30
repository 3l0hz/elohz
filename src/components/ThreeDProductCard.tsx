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
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D & Reflection State
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

  // Scroll visibility observer
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
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotation calc (max 6deg)
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    
    // Shine calc
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setShine({ x: shineX, y: shineY, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setShine(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <>
      <div 
        ref={cardRef}
        className={cn(
          "perspective-1000 transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0 scale-100 blur-0" : "opacity-0 translate-y-6 scale-[0.96] blur-sm"
        )}
      >
        <Card 
          className={cn(
            "group relative overflow-hidden bg-[#111111] rounded-[2rem] border cursor-pointer preserve-3d transition-premium shadow-2xl",
            "border-white/[0.08] hover:border-white/20 active:scale-[0.98]"
          )}
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setShowDetails(true)}
        >
          {/* Dynamic Reflection Layer */}
          <div 
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.opacity}), transparent 50%)`,
            }}
          />
          
          {/* Internal Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none z-10" />
          
          <div className="p-4 md:p-8 flex flex-col h-full relative z-20">
            {/* Top Section: Badges and Brand */}
            <div className="flex flex-col gap-2 mb-4 md:mb-6 min-h-[64px] md:min-h-[80px] translate-z-10">
              <div className="flex justify-between items-start w-full">
                {badge && (
                  <Badge className="bg-white text-black border-none font-black text-[7px] md:text-[8px] tracking-widest px-2 py-1 md:px-3 md:py-1.5 rounded-full uppercase whitespace-nowrap shadow-xl">
                    {badge}
                  </Badge>
                )}
                {brand && brand !== 'Genérico' && (
                  <span className="text-[7px] md:text-[10px] font-black tracking-widest text-muted-foreground/60 uppercase ml-auto pt-1 truncate">
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

            {/* Image Container: translateZ for depth */}
            <div className="relative h-44 md:h-56 w-full flex items-center justify-center overflow-hidden translate-z-20">
              <div className="relative w-36 h-36 md:w-44 md:h-44 transition-transform duration-500 ease-out group-hover:scale-[1.05] animate-float-3d">
                <Image 
                  src={imageUrl} 
                  alt={name}
                  fill
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                  sizes="(max-width: 768px) 144px, 176px"
                />
              </div>
            </div>

            {/* Info Section: translateZ for depth */}
            <div className="mt-4 space-y-1 md:space-y-2 flex-grow translate-z-10">
              <h3 className="text-sm md:text-xl font-black tracking-tight leading-tight uppercase line-clamp-2 text-white/90">
                {name}
              </h3>
              <p className="text-lg md:text-2xl font-black text-white">{price}</p>
            </div>

            {/* Actions: Subtle depth */}
            <div className="mt-4 md:mt-8 flex flex-col gap-2 translate-z-10">
              <Button 
                className="w-full pill-button button-primary h-10 md:h-11 text-[9px] md:text-[10px] uppercase tracking-widest font-black"
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
                className="w-full pill-button h-10 md:h-11 text-[9px] md:text-[10px] uppercase tracking-widest font-black text-muted-foreground hover:text-white hover:bg-white/5"
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
