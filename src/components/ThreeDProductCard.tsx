"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MessageCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from '@/lib/catalog';
import { ProductDetailDialog } from '@/components/ProductDetailDialog';
import { useCart } from '@/lib/cart-context';

export function ThreeDProductCard(product: Product) {
  const [showDetails, setShowDetails] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItem, setIsOpen } = useCart();
  
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });

  const { name, price, categoryName, imageUrl, brand, badge } = product;

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
    
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setShine({ x: shineX, y: shineY, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setShine(prev => ({ ...prev, opacity: 0 }));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsOpen(true);
    }, 800);
  };

  const handleWhatsAppConsult = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hola, quiero consultar por este producto:\n${name}\n${price}\n\n¿Está disponible?`;
    window.open(`https://wa.me/56940628182?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <div 
        ref={cardRef}
        className={cn(
          "perspective-1000 transition-all duration-700 ease-out",
          isVisible 
            ? "opacity-100 translate-y-0 scale-100 blur-0" 
            : "opacity-0 translate-y-4 scale-[0.98] blur-sm"
        )}
      >
        <Card 
          className={cn(
            "group relative overflow-hidden bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] border cursor-pointer preserve-3d transition-all duration-300 ease-out",
            "border-white/[0.18] md:border-white/[0.08] md:hover:border-white/20",
            "shadow-[0_0_35px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.45)] md:shadow-2xl",
            "active:scale-[0.98] md:hover:scale-[1.02] md:hover:shadow-[0_0_40px_rgba(255,255,255,0.08),0_20px_70px_rgba(0,0,0,0.55)]",
            "md:before:absolute md:before:inset-0 md:before:z-30 md:before:pointer-events-none md:before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)]",
            "transition-all",
            "before:absolute before:inset-0 before:z-30 before:pointer-events-none before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)]",
            "md:before:opacity-0 md:group-hover:before:opacity-100",
            "max-md:scale-[0.98] max-md:active:scale-[0.96] max-md:shadow-[0_0_35px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.45)] max-md:border-white/[0.18]",
            "max-md:active:before:opacity-0 max-md:active:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_0_30px_rgba(255,255,255,0.08)]"
          )}
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setShowDetails(true)}
        >
          <div 
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 hidden md:block"
            style={{
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.opacity}), transparent 50%)`,
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none z-10" />
          
          <div className="p-3 md:p-6 flex flex-col h-full relative z-20">
            <div className="flex flex-col gap-1.5 mb-2 translate-z-10">
              <div className="flex justify-between items-start w-full">
                {badge ? (
                  <Badge className="bg-white text-black border-none font-bold text-[7px] md:text-[8px] tracking-widest px-2 py-0.5 md:px-3 md:py-1.5 rounded-full uppercase shadow-xl">
                    {badge}
                  </Badge>
                ) : <div className="h-4" />}
                {brand && brand !== 'Genérico' && (
                  <span className="text-[7px] md:text-[10px] font-bold tracking-[0.2em] text-muted-foreground/60 uppercase ml-auto pt-0.5 truncate">
                    {brand}
                  </span>
                )}
              </div>
              
              <Badge 
                variant="outline" 
                className="border-white/10 text-muted-foreground font-bold uppercase text-[7px] md:text-[8px] tracking-[0.2em] px-2 py-0.5 md:px-3 md:py-1 bg-black/40 backdrop-blur-sm w-fit"
              >
                <span className="md:hidden">{getShortCategory(categoryName)}</span>
                <span className="hidden md:inline">{categoryName}</span>
              </Badge>
            </div>

            <div className="relative h-[180px] md:h-80 w-full flex items-center justify-center overflow-hidden translate-z-20 mt-1">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,156,0.03)_0%,transparent_70%)]" />
              
              <div className="relative w-44 h-44 md:w-64 md:h-64 transition-all duration-300 ease-out group-active:scale-[1.03] md:group-hover:scale-[1.05]">
                <Image 
                  src={imageUrl} 
                  alt={name}
                  fill
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                  sizes="(max-width: 768px) 176px, 256px"
                />
              </div>
            </div>

            <div className="mt-2 space-y-1 md:space-y-2 flex-grow translate-z-10">
              <h3 className="text-sm md:text-xl font-bold tracking-tight leading-tight uppercase line-clamp-2 text-white/90">
                {name}
              </h3>
              <p className="text-base md:text-2xl font-extrabold text-white tracking-tighter">{price}</p>
            </div>

            <div className="mt-4 flex flex-col gap-2 translate-z-10">
              <Button 
                className={cn(
                  "w-full h-11 md:h-12 text-[10px] uppercase tracking-widest font-bold transition-all pill-button btn-premium-shine",
                  isAdded ? "bg-accent text-black active:scale-[0.98] lg:hover:scale-[1.02]" : "button-primary"
                )}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <Check className="w-4 h-4 mr-2 animate-in zoom-in" />
                ) : (
                  <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2 transition-transform lg:group-hover/btn:translate-x-1" />
                )}
                {isAdded ? "Añadido" : "Agregar"}
              </Button>
              <Button 
                variant="ghost"
                className="w-full h-10 md:h-11 text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 hover:text-white transition-all group/btn active:scale-[0.98] lg:hover:translate-y-[-1px]"
                onClick={handleWhatsAppConsult}
              >
                <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2 transition-transform lg:group-hover/btn:scale-110" />
                Consulta
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