"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Box, Play, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from '@/lib/catalog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ProductDetailDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type MediaType = 'image' | '3d' | 'video';

interface MediaItem {
  type: MediaType;
  url: string;
  thumbnail?: string;
}

export function ProductDetailDialog({ product, open, onOpenChange }: ProductDetailDialogProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [is3dActive, setIs3dActive] = useState(false);

  // Construct media gallery
  const mediaGallery: MediaItem[] = [
    { type: 'image', url: product.imageUrl },
    ...(product.additionalImages?.map(url => ({ type: 'image' as const, url })) || []),
    ...(product.model3dUrl ? [{ type: '3d' as const, url: product.model3dUrl }] : []),
    ...(product.videoUrl ? [{ type: 'video' as const, url: product.videoUrl }] : []),
  ];

  const activeMedia = mediaGallery[activeMediaIndex];
  const whatsappLink = `https://wa.me/56940628182?text=Hola,%20estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(product.name)}`;

  useEffect(() => {
    if (!open) {
      setActiveMediaIndex(0);
      setIs3dActive(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-0 overflow-hidden bg-[#0B0B0B] border-white/5 rounded-[2.5rem] flex flex-col md:flex-row h-[95vh] md:h-[85vh]">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Detalles multimedia y técnicos del producto.</DialogDescription>
        </DialogHeader>

        {/* Gallery Section */}
        <div className="relative w-full md:w-3/5 bg-[#0B0B0B] flex flex-col">
          <div className="relative flex-1 group overflow-hidden bg-[#0F0F0F]">
            {/* Main Viewport */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              {activeMedia.type === 'image' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src={activeMedia.url} 
                    alt={product.name}
                    fill
                    className="object-contain p-4 md:p-12 transition-all duration-700"
                  />
                  {product.model3dUrl && (
                    <button 
                      onClick={() => {
                        const index3d = mediaGallery.findIndex(m => m.type === '3d');
                        if (index3d !== -1) setActiveMediaIndex(index3d);
                      }}
                      className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
                    >
                      <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <Box className="w-5 h-5 text-accent" />
                        <span className="text-[10px] font-black tracking-widest uppercase">Ver en 3D</span>
                      </div>
                    </button>
                  )}
                </div>
              )}

              {activeMedia.type === '3d' && (
                <div className="w-full h-full">
                  {/* @ts-ignore */}
                  <model-viewer
                    src={activeMedia.url}
                    alt="Modelo 3D del producto"
                    auto-rotate
                    camera-controls
                    shadow-intensity="1"
                    environment-image="neutral"
                    style={{ width: '100%', height: '100%', outline: 'none' }}
                  />
                </div>
              )}

              {activeMedia.type === 'video' && (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <video 
                    src={activeMedia.url} 
                    controls 
                    className="max-h-full max-w-full rounded-2xl"
                    poster={product.imageUrl}
                  />
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => setActiveMediaIndex(prev => (prev > 0 ? prev - 1 : mediaGallery.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-premium z-20 md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setActiveMediaIndex(prev => (prev < mediaGallery.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-premium z-20 md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Badges Overlay */}
            <div className="absolute top-8 left-8 z-30 flex flex-col gap-2">
              {product.badge && (
                <Badge className="bg-white text-black font-black text-[9px] px-4 py-2 tracking-widest uppercase rounded-xl border-none">
                  {product.badge}
                </Badge>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="h-24 border-t border-white/5 bg-[#0B0B0B] p-4 flex gap-3 overflow-x-auto no-scrollbar scroll-smooth">
            {mediaGallery.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMediaIndex(idx)}
                className={cn(
                  "relative h-full aspect-square rounded-xl overflow-hidden border-2 transition-premium flex-shrink-0",
                  activeMediaIndex === idx ? "border-accent" : "border-transparent opacity-40 hover:opacity-100"
                )}
              >
                {item.type === 'image' && (
                  <Image src={item.url} alt="Thumbnail" fill className="object-cover" />
                )}
                {item.type === '3d' && (
                  <div className="w-full h-full flex items-center justify-center bg-[#111111]">
                    <Box className="w-6 h-6 text-accent" />
                  </div>
                )}
                {item.type === 'video' && (
                  <div className="w-full h-full flex items-center justify-center bg-[#111111]">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-8 md:p-12 space-y-10 overflow-hidden bg-[#0B0B0B]">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="border-accent/20 text-accent font-black text-[8px] tracking-[0.2em] px-3 py-1 bg-accent/5 rounded-lg">
                    {product.categoryName.toUpperCase()}
                  </Badge>
                  {product.brand && product.brand !== 'Genérico' && (
                    <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase bg-white/5 px-2 py-1 rounded-md">
                      {product.brand}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">{product.name}</h2>
                  <p className="text-3xl font-black text-white pt-4 tracking-tight">{product.price}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Descripción</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground font-medium uppercase tracking-tight">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 pt-4">
                  <div className="space-y-3 p-6 rounded-3xl bg-white/5 border border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Compatibilidad Técnica</h4>
                    <p className="text-xs leading-relaxed text-white font-bold uppercase tracking-tight">
                      {product.compatibility}
                    </p>
                  </div>
                  <div className="space-y-3 p-6 rounded-3xl bg-white/5 border border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Uso Profesional</h4>
                    <p className="text-xs leading-relaxed text-white font-bold uppercase tracking-tight">
                      {product.recommendedUse}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
            <Button 
              className="w-full h-16 rounded-[1.25rem] bg-white text-black hover:bg-[#EAEAEA] font-black text-xs uppercase tracking-[0.2em] transition-premium shadow-xl shadow-white/5"
              asChild
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-3" />
                Comprar por WhatsApp
              </a>
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
              className="w-full h-14 rounded-2xl text-muted-foreground hover:text-white hover:bg-white/5 font-black text-[10px] uppercase tracking-[0.2em]"
            >
              Cerrar Galería
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
