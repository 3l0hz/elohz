"use client"

import React, { useState, useEffect } from 'react';
import { Menu, X, User, ChevronRight, Percent, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from 'next/link';
import { CATEGORIES } from '@/lib/catalog';
import { useCart } from '@/lib/cart-context';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.123.553 4.197 1.603 6.04L0 24l6.117-1.605a11.803 11.803 0 005.925 1.597h.005c6.632 0 12.028-5.391 12.031-12.031a11.777 11.777 0 00-3.522-8.497" />
  </svg>
);

export function Header() {
  const { totalItems, setIsOpen } = useCart();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  const desktopLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Selfie Sticks', href: '/categoria/selfie-sticks' },
    { name: 'Soportes Moto', href: '/categoria/soportes-moto' },
    { name: 'Trípodes', href: '/categoria/tripodes' },
    { name: 'Accesorios Cámara', href: '/categoria/accesorios-camara' },
    { name: 'Ofertas', href: '#', highlight: true },
  ];

  const brands = [
    'Insta360',
    'GoPro',
    'DJI',
    'Telesin',
    'Ulanzi',
    'Sunnylife',
  ];

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full bg-[#0B0B0B]/90 backdrop-blur-xl border-b border-white/5 h-20 flex items-center transition-all duration-300 ease-out",
      !isVisible ? "-translate-y-full" : "translate-y-0"
    )}>
      <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-3xl font-black tracking-tighter text-white hover:opacity-80 transition-premium">
          elohz
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {desktopLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-[10px] uppercase tracking-[0.25em] font-black transition-premium hover:text-white ${link.highlight ? 'text-accent' : 'text-muted-foreground'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Menu & Icons */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/5 relative group"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingBag className="w-5 h-5 group-active:scale-90 transition-all" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-accent text-black font-black text-[10px] border-2 border-[#0B0B0B]">
                {totalItems}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="hidden sm:flex text-white hover:bg-white/5">
            <User className="w-5 h-5" />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/5 group">
                <Menu className="w-6 h-6 group-active:scale-90 transition-premium" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col border-none bg-[#0B0B0B] text-white">
              <SheetHeader className="sr-only">
                <SheetTitle>Menú elohz</SheetTitle>
                <SheetDescription>Explora categorías, marcas y ofertas exclusivas de elohz.</SheetDescription>
              </SheetHeader>

              {/* Drawer Header */}
              <div className="flex items-center justify-between p-8 h-20 border-b border-white/5">
                <Link href="/" className="text-2xl font-black tracking-tighter">elohz</Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-white">
                    <X className="w-6 h-6" />
                  </Button>
                </SheetClose>
              </div>
              
              <ScrollArea className="flex-1 px-8 py-10">
                <div className="space-y-12 pb-12">
                  {/* Categorías */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground">Categorías</h3>
                    <ul className="space-y-4">
                      {CATEGORIES.map((cat) => (
                        <li key={cat.slug}>
                          <SheetClose asChild>
                            <Link href={`/categoria/${cat.slug}`} className="flex items-center justify-between text-2xl font-black tracking-tighter hover:text-white transition-premium group">
                              <span>{cat.name}</span>
                              <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-premium text-accent" />
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Marcas */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground">Marcas Pro</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {brands.map((brand) => (
                        <Link 
                          key={brand} 
                          href="#" 
                          className="text-sm font-bold text-muted-foreground hover:text-white transition-premium"
                        >
                          {brand}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Extra */}
                  <div className="space-y-6 pt-6 border-t border-white/5">
                    <SheetClose asChild>
                      <Link href="#" className="flex items-center gap-4 text-xl font-black tracking-tighter hover:text-accent transition-premium group">
                        <Percent className="w-5 h-5 text-accent" />
                        <span>Ofertas Especiales</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="https://wa.me/56940628182" target="_blank" className="flex items-center gap-4 text-xl font-black tracking-tighter hover:text-accent transition-premium group">
                        <WhatsAppIcon className="w-5 h-5 text-accent" />
                        <span>Contacto WhatsApp</span>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </ScrollArea>

              <div className="p-8 border-t border-white/5 bg-[#111111]/50 backdrop-blur-md">
                <Link href="#" className="flex items-center justify-between text-xl font-black tracking-tighter hover:text-white transition-premium group">
                  <div className="flex items-center gap-4">
                    <User className="w-6 h-6 text-muted-foreground group-hover:text-white" />
                    <span>Mi Cuenta</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
