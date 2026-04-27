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
    const rotateY = ((x - centerX) / centerX) * 20;
    const rotateX = ((centerY - y) / centerY) * 20;
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const whatsappLink = `https://wa.me/56940628182?text=Hola,%20estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(name)}`;

  return (
    <Card 
      className="group relative overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-500 rounded-3xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Badge variant="secondary" className="bg-background text-muted-foreground font-normal">
            {category}
          </Badge>
          <div className="flex gap-1">
            {compatibility.slice(0, 2).map((comp) => (
              <Badge key={comp} variant="outline" className="text-[10px] px-1.5 py-0">
                {comp}
              </Badge>
            ))}
          </div>
        </div>

        <div className="perspective-1000 relative h-56 w-full flex items-center justify-center cursor-pointer">
          <div 
            className={cn(
              "preserve-3d transition-transform duration-200 ease-out",
              !isHovered && "animate-float-3d"
            )}
            style={{
              transform: isHovered 
                ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.1)` 
                : undefined
            }}
          >
            <div className="relative w-40 h-40">
              <Image 
                src={imageUrl} 
                alt={name}
                fill
                className="object-contain drop-shadow-2xl"
              />
              {isPedal && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" />
              )}
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/5 blur-xl rounded-full" />
        </div>

        <div className="mt-6 space-y-2">
          <h3 className="font-headline text-lg font-bold leading-tight">{name}</h3>
          <p className="text-2xl font-black text-foreground">{price}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <Button 
            className="w-full bg-primary hover:bg-[#FFB800] text-black font-bold pill-button text-xs"
            asChild
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-1" />
              WhatsApp
            </a>
          </Button>
          <Button 
            variant="secondary"
            className="w-full bg-black text-white hover:bg-neutral-800 pill-button text-xs"
          >
            <Eye className="w-4 h-4 mr-1" />
            Detalles
          </Button>
        </div>
      </div>
    </Card>
  );
}
