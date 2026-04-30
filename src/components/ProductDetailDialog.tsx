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
import { MessageCircle, Box, Play, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
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
  const [isZoomed, setIsZoomed] = useState(false);

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
      setIsZoomed(false);
    }
  }, [open]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMediaIndex(prev => (prev < mediaGallery.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMediaIndex(prev => (prev > 0 ? prev - 1 : mediaGallery.length - 1));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "max-w-[100vw] md:max-w-6xl p-0 overflow-hidden bg-[#0B0B0B] border-white/5 md:rounded-[2.5rem] flex flex-col md:flex-row h-[100dvh] md:h-[85vh] transition-all duration-500 ease-out outline-none",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-10"
      )}>
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Detalles multimedia y técnicos del producto.</DialogDescription>
        </DialogHeader>

        {/* Gallery Section */}
        <div className="relative w-full md:w-3/5 bg-[#0F0F0F] flex flex-col border-r border-white/5 overflow-hidden">
          {/* Main Viewport - Integrated Area */}
          <div 
            className="relative flex-1 group overflow-hidden flex items-center justify-center cursor-zoom-in min-h-[300px] md:min-h-0"
            onClick={() => activeMedia.type === 'image' && setIsZoomed(true)}
          >
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
            
            <div className="relative w-full h-full flex items-center justify-center p-6 md:p-12 z-10 transition-all duration-500">
              {activeMedia.type === 'image' && (
                <div className="relative w-full h-full animate-in fade-in zoom-in-[0.98] duration-300">
                  <Image 
                    src={activeMedia.url} 
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                  {/* Zoom indicator on desktop */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-md p-2.5 rounded-xl border border-white/10 hidden md:block">
                    <Maximize2 className="w-5 h-5 text-white/70" />
                  </div>
                </div>
              )}

              {activeMedia.type === '3d' && (
                <div className="w-full h-full animate-in fade-in duration-300">
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
                <div className="w-full h-full flex items-center justify-center p-4 animate-in fade-in duration-300">
                  <video 
                    src={activeMedia.url} 
                    controls 
                    className="max-h-full max-w-full rounded-3xl shadow-2xl"
                    poster={product.imageUrl}
                  />
                </div>
              )}
            </div>

            {/* Navigation Arrows - Integrated Glass Effect */}
            {mediaGallery.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 text-white transition-all duration-300 z-20 hover:bg-white/10 hover:scale-110 active:scale-90 group-hover:opacity-100 opacity-60 md:opacity-0"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 text-white transition-all duration-300 z-20 hover:bg-white/10 hover:scale-110 active:scale-90 group-hover:opacity-100 opacity-60 md:opacity-0"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Badges Overlay */}
            <div className="absolute top-6 left-6 z-30 flex flex-col gap-2">
              {product.badge && (
                <Badge className="bg-white text-black font-black text-[9px] px-4 py-2 tracking-widest uppercase rounded-xl border-none shadow-2xl">
                  {product.badge}
                </Badge>
              )}
            </div>
          </div>

          {/* Thumbnails Bar - Positioned BELOW */}
          <div className="h-20 md:h-28 border-t border-white/5 bg-[#0B0B0B] p-3 md:p-5 flex items-center justify-center gap-3 md:gap-4 overflow-x-auto scrollbar-hide">
            {mediaGallery.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMediaIndex(idx)}
                className={cn(
                  "relative h-12 md:h-16 aspect-square rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 active:scale-90",
                  activeMediaIndex === idx 
                    ? "border-accent scale-105 shadow-lg shadow-accent/10" 
                    : "border-transparent opacity-30 hover:opacity-100"
                )}
              >
                {item.type === 'image' && (
                  <Image src={item.url} alt="Thumbnail" fill className="object-cover" />
                )}
                {item.type === '3d' && (
                  <div className="w-full h-full flex items-center justify-center bg-[#111111]">
                    <Box className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                )}
                {item.type === 'video' && (
                  <div className="w-full h-full flex items-center justify-center bg-[#111111]">
                    <Play className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Close button for mobile inside gallery area */}
          <button 
            onClick={() => onOpenChange(false)}
            className="md:hidden absolute top-6 right-6 z-50 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-6 md:p-12 space-y-6 md:space-y-10 overflow-hidden bg-[#0B0B0B] relative">
          <ScrollArea className="flex-1 pr-2 md:pr-4">
            <div className="space-y-8 md:space-y-12 pb-12 md:pb-0">
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <Badge variant="outline" className="border-accent/20 text-accent font-black text-[8px] md:text-[9px] tracking-[0.2em] px-3 md:px-4 py-1.5 bg-accent/5 rounded-xl">
                    {product.categoryName.toUpperCase()}
                  </Badge>
                  {product.brand && product.brand !== 'Genérico' && (
                    <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase bg-white/5 px-2 md:px-3 py-1.5 rounded-xl border border-white/5">
                      {product.brand}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[0.95] md:leading-[0.9] text-white">{product.name}</h2>
                  <div className="flex items-baseline gap-2 pt-2 md:pt-4">
                    <span className="text-2xl md:text-5xl font-black text-white tracking-tighter">{product.price}</span>
                    <span className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">En stock</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8 md:space-y-12">
                <div className="space-y-3 md:space-y-4">
                  <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-3">
                    <span className="w-6 md:w-8 h-[1px] bg-accent/30" />
                    Descripción
                  </h4>
                  <p className="text-xs md:text-base leading-relaxed text-muted-foreground font-medium uppercase tracking-tight">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <div className="group space-y-3 md:space-y-4 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-premium">
                    <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Compatibilidad Técnica</h4>
                    <p className="text-xs md:text-sm leading-relaxed text-white font-bold uppercase tracking-tight group-hover:text-accent transition-premium">
                      {product.compatibility}
                    </p>
                  </div>
                  <div className="group space-y-3 md:space-y-4 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-premium">
                    <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Uso Profesional</h4>
                    <p className="text-xs md:text-sm leading-relaxed text-white font-bold uppercase tracking-tight group-hover:text-accent transition-premium">
                      {product.recommendedUse}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Sticky Footer for CTA */}
          <div className="pt-4 md:pt-12 border-t border-white/5 flex flex-col gap-4 bg-[#0B0B0B] z-10">
            <Button 
              className="w-full h-14 md:h-20 rounded-[1.2rem] md:rounded-[1.5rem] bg-white text-black hover:bg-[#EAEAEA] font-black text-xs md:text-sm uppercase tracking-[0.2em] transition-premium shadow-2xl shadow-white/5 active:scale-[0.98]"
              asChild
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                Comprar por WhatsApp
              </a>
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
              className="hidden md:flex w-full h-14 rounded-2xl text-muted-foreground hover:text-white hover:bg-white/5 font-black text-[10px] uppercase tracking-[0.2em]"
            >
              Cerrar Galería
            </Button>
          </div>
        </div>

        {/* Lightbox / Zoom View */}
        {isZoomed && activeMedia.type === 'image' && (
          <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-300 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <button className="absolute top-8 right-8 text-white p-4 hover:rotate-90 transition-all duration-500">
              <X className="w-10 h-10" />
            </button>
            <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
              <Image 
                src={activeMedia.url} 
                alt="Zoom view"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
