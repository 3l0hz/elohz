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
  Camera, 
  Bike, 
  Music, 
  Instagram, 
  Youtube, 
  Twitter 
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const categories = [
  { name: 'Selfie Sticks', icon: <Camera className="w-5 h-5" /> },
  { name: 'Soportes Moto', icon: <Bike className="w-5 h-5" /> },
  { name: 'Insta360 X5', icon: <Camera className="w-5 h-5" /> },
  { name: 'GoPro', icon: <Camera className="w-5 h-5" /> },
  { name: 'Cargadores', icon: <Truck className="w-5 h-5" /> },
  { name: 'Música / Audio', icon: <Music className="w-5 h-5" /> },
];

const products = [
  {
    id: '1',
    name: 'Selfie Stick Insta360 1.20 m',
    price: '$19.990',
    category: 'Selfie Sticks',
    imageUrl: PlaceHolderImages.find(img => img.id === "product-stick-1")?.imageUrl || "",
    compatibility: ['Insta360', 'GoPro'],
  },
  {
    id: '2',
    name: 'Soporte moto manillar',
    price: '$19.990',
    category: 'Moto',
    imageUrl: PlaceHolderImages.find(img => img.id === "product-moto-mount")?.imageUrl || "",
    compatibility: ['Universal', 'Moto'],
  },
  {
    id: '3',
    name: 'Selfie Stick 3 metros Black',
    price: '$32.990',
    category: 'Selfie Sticks',
    imageUrl: PlaceHolderImages.find(img => img.id === "product-stick-3m")?.imageUrl || "",
    compatibility: ['Insta360', 'GoPro'],
  },
  {
    id: '7',
    name: 'Mini trípode de bolsillo',
    price: '$16.990',
    category: 'Accesorios',
    imageUrl: PlaceHolderImages.find(img => img.id === "product-tripod")?.imageUrl || "",
    compatibility: ['Universal', 'Cámaras'],
  },
  {
    id: '4',
    name: 'Case metálico Insta360 X5',
    price: '$32.990',
    category: 'Accesorios X5',
    imageUrl: PlaceHolderImages.find(img => img.id === "product-case-x5")?.imageUrl || "",
    compatibility: ['Insta360 X5'],
  },
  {
    id: '5',
    name: 'Pedal Overdrive',
    price: '$39.990',
    category: 'Música',
    imageUrl: PlaceHolderImages.find(img => img.id === "product-pedal-od")?.imageUrl || "",
    compatibility: ['Guitarra', 'Bajo'],
    isPedal: true,
  },
  {
    id: '6',
    name: 'Pedal Delay',
    price: '$42.990',
    category: 'Música',
    imageUrl: PlaceHolderImages.find(img => img.id === "product-pedal-delay")?.imageUrl || "",
    compatibility: ['Guitarra', 'Bajo'],
    isPedal: true,
  },
];

const compatibilityBadges = [
  'GoPro', 'Insta360', 'DJI', 'iPhone', 'Android', 'Moto', 'MTB', 'Guitarra', 'Bajo'
];

