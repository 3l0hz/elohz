"use client"

import React from 'react';
import { Menu, X, User, ChevronRight } from 'lucide-react';
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
import Link from 'next/link';

export function Header() {
  const navLinks = [
    { name: 'Gear', hasSubmenu: true },
    { name: 'Insta360+', hasSubmenu: false },
    { name: 'Pro Series', hasSubmenu: true },
    { name: 'Asistencia', hasSubmenu: false },
    { name: 'Trade-In', hasSubmenu: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-lg border-b border-white/5 h-20 flex items-center transition-premium">
      <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-3xl font-black tracking-tighter text-white hover:opacity-80 transition-premium">
          elohz
        </Link>

        {/* Desktop Navigation (Center) - Hidden for now as requested minimal structure */}
        <nav className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link key={link.name} href="#" className="text-xs uppercase tracking-[0.2em] font-black text-muted-foreground hover:text-white transition-premium">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Menu & Profile Icons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex text-white hover:bg-white/5">
            <User className="w-5 h-5" />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/5 group">
                <Menu className="w-6 h-6 group-active:scale-90 transition-premium" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-md p-0 flex flex-col border-none bg-black text-white">
              <SheetHeader className="sr-only">
                <SheetTitle>Menú elohz</SheetTitle>
                <SheetDescription>Explora nuestro catálogo de tecnología premium.</SheetDescription>
              </SheetHeader>

              <div className="flex items-center justify-between p-8 h-20 border-b border-white/5">
                <span className="text-2xl font-black tracking-tighter">elohz</span>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-white">
                    <X className="w-6 h-6" />
                  </Button>
                </SheetClose>
              </div>
              
              <nav className="flex-1 overflow-y-auto scrollbar-hide py-8">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href="#" 
                        className="flex items-center justify-between px-8 py-6 text-2xl font-black tracking-tighter text-muted-foreground hover:text-white hover:bg-white/5 transition-premium"
                      >
                        {link.name}
                        {link.hasSubmenu && <ChevronRight className="w-6 h-6 text-white/20" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-8 border-t border-white/5 bg-black/50 backdrop-blur-md">
                <Link href="#" className="flex items-center justify-between text-xl font-black tracking-tighter hover:text-accent transition-premium group">
                  <span>Cuenta Personal</span>
                  <User className="w-6 h-6 group-hover:text-accent transition-premium" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}