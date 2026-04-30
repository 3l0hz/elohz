"use client"

import React, { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2, X, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { CheckoutDialog } from '@/components/CheckoutDialog';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckoutClick = () => {
    setIsOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col bg-[#0B0B0B] border-white/5 text-white">
          <SheetHeader className="p-8 h-20 border-b border-white/5 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-accent" />
              <SheetTitle className="text-xl font-black tracking-tighter uppercase text-white">Carrito ({totalItems})</SheetTitle>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-white transition-all active:scale-90">
                <X className="w-5 h-5" />
              </Button>
            </SheetClose>
          </SheetHeader>

          <ScrollArea className="flex-1 px-8 py-6">
            {items.length === 0 ? (
              <div className="h-[60vh] flex flex-col items-center justify-center space-y-6 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black tracking-tighter uppercase">Carrito vacío</h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Añade productos para empezar tu consulta.</p>
                </div>
                <SheetClose asChild>
                  <Button className="pill-button button-primary h-12 px-8 text-[10px] font-black uppercase tracking-widest">Explorar catálogo</Button>
                </SheetClose>
              </div>
            ) : (
              <div className="space-y-8 pb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 animate-in fade-in slide-in-from-right-4">
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-[#111111] border border-white/5 flex-shrink-0">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-2" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase tracking-tight line-clamp-1">{item.name}</h4>
                        <p className="text-sm font-black text-white">{item.price}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden h-8">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 hover:bg-white/5 transition-colors active:scale-75"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-[10px] font-black">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 hover:bg-white/5 transition-colors active:scale-75"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-all p-1 active:scale-90"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {items.length > 0 && (
            <div className="p-8 space-y-6 border-t border-white/5 bg-[#111111]/50 backdrop-blur-md">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black uppercase tracking-widest">Total estimado</span>
                  <span className="text-2xl font-black text-white tracking-tighter">${totalPrice.toLocaleString('es-CL')}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={handleCheckoutClick}
                  className="w-full h-14 rounded-2xl button-primary text-xs uppercase tracking-widest shadow-xl group/checkout"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Confirmar compra
                </Button>
                <SheetClose asChild>
                  <Button variant="ghost" className="w-full h-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white group/continue transition-all active:scale-[0.98] lg:hover:translate-y-[-1px]">
                    Seguir viendo productos
                    <ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover/continue:opacity-100 group-hover/continue:translate-x-0 transition-all" />
                  </Button>
                </SheetClose>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutDialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} />
    </>
  );
}