export default function Home() {
  return (
    <main className="min-h-screen pb-20 overflow-x-hidden bg-background">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Benefits Bar */}
      <div className="bg-card border-y border-border py-6 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 min-w-[700px] gap-8">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-accent" />
            <span className="text-xs font-bold tracking-widest uppercase">Despacho en Chile</span>
          </div>
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-accent" />
            <span className="text-xs font-bold tracking-widest uppercase">Atención WhatsApp</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-accent" />
            <span className="text-xs font-bold tracking-widest uppercase">Productos Premium</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <span className="text-xs font-bold tracking-widest uppercase">Garantía elohz</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black tracking-tight">Ecosistema</h2>
          <Button variant="link" className="text-muted-foreground hover:text-white">Explorar todo</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="w-20 h-20 bg-card border border-border rounded-2xl flex items-center justify-center group-hover:border-white transition-premium group-hover:scale-105">
                {React.cloneElement(cat.icon as React.ReactElement, { className: "w-6 h-6 text-muted-foreground group-hover:text-white" })}
              </div>
              <span className="text-xs font-bold text-center tracking-wide group-hover:text-white">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-4">
            <Badge className="bg-accent text-black font-black text-[10px] tracking-widest px-4 py-1">LATEST GEAR</Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Equipamiento de Selección</h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-lg font-medium">Accesorios curados para creadores que no comprometen la calidad.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ThreeDProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* AI Problem Solver Section */}
      <div className="px-6 py-10">
        <AIProblemSolver />
      </div>

      {/* Compatibility Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center border-t border-border mt-12">
        <h2 className="text-3xl font-black mb-12 tracking-tight">Compatibilidad Garantizada</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {compatibilityBadges.map((badge) => (
            <Badge key={badge} variant="outline" className="px-8 py-3 text-sm font-bold border-border bg-card text-muted-foreground hover:text-white hover:border-white transition-premium cursor-default">
              {badge}
            </Badge>
          ))}
        </div>
      </section>

      {/* Music Focused Section */}
      <section className="py-32 bg-card mt-12 px-6 border-y border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-20">
          <div className="space-y-8">
            <Badge className="bg-white text-black font-black text-[10px] tracking-widest">SONIC SERIES</Badge>
            <h2 className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tighter">Para músicos de alta gama</h2>
            <p className="text-muted-foreground text-xl leading-relaxed">Pedales de efecto con circuitos de precisión. Lleva tu sonido al siguiente nivel con una estética minimalista y componentes de grado profesional.</p>
            <div className="flex gap-4 pt-4">
              <Button className="pill-button button-primary h-14 px-10">Explorar Pedales</Button>
            </div>
          </div>
          <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-border group">
            <Image 
              src={PlaceHolderImages.find(img => img.id === "hero-guitar")?.imageUrl || ""}
              alt="Music Gear"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-premium" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 max-w-3xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-16 tracking-tighter">FAQ</h2>
        <div className="space-y-4">
          <div className="bg-card p-8 rounded-[2rem] border border-border hover:border-muted-foreground transition-premium">
            <h4 className="font-bold text-xl mb-3 tracking-tight">¿Compatibilidad absoluta?</h4>
            <p className="text-muted-foreground leading-relaxed">Nuestros accesorios utilizan monturas universales estándar, compatibles con el 99% de cámaras de acción y dispositivos del mercado profesional.</p>
          </div>
          <div className="bg-card p-8 rounded-[2rem] border border-border hover:border-muted-foreground transition-premium">
            <h4 className="font-bold text-xl mb-3 tracking-tight">Asesoría elohz</h4>
            <p className="text-muted-foreground leading-relaxed">Operamos vía WhatsApp para brindarte asesoría técnica personalizada antes de tu inversión. Envíos prioritarios a todo Chile.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-black tracking-tighter">elohz</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Tu boutique tecnológica de accesorios premium para creadores y músicos en Chile.</p>
            <div className="flex gap-6">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-accent transition-premium" />
              <Youtube className="w-5 h-5 cursor-pointer hover:text-accent transition-premium" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-accent transition-premium" />
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-white">Gear</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="hover:text-white cursor-pointer transition-premium">Selfie Sticks</li>
              <li className="hover:text-white cursor-pointer transition-premium">Soportes Moto</li>
              <li className="hover:text-white cursor-pointer transition-premium">Cámaras 360</li>
              <li className="hover:text-white cursor-pointer transition-premium">Pedales Sonic</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-white">Servicios</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="hover:text-white cursor-pointer transition-premium">Envíos VIP</li>
              <li className="hover:text-white cursor-pointer transition-premium">Soporte Técnico</li>
              <li className="hover:text-white cursor-pointer transition-premium">Garantía Real</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold uppercase text-xs tracking-widest text-white">Privado</h4>
            <p className="text-xs text-muted-foreground">Únete a la lista de lanzamiento de elohz.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Email" className="bg-card border border-border rounded-xl px-4 text-sm h-12 w-full focus:outline-none focus:border-white transition-premium" />
              <Button className="pill-button button-primary h-12 w-full">Suscribir</Button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <p>© 2024 elohz. Producido en Chile.</p>
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
        className="fixed bottom-10 right-10 z-50 bg-white text-black p-5 rounded-2xl shadow-2xl hover:scale-110 transition-premium flex items-center justify-center group border border-white/20"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 whitespace-nowrap font-black text-xs uppercase tracking-widest">
          Conserje elohz
        </span>
      </a>
    </main>
  );
}