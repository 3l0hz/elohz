"use client"

import React from 'react';
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
import { MessageCircle, X } from "lucide-react";
import { Product } from '@/lib/catalog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProductDetailDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailDialog({ product, open, onOpenChange }: ProductDetailDialogProps) {
  const whatsappLink = `https://wa.me/56940628182?text=Hola,%20estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(product.name)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-[#0B0B0B] border-white/10 rounded-[2.5rem] flex flex-col md:flex-row h-[90vh] md:h-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Detalles técnicos y compatibilidad del producto.</DialogDescription>
        </DialogHeader>

        {/* Product Image Section */}
        <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto bg-[#111111] flex items-center justify-center p-12">
          <Image 
            src={product.imageUrl} 
            alt={product.name}
            fill
            className="object-contain p-12 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          />
          {product.badge && (
            <Badge className="absolute top-8 left-8 bg-white text-black font-black text-[9px] px-4 py-2 tracking-widest uppercase">
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Product Content Section */}
        <div className="flex-1 flex flex-col p-8 md:p-12 space-y-8 overflow-hidden">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="border-accent/30 text-accent font-black text-[8px] tracking-[0.2em] px-3 bg-accent/5">
                    {product.categoryName.toUpperCase()}
                  </Badge>
                  {product.brand && product.brand !== 'Genérico' && (
                    <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                      {product.brand}
                    </span>
                  )}
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none">{product.name}</h2>
                <p className="text-2xl font-black text-white pt-2">{product.price}</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Descripción</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground font-medium uppercase tracking-tight">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Compatibilidad</h4>
                    <p className="text-xs leading-relaxed text-white font-bold uppercase">
                      {product.compatibility}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Uso Recomendado</h4>
                    <p className="text-xs leading-relaxed text-white font-bold uppercase">
                      {product.recommendedUse}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="pt-6 border-t border-white/5 flex flex-col gap-3">
            <Button 
              className="w-full h-14 rounded-2xl bg-white text-black hover:bg-[#EAEAEA] font-black text-[10px] uppercase tracking-[0.2em] transition-premium"
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
              Cerrar detalles
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}