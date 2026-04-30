import React from 'react';
import { HeroCarousel } from '@/components/HeroCarousel';
import { ThreeDProductCard } from '@/components/ThreeDProductCard';
import { AIProblemSolver } from '@/components/AIProblemSolver';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Truck, 
  MessageCircle, 
  CheckCircle, 
  ShieldCheck, 
  Instagram, 
  Youtube, 
  Twitter
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { PRODUCTS, CATEGORIES } from '@/lib/catalog';
import Link from 'next/link';

export default function Home() {
  // Group products by category for the homepage showcase
  const catalogShowcase = CATEGORIES.map(category => ({
    name: category.name,
    slug: category.slug,
    products: PRODUCTS.filter(p => p.categorySlug === category.slug)
  })).filter(section => section.products.length > 0);

  return (
    <main className="min-h-screen pb-20 overflow-x-hidden bg-background">
      <HeroCarousel />

      {/* Benefits Bar */}
      <div className="bg-[#111111] border-y border-[#1F1F1F] py-6 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 min-w-[700px] gap-8">
          <div className="flex items-center gap-3">
            <Truck className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-widest uppercase">Envíos a todo Chile</span>
          </div>
          <div className="flex items-center gap-3">
            <MessageCircle className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-widest uppercase">Soporte WhatsApp</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-widest uppercase">Calidad Certificada</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-widest uppercase">Garantía elohz</span>
          </div>
        </div>
      </div>

      {/* Catalog Sections */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-32">
        {catalogShowcase.map((section, idx) => (
          <div key={idx} className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-accent pl-8">
              <div className="space-y-2">
                <Badge className="bg-accent/10 text-accent border-accent/20 font-black text-[9px] tracking-[0.2em] px-3">
                  {section.name.toUpperCase()}
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">{section.name}</h2>
              </div>
              <p className="text-muted-foreground font-medium text-sm md:text-base max-w-xs">
                Equipamiento técnico seleccionado para {section.name.toLowerCase()}.
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {section.products.map((product) => (
                <ThreeDProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* AI Section */}
      <div className="px-6 py-20">
        <AIProblemSolver />
      </div>

      {/* Call to Action for Creators */}
      <section className="py-32 bg-[#111111] px-6 border-y border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-20">
          <div className="space-y-8">
            <Badge className="bg-white text-black font-black text-[10px] tracking-widest">CONTENT CREATORS</Badge>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase">Diseñado para la acción</h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Somos especialistas en accesorios para cámaras deportivas. Si eres motociclista, deportista extremo, youtuber o una de las personas que graban contenido técnico, elohz tiene el gear que necesitas para capturar lo imposible.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="pill-button button-primary h-14 px-12 text-[10px] font-black uppercase tracking-widest">Ver Colección Pro</Button>
              <Button variant="outline" className="pill-button h-14 px-12 text-[10px] font-black uppercase tracking-widest border-white/20">Asesoría Técnica</Button>
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-[#1F1F1F] group">
            <Image 
              src={PlaceHolderImages.find(img => img.id === "hero-action-2")?.imageUrl || ""}
              alt="Action Creators"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-[#1F1F1F] pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <h3 className="text-4xl font-black tracking-tighter">elohz</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs uppercase font-bold tracking-tighter">
              Tu boutique especializada en accesorios premium para cámaras de acción en Chile.
            </p>
            <div className="flex gap-6">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-accent transition-premium" />
              <Youtube className="w-5 h-5 cursor-pointer hover:text-accent transition-premium" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-accent transition-premium" />
            </div>
          </div>
          <div>
            <h4 className="font-black mb-8 uppercase text-xs tracking-[0.3em] text-white">Categorías</h4>
            <ul className="space-y-4 text-xs font-black tracking-widest uppercase text-muted-foreground">
              {CATEGORIES.map(cat => (
                <li key={cat.slug} className="hover:text-white cursor-pointer transition-premium">
                  <Link href={`/categoria/${cat.slug}`}>{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 uppercase text-xs tracking-[0.3em] text-white">Servicios</h4>
            <ul className="space-y-4 text-xs font-black tracking-widest uppercase text-muted-foreground">
              <li className="hover:text-white cursor-pointer transition-premium">Envíos VIP Chile</li>
              <li className="hover:text-white cursor-pointer transition-premium">Garantía Técnica</li>
              <li className="hover:text-white cursor-pointer transition-premium">Trade-In Gear</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-black uppercase text-xs tracking-[0.3em] text-white">Newsletter</h4>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Recibe lanzamientos exclusivos de elohz.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="TU EMAIL" className="bg-[#111111] border border-[#1F1F1F] rounded-2xl px-6 text-[10px] font-black h-12 w-full focus:outline-none focus:border-white transition-premium tracking-widest" />
              <Button className="pill-button button-primary h-12 w-full text-[10px] font-black uppercase tracking-widest">Suscribir</Button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-[#1F1F1F] flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground">
          <p>© 2024 ELOHZ CHILE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-premium">Privacidad</span>
            <span className="hover:text-white cursor-pointer transition-premium">Términos</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/56940628182" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-white text-black p-4 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-premium flex items-center justify-center group border border-white/20"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 whitespace-nowrap font-black text-[10px] uppercase tracking-widest">
          Asesoría elohz
        </span>
      </a>
    </main>
  );
}