
"use client"

import React from 'react';
import { Menu, X, User, ChevronRight, MessageCircle, Percent, ShoppingBag } from 'lucide-react';
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

export function Header() {
  const { totalItems, setIsOpen } = useCart();
  
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
    <header className="sticky top-10 z-50 w-full bg-[#0B0B0B]/90 backdrop-blur-xl border-b border-white/5 h-20 flex items-center transition-all duration-300">
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
                        <MessageCircle className="w-5 h-5 text-accent" />
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
