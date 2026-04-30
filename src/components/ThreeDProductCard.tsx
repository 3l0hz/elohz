"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from '@/lib/catalog';
import { ProductDetailDialog } from '@/components/ProductDetailDialog';

export function ThreeDProductCard(product: Product) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const { name, price, categoryName, imageUrl, brand, badge } = product;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = ((centerY - y) / centerY) * 12;
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const whatsappLink = `https://wa.me/56940628182?text=Hola,%20estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(name)}`;

  // Mapping for short category names on mobile
  const getShortCategory = (name: string) => {
    const map: Record<string, string> = {
      "Soportes Moto / Vehículo": "Moto",
      "Accesorios Cámara": "Cámara",
      "Soportes Smartphone": "Smartphone",
      "Accesorios Corporales": "POV",
      "Selfie Sticks": "Selfie",
      "Trípodes": "Trípode"
    };
    return map[name] || name;
  };

  return (
    <>
      <Card 
        className="group relative overflow-hidden bg-[#111111] border-[#1F1F1F] hover:border-white/30 transition-all duration-500 rounded-[2rem] border shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetRotation}
      >
        {/* Priority Badge: Más vendido */}
        {badge && (
          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
            <Badge className="bg-white text-black border-none font-black text-[7px] md:text-[8px] tracking-widest px-2 py-1 md:px-3 md:py-1.5 rounded-full uppercase whitespace-nowrap shadow-xl">
              {badge}
            </Badge>
          </div>
        )}
        
        <div className="p-4 md:p-8">
          {/* Category and Brand Row */}
          <div className="flex justify-between items-start mb-3 md:mb-6 min-h-[20px]">
            {/* Category: Short on mobile, Full on desktop */}
            <Badge 
              variant="outline" 
              className={cn(
                "border-[#1F1F1F] text-muted-foreground font-bold uppercase text-[7px] md:text-[8px] tracking-widest px-2 py-0.5 md:px-3 md:py-1 bg-black/50 whitespace-nowrap transition-premium",
                badge && "hidden sm:inline-flex" // Hide secondary category on very small screens if "Más vendido" exists
              )}
            >
              <span className="md:hidden">{getShortCategory(categoryName)}</span>
              <span className="hidden md:inline">{categoryName}</span>
            </Badge>

            {/* Brand: Only if not Genérico */}
            {brand && brand !== 'Genérico' && (
              <span className="text-[7px] md:text-[10px] font-black tracking-widest text-muted-foreground uppercase opacity-50 ml-auto truncate max-w-[60px] md:max-w-none">
                {brand}
              </span>
            )}
          </div>

          <div 
            className="perspective-1000 relative h-44 md:h-56 w-full flex items-center justify-center cursor-pointer"
            onClick={() => setShowDetails(true)}
          >
            <div 
              className={cn(
                "preserve-3d transition-transform duration-300 ease-out",
                !isHovered && "animate-float-3d"
              )}
              style={{
                transform: isHovered 
                  ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.1)` 
                  : undefined
              }}
            >
              <div className="relative w-36 h-36 md:w-44 md:h-44">
                <Image 
                  src={imageUrl} 
                  alt={name}
                  fill
                  className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-8 space-y-1.5 md:space-y-2 min-h-[3.5rem] md:min-h-[4rem]">
            <h3 className="text-sm md:text-xl font-black tracking-tight leading-tight group-hover:text-white transition-premium line-clamp-2 uppercase">
              {name}
            </h3>
            <p className="text-lg md:text-2xl font-black text-white">{price}</p>
          </div>

          <div className="mt-4 md:mt-8 flex flex-col gap-2">
            <Button 
              className="w-full pill-button button-primary h-10 md:h-11 text-[9px] md:text-[10px] uppercase tracking-widest font-black"
              asChild
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
                WhatsApp
              </a>
            </Button>
            <Button 
              variant="ghost"
              onClick={() => setShowDetails(true)}
              className="w-full pill-button h-10 md:h-11 text-[9px] md:text-[10px] uppercase tracking-widest font-black text-muted-foreground hover:text-white hover:bg-white/5"
            >
              <Eye className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
              Detalles
            </Button>
          </div>
        </div>
      </Card>

      <ProductDetailDialog 
        product={product} 
        open={showDetails} 
        onOpenChange={setShowDetails} 
      />
    </>
  );
}
