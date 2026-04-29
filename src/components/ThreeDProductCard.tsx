"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductProps {
  id: string;
  name: string;
  price: string;
  category: string;
  imageUrl: string;
  compatibility: string[];
  isPedal?: boolean;
}

export function ThreeDProductCard({ id, name, price, category, imageUrl, compatibility, isPedal }: ProductProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((centerY - y) / centerY) * 15;
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const whatsappLink = `https://wa.me/56940628182?text=Hola,%20estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(name)}`;

  return (
    <Card 
      className="group relative overflow-hidden bg-card border-border hover:border-white/20 transition-all duration-500 rounded-[2rem] border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
    >
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <Badge variant="outline" className="border-border text-muted-foreground font-bold uppercase text-[9px] tracking-widest px-3 py-1 bg-background/50">
            {category}
          </Badge>
          <div className="flex gap-1.5">
            {compatibility.slice(0, 2).map((comp) => (
              <Badge key={comp} className="bg-white/5 text-muted-foreground border-none text-[8px] px-2 py-0.5 uppercase tracking-tighter">
                {comp}
              </Badge>
            ))}
          </div>
        </div>

        <div className="perspective-1000 relative h-64 w-full flex items-center justify-center cursor-pointer">
          <div 
            className={cn(
              "preserve-3d transition-transform duration-300 ease-out",
              !isHovered && "animate-float-3d"
            )}
            style={{
              transform: isHovered 
                ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.15)` 
                : undefined
            }}
          >
            <div className="relative w-48 h-48">
              <Image 
                src={imageUrl} 
                alt={name}
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
              {isPedal && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent shadow-[0_0_15px_rgba(0,255,156,0.8)] animate-pulse" />
              )}
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/40 blur-2xl rounded-full" />
        </div>

        <div className="mt-10 space-y-3">
          <h3 className="text-xl font-black tracking-tight leading-tight group-hover:text-white transition-premium">{name}</h3>
          <p className="text-2xl font-black text-white">{price}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Button 
            className="w-full pill-button button-primary h-12 text-xs uppercase tracking-widest"
            asChild
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              Adquirir
            </a>
          </Button>
          <Button 
            variant="ghost"
            className="w-full pill-button h-12 text-xs uppercase tracking-widest text-muted-foreground hover:text-white hover:bg-white/5"
          >
            <Eye className="w-4 h-4 mr-2" />
            Specs
          </Button>
        </div>
      </div>
    </Card>
  );
}