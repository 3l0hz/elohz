
"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Box, Play, ChevronLeft, ChevronRight, X, Maximize2, Check } from "lucide-react";
import { Product } from '@/lib/catalog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

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
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, setIsOpen } = useCart();

  const mediaGallery: MediaItem[] = [
    { type: 'image', url: product.imageUrl },
    ...(product.additionalImages?.map(url => ({ type: 'image' as const, url })) || []),
    ...(product.model3dUrl ? [{ type: '3d' as const, url: product.model3dUrl }] : []),
    ...(product.videoUrl ? [{ type: 'video' as const, url: product.videoUrl }] : []),
  ];

  const activeMedia = mediaGallery[activeMediaIndex];

  useEffect(() => {
    if (!open) {
      setActiveMediaIndex(0);
      setIsZoomed(false);
      setIsAdded(false);
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

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onOpenChange(false);
      setIsOpen(true);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "max-w-[95vw] md:max-w-6xl p-0 overflow-hidden bg-[#0B0B0B] border-white/10 md:rounded-[2.5rem] flex flex-col md:flex-row h-[92vh] md:h-[85vh] transition-all duration-500 ease-out outline-none",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.94] data-[state=open]:slide-in-from-bottom-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[0.96]"
      )}>
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Detalles multimedia y técnicos del producto.</DialogDescription>
        </DialogHeader>

        {/* Gallery Section */}
        <div className="relative w-full md:w-3/5 bg-[#0F0F0F] flex flex-col border-r border-white/5 overflow-hidden">
          <div 
            className="relative flex-1 group overflow-hidden flex items-center justify-center cursor-zoom-in min-h-[280px] md:min-h-0"
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
                    alt="Modelo 3D"
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
                  />
                </div>
              )}
            </div>

            {mediaGallery.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white transition-all duration-300 z-20 hover:bg-white/10 active:scale-90 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white transition-all duration-300 z-20 hover:bg-white/10 active:scale-90 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <div className="absolute top-6 left-6 z-30">
              {product.badge && (
                <Badge className="bg-white text-black font-black text-[8px] px-3 py-1.5 tracking-widest uppercase rounded-lg shadow-2xl">
                  {product.badge}
                </Badge>
              )}
            </div>
          </div>

          <div className="h-16 md:h-24 border-t border-white/5 bg-[#0B0B0B] p-3 md:p-4 flex items-center justify-center gap-3 overflow-x-auto scrollbar-hide">
            {mediaGallery.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMediaIndex(idx)}
                className={cn(
                  "relative h-10 md:h-12 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 active:scale-90",
                  activeMediaIndex === idx 
                    ? "border-accent scale-105" 
                    : "border-transparent opacity-40 hover:opacity-100"
                )}
              >
                {item.type === 'image' && (
                  <Image src={item.url} alt="Thumbnail" fill className="object-cover" />
                )}
                {item.type === '3d' && (
                  <div className="w-full h-full flex items-center justify-center bg-[#111111]">
                    <Box className="w-5 h-5 text-accent" />
                  </div>
                )}
                {item.type === 'video' && (
                  <div className="w-full h-full flex items-center justify-center bg-[#111111]">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <DialogClose asChild>
            <button className="md:hidden absolute top-6 right-6 z-50 p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white">
              <X className="w-4 h-4" />
            </button>
          </DialogClose>
        </div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col p-5 md:p-10 bg-[#0B0B0B] overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="space-y-4 md:space-y-8 pb-6">
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-accent/20 text-accent font-black text-[9px] tracking-[0.2em] px-3 py-1 bg-accent/5 rounded-lg">
                    {product.categoryName.toUpperCase()}
                  </Badge>
                  {product.brand && product.brand !== 'Genérico' && (
                    <span className="text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase bg-white/5 px-2 py-1 rounded-lg">
                      {product.brand}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-5xl font-black tracking-tighter uppercase leading-none text-white">{product.name}</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl md:text-4xl font-black text-white tracking-tighter">{product.price}</span>
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Stock disponible</span>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8">
                <div className="space-y-2 md:space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-accent/30" />
                    Especificaciones
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground font-medium uppercase tracking-tight">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  <div className="p-4 md:p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 md:space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Compatibilidad</h4>
                    <p className="text-xs leading-relaxed text-white font-bold uppercase">{product.compatibility}</p>
                  </div>
                  <div className="p-4 md:p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 md:space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Uso Profesional</h4>
                    <p className="text-xs leading-relaxed text-white font-bold uppercase">{product.recommendedUse}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
            <Button 
              onClick={handleAddToCart}
              className={cn(
                "w-full h-13 md:h-14 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl",
                isAdded ? "bg-accent text-black" : "bg-white text-black hover:bg-[#EAEAEA]"
              )}
            >
              {isAdded ? <Check className="w-5 h-5 mr-2 animate-in zoom-in" /> : <ShoppingCart className="w-5 h-5 mr-2" />}
              {isAdded ? "Añadido al carrito" : "Agregar al carrito"}
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" className="hidden md:flex text-muted-foreground hover:text-white text-[10px] uppercase tracking-widest font-black">
                Volver al catálogo
              </Button>
            </DialogClose>
          </div>
        </div>

        {/* Lightbox */}
        {isZoomed && activeMedia.type === 'image' && (
          <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <button className="absolute top-8 right-8 text-white p-2">
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
              <Image 
                src={activeMedia.url} 
                alt="Zoom"
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
