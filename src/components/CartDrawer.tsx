"use client"

import React from 'react';
import { useCart } from '@/lib/cart-context';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2, X, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  const handleCheckout = () => {
    let msg = "Hola elohz, quiero consultar por estos productos:\n\n";
    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.name} x ${item.quantity} - ${item.price}\n`;
    });
    msg += `\nTotal estimado: $${totalPrice.toLocaleString('es-CL')}\n\n¿Tienen disponibilidad y tiempos de envío?`;
    window.open(`https://wa.me/56940628182?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
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
                onClick={handleCheckout}
                className="w-full h-14 rounded-2xl bg-white text-black hover:bg-[#EAEAEA] font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-[0.98] lg:hover:scale-[1.02] btn-premium-shine group/checkout"
              >
                <svg className="w-5 h-5 mr-2 transition-transform group-hover/checkout:scale-110" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.301-.15-1.767-.872-2.04-.971-.272-.1-.47-.15-.67.15-.199.3-.77.971-.944 1.17-.175.2-.348.225-.65.075a8.96 8.96 0 0 1-2.456-1.513 9.774 9.774 0 0 1-1.701-2.118c-.183-.314-.02-.485.132-.635.138-.135.301-.349.452-.524.15-.175.2-.3.301-.5.1-.199.05-.374-.025-.524-.075-.15-.67-1.615-.918-2.214-.242-.589-.487-.51-.67-.52-.174-.01-.374-.01-.574-.01-.2 0-.524.075-.798.375-.274.3-1.045 1.021-1.045 2.49 0 1.47 1.071 2.89 1.22 3.09.15.2 2.108 3.218 5.107 4.512.713.308 1.27.493 1.703.632.715.228 1.366.196 1.882.118.575-.088 1.767-.723 2.015-1.42.247-.697.247-1.296.173-1.42-.073-.125-.27-.199-.57-.349z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.55 4.117 1.513 5.856L.07 23.93l6.236-1.636A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.07-1.385l-.363-.216-3.774.99.1-3.676-.237-.377A9.956 9.956 0 0 1 2 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                </svg>
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
  );
}