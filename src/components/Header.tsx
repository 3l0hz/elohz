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
    { name: 'Productos', hasSubmenu: true },
    { name: 'Insta360+', hasSubmenu: false },
    { name: 'Empresa', hasSubmenu: true },
    { name: 'Descargas', hasSubmenu: false },
    { name: 'Soporte', hasSubmenu: false },
    { name: 'Descubrir', hasSubmenu: true },
    { name: 'Trade-In', hasSubmenu: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-100 shadow-sm h-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-[900] tracking-tighter text-black hover:opacity-80 transition-opacity">
          elohz
        </Link>

        {/* Hamburger Menu Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-neutral-100 rounded-lg group">
              <Menu className="w-6 h-6 text-black group-active:scale-90 transition-transform" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md p-0 flex flex-col border-none shadow-2xl bg-white">
            {/* Accessibility Titles (Screen Readers only) */}
            <SheetHeader className="sr-only">
              <SheetTitle>Menú de navegación</SheetTitle>
              <SheetDescription>
                Accede a nuestras categorías de productos, soporte y servicios de elohz.
              </SheetDescription>
            </SheetHeader>

            {/* Drawer Header with Close Button */}
            <div className="flex items-center justify-between p-4 h-16 border-b border-neutral-50">
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-100">
                  <X className="w-6 h-6 text-neutral-800" />
                </Button>
              </SheetClose>
              <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                <Menu className="w-5 h-5 text-neutral-400" />
              </div>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto scrollbar-hide py-2">
              <ul className="divide-y divide-neutral-50">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href="#" 
                      className="flex items-center justify-between px-6 py-5 text-[17px] font-semibold text-neutral-800 hover:bg-neutral-50 hover:text-black transition-all active:bg-neutral-100"
                    >
                      {link.name}
                      {link.hasSubmenu && <ChevronRight className="w-4 h-4 text-neutral-300" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom Account Section */}
            <div className="p-6 border-t border-neutral-100 bg-white">
              <Link href="#" className="flex items-center gap-3 text-lg font-bold text-neutral-800 hover:text-black transition-colors group">
                <span>Cuenta</span>
                <User className="w-5 h-5 text-neutral-500 group-hover:text-black transition-colors" />
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